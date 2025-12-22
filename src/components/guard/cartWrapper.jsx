import { useEffect, useState } from "react";
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
    const prevPage = location.state?.from || "/";
    const cartPage = useMatch("/cart");
    const shippingPage = useMatch("/cart/shipping");

    const { t } = useTranslation();

    const currency = useCurrency();
    const currentCurrency = useCurrentCurrency((state) => state.current);

    const cart = useCart((state) => state.cart);

    const [validationState, setValidationState] = useState("loading"); //* "loading" | "valid" | "invalid"
    
    useEffect(() => {

        if (currency.isLoading) { //* add all synchronous actions loading condition _split by OR_ (to show loading while there are pending actions)
            setValidationState("loading");
        } else if (currency.isError) { //* add all synchronous actions error condition _split by OR_ (to prevent opening page while there are error)
            toast.error(t(`msgs.currency.convertError`));
            setValidationState("invalid");
        } else if (currency.isSuccess) { //* add all synchronous actions success condition _split by OR_ (to prevent opening page while there are pending actions)
        
            //*prevent opening pages unless the cart has at lest 1 item
            //*prevent opening pages unless the currency API success
            const mainValidation = [
                {
                    value: Object.keys(cart).length > 0,
                    message: () => toast.error(t(`msgs.cart.empty`))
                }
            ];

            //*prevent opening cart page unless :
            const cartPageValidation = [

            ];

            //*prevent opening shipping page unless quantity > 0
            const shippingPageValidation = [
                {
                    value: Object.values(cart).some((item) => item.quantity > 0),
                    message: () => toast.error(t(`msgs.cart.zeroQuantity`))
                }
            ];

            if (routeValidation(...mainValidation)) {
                if (cartPage) {
                    if (routeValidation(...cartPageValidation)) {
                        setValidationState("valid");
                    } else {
                        setValidationState("invalid");
                    }
                } else if (shippingPage) {
                    if (routeValidation(...shippingPageValidation)) {
                        setValidationState("valid");
                    } else {
                        goto("/cart", { replace: true });
                    }
                }
            } else {
                setValidationState("invalid");
            }
        }

    }, [cartPage, shippingPage, cart, currency.isLoading, currency.isError, currency.isSuccess]);
    
    if (validationState == "loading") {
        return <Loading />;
    } else if (validationState == "valid") {
        return <Outlet context={ { cart, currentCurrency, currency } } />;
    } else if(validationState == "invalid"){
        goto(prevPage, { replace: true });
    }
    
}

export default CartWrapper;