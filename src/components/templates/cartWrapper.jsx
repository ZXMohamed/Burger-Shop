import { Outlet, useMatch, useNavigate } from "react-router";
import { useCart } from "../../state/cart";
import { toast } from "react-toastify";

function CartWrapper() {

    const goto = useNavigate();
    const page = useMatch("/cart/shipping");

    const cart = useCart((state) => state.cart);

    // $ if q = 0
    if (page && Object.keys(cart).length == 0) {
        toast.error("cart is empty!");
        goto("/");
    } else {
        return <Outlet />;
    }
}

export default CartWrapper;