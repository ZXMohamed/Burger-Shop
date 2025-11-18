import { useEffect, useState } from "react";
import { Outlet, useMatch, useNavigate } from "react-router";
import { useCart } from "../../state/cart";
import { toast } from "react-toastify";


function CartWrapper() {

    const goto = useNavigate();
    const cartPage = useMatch("/cart");
    const shippingPage = useMatch("/cart/shipping");

    const cart = useCart((state) => state.cart);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        
        //*prevent open pages unless the cart has at lest 1 item
        //*prevent open shipping page unless quantity > 0

        if (Object.keys(cart).length == 0) {
            toast.error("cart is empty!");
            goto("/", { replace: true });
        } else {            
            if (shippingPage) {            
                if (!Object.values(cart).some((item) => item.quantity > 0)) {
                    toast.error("quantity is zero please add at lest 1!");
                    goto("/cart", { replace: true });
                } else {
                    setOpen(true);
                }
            } else {
                setOpen(true);
            }
        }

    }, [cartPage, shippingPage, cart, goto]);
    
    return (
        open && <Outlet context={ { cart } }/>
    )
    
}

export default CartWrapper;