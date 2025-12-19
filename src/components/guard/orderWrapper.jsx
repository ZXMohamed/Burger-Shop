import { useEffect, useLayoutEffect, useState } from "react";
import { Outlet, useLocation, useMatch, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { useOrder } from "../../state/order";
import { useTranslation } from "react-i18next";
import { useCurrentCurrency } from "../../state/currentCurrency";
import { useCurrency } from "../../state/currency";
import { routeValidation } from "../../routes/utils/routeValidation";
import Loading from "../loading/loading";


function OrderWrapper() {

    const goto = useNavigate();
    const location = useLocation();
    const { id: orderId } = useParams();
    const myOrders = useMatch("/myorders");
    const orderDetails = useMatch("/myorders/:id");

    const { t } = useTranslation();

    const currency = useCurrency();
    const currentCurrency = useCurrentCurrency((state) => state.current);

    const order = useOrder((state) => state.order);

    const [open, setOpen] = useState(false);

    useLayoutEffect(() => {
        setOpen(false);
    }, [myOrders, orderDetails]);

    useEffect(() => {
        if (!open) {
        
            const prevPage = location.state?.from || "/";

            //*prevent open pages unless the order has at lest 1 item
            //*prevent open order details page with unKnown id
            const mainValidation = [
                {
                    value: Object.keys(order).length > 0,
                    message: () => toast.error(t(`msgs.orders.empty`))
                },
                {
                    value: currency.isSuccess || currency.isLoading, //*if there is an error both of isSuccess and isLoading will be false
                    message: () => toast.error(t(`msgs.currency.convertError`))
                },
            ];

            //*prevent opening order details page unless id is exist
            const orderDetailsPageValidation = [
                {
                    value: order[orderId],
                    message: () => toast.error(t(`msgs.orders.unKnownId`))
                }
            ];

            //*prevent open page(s) unless synchronous actions finish
            const openValidation = [
                {
                    value: !currency.isLoading && !currency.isError
                }
            ];

            //*prevent back to prev page unless synchronous actions finish
            const backValidation = [
                {
                    value: currency.isError && !currency.isLoading
                }
            ];

            const handleSetOpen = (state) => { routeValidation(...openValidation) && setOpen(state) };

            if (routeValidation(...mainValidation)) {
                if (orderDetails) {
                    if (routeValidation(...orderDetailsPageValidation)) {
                        handleSetOpen(true)
                    } else {
                        goto("/myorders", { replace: true });
                    }
                } else {
                    handleSetOpen(true)
                }
            } else {
                !routeValidation(...backValidation) && goto(prevPage, { replace: true });
            }
        }

    }, [goto, orderDetails, orderId, order, currency, currentCurrency, t]);
    
    return (
        open ?
            <Outlet context={ { order, currentCurrency, currency } } />
            :
            <Loading />
    )
    
}

export default OrderWrapper;