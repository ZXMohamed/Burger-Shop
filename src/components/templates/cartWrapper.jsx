import { useEffect, useLayoutEffect, useState } from "react";
import { Outlet, useLocation, useMatch, useNavigate } from "react-router";
import { useCart } from "../../state/cart";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useCurrentCurrency } from "../../state/currentCurrency";
import { useCurrency } from "../../state/currency";
import { routeValidation } from "../../routes/utils/routeValidation";
import Loading from "../loading/loading";


function CartWrapper() {

    const goto = useNavigate();
    const location = useLocation();
    const cartPage = useMatch("/cart");
    const shippingPage = useMatch("/cart/shipping");

    const { t } = useTranslation();

    const currency = useCurrency();
    const currentCurrency = useCurrentCurrency((state) => state.current);

    const cart = useCart((state) => state.cart);

    const [open, setOpen] = useState(false);

    useLayoutEffect(() => {
        setOpen(false);
    },[cartPage,shippingPage])
    
    useEffect(() => {
        if (!open) {
        
            const prevPage = location.state?.prev || "/";

            //*prevent opening pages unless the cart has at lest 1 item
            //*prevent opening pages unless the currency API success
            const mainValidation = [
                {
                    value: Object.keys(cart).length > 0,
                    message: () => toast.error(t(`msgs.cart.empty`))
                },
                {
                    value: currency.isSuccess || currency.isLoading, //*if there is an error both of isSuccess and isLoading will be false
                    message: () => toast.error(t(`msgs.currency.convertError`))
                },
            ];

            //*prevent opening shipping page unless quantity > 0
            const shippingPageValidation = [
                {
                    value: Object.values(cart).some((item) => item.quantity > 0),
                    message: () => toast.error(t(`msgs.cart.zeroQuantity`))
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

            const handleSetOpen = (state) => { routeValidation(...openValidation) && setOpen(state)};

            if (routeValidation(...mainValidation)) {
                if (shippingPage) {
                    if (routeValidation(...shippingPageValidation)) {
                        handleSetOpen(true)
                    } else {
                        goto("/cart", { replace: true });
                    }
                } else {
                    handleSetOpen(true)
                }
            } else {
                routeValidation(...backValidation) && goto(prevPage, { replace: true });
            }

        }
    }, [t, cartPage, shippingPage, cart, goto, currency, currentCurrency]);
    
    return (
        open ?
            <Outlet context={ { cart, currentCurrency, currency } } />
            :
            <Loading />
    )
    
}

export default CartWrapper;

