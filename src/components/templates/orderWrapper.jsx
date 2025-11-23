import { useEffect, useState } from "react";
import { Outlet, useMatch, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { useOrder } from "../../state/order";
import { useTranslation } from "react-i18next";


function OrderWrapper() {

    const goto = useNavigate();
    const { id: orderId } = useParams();
    const orderDetails = useMatch("/myorders/:id");

    const { t } = useTranslation();

    const order = useOrder((state) => state.order);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        
        //*prevent open pages unless the order has at lest 1 item
        //*prevent open order details page with unKnown id

        if (Object.keys(order).length == 0) {
            toast.error(t(`msgs.orders.empty`));
            goto("/", { replace: true });
        } else {
            if (orderDetails) {
                if (!order[orderId]) {
                    toast.error(t(`msgs.orders.unKnownId`));
                    goto("/myorders", { replace: true });
                } else {
                    setOpen(true);
                }
            } else {
                setOpen(true);
            }
        }

    }, [goto, orderDetails, orderId, order]);
    
    return (
        open && <Outlet context={ { order } }/>
    )
    
}

export default OrderWrapper;