import { useEffect, useState } from "react";
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
    const prevPage = location.state?.from || "/";
    const { id: orderId } = useParams();
    const myOrders = useMatch("/myorders");
    const orderDetails = useMatch("/myorders/:id");

    const { t } = useTranslation();

    const currency = useCurrency();
    const currentCurrency = useCurrentCurrency((state) => state.current);

    const order = useOrder((state) => state.order);

    const [validationState, setValidationState] = useState("loading"); //* "loading" | "valid" | "invalid"

    useEffect(() => {
        if (currency.isLoading) {//* add all synchronous actions loading condition _split by OR_ (to show loading while there are pending actions)
            setValidationState("loading");
        } else if (currency.isError) { //* add all synchronous actions error condition _split by OR_ (to prevent opening page while there are error)
            toast.error(t(`msgs.currency.convertError`));
            setValidationState("invalid");
        } else if (currency.isSuccess) {//* add all synchronous actions success condition _split by OR_ (to prevent opening page while there are pending actions)
        
            //*prevent open pages unless the order has at lest 1 item
            //*prevent open order details page with unKnown id
            const mainValidation = [
                {
                    value: Object.keys(order).length > 0,
                    message: () => toast.error(t(`msgs.orders.empty`))
                }
            ];

            //*prevent opening myOrders page unless :
            const myOrdersPageValidation = [

            ];

            //*prevent opening order details page unless id is exist
            const orderDetailsPageValidation = [
                {
                    value: order[orderId],
                    message: () => toast.error(t(`msgs.orders.unKnownId`))
                }
            ];

            if (routeValidation(...mainValidation)) {
                if (myOrders) {
                    if (routeValidation(...myOrdersPageValidation)) {
                        setValidationState("valid");
                    } else {
                        setValidationState("invalid");
                    }
                }else if (orderDetails) {
                    if (routeValidation(...orderDetailsPageValidation)) {
                        setValidationState("valid");
                    } else {
                        goto("/myorders", { replace: true });
                    }
                }
            } else {
                setValidationState("invalid");
            }
        }

    }, [myOrders, orderDetails, orderId, order, currency.isError, currency.isLoading, currency.isSuccess]);

    if (validationState == "loading") {
        return <Loading />;
    } else if (validationState == "valid") {
        return <Outlet context={ { order, currentCurrency, currency } } />;
    } else if(validationState == "invalid"){
        goto(prevPage, { replace: true });
    }
    
}

export default OrderWrapper;