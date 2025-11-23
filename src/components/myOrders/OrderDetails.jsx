import React from "react";
import { useParams } from "react-router";
import { useOrder } from "../../state/order";
import useMenu from "../../hook/useMenu";
import { checkout } from "../../utils/checkout";
import { MdCurrencyRupee } from "react-icons/md";
import { useTranslation } from "react-i18next";


const OrderDetails = () => {

    const { id: orderId } = useParams();

    const { t } = useTranslation();

    const order = useOrder((state) => state.order[orderId]);
    const menu = useMenu();
    
    const calculateCheckout = checkout(menu, order.order);

    return (
        <section className="orderDetails">
            <section>
                <h1>{ t(`orderDetails.title`) }</h1>
                <div>
                    <h2>{ t(`orderDetails.details.shipping.title`) }</h2>
                    <p>
                        <b>{ t(`orderDetails.details.shipping.items.address`) } : </b>
                        <i>{ order.orderInfo.country + " " + order.orderInfo.state + " " + order.orderInfo.city + " " + order.orderInfo.HNo }</i>
                    </p>
                </div>
                <div>
                    <h2>{ t(`orderDetails.details.contact.title`) }</h2>
                    <p>
                        <b>{ t(`orderDetails.details.contact.items.phone`) } : </b>
                        <i>{ order.orderInfo.PhoneNo }</i>
                    </p>
                </div>
                <div>
                    <h2>{ t(`orderDetails.details.status.title`) }</h2>
                    <p>
                        <b>{ t(`orderDetails.details.status.items.orderStatus`) } : </b>
                        <i>{ t(`myOrders.status.${order.orderInfo.status}`) }</i>
                    </p>
                </div>
                <div>
                    <h2>{ t(`orderDetails.details.payment.title`) }</h2>
                    <p>
                        <b>{ t(`orderDetails.details.payment.items.paymentMethod`) } : </b>
                        <i>{ t(`myOrders.paymentMethod.${order.orderInfo.paymentMethod}`) }</i>
                    </p>
                </div>
                <div>
                    <h2>{ t(`orderDetails.details.amount.title`) }</h2>
                    <p>
                        <bdi><b>{ t(`orderDetails.details.amount.items.itemsTotal`) } : </b><i>{ calculateCheckout.subtotal }</i><MdCurrencyRupee /></bdi>
                    </p>
                    <p>
                        <bdi><b>{ t(`orderDetails.details.amount.items.shippingCharges`) } : </b><i>{ calculateCheckout.shipping }</i><MdCurrencyRupee /></bdi>
                    </p>
                    <p>
                        <bdi><b>{ t(`orderDetails.details.amount.items.tax`) } : </b><i>{ calculateCheckout.tax }</i><MdCurrencyRupee /></bdi>
                    </p>
                </div>
                <div className="total">
                    <h3>{ t(`orderDetails.details.amount.items.total`) }</h3>
                    <div>
                        <bdi>{ calculateCheckout.total }<MdCurrencyRupee /></bdi>
                    </div>
                </div>
                <br />
                <br />
                <article>
                    <h2>{ t(`orderDetails.details.orderedItems.title`) }</h2>
                    { Object.keys(order.order).map((id, inx) => {
                        const menuItem = menu(t)[id];
                        
                        return (
                            <div key={ inx }>
                                <h4>{ menuItem.name }</h4>
                                <div><bdi><span>{ order.order[id].quantity }</span> x <span>{ menuItem.price }<MdCurrencyRupee /></span></bdi></div>
                            </div>
                        );
                    }) }
                </article>
            </section>
        </section>
    );
};
export default OrderDetails;