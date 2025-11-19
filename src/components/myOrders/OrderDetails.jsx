import React from "react";
import { useParams } from "react-router";
import { useOrder } from "../../state/order";
import useMenu from "../../hook/useMenu";
import { checkout } from "../../utils/checkout";
import { MdCurrencyRupee } from "react-icons/md";


const OrderDetails = () => {

    const { id: orderId } = useParams();

    const order = useOrder((state) => state.order[orderId]);
    const menu = useMenu();
    
    const calculateCheckout = checkout(menu, order.order);

    return (
        <section className="orderDetails">
            <section>
                <h1>Order Details</h1>
                <div>
                    <h2>Shipping</h2>
                    <p>
                        <b>Address : </b>
                        <i>{ order.orderInfo.country + " " + order.orderInfo.state + " " + order.orderInfo.city + " " + order.orderInfo.HNo }</i>
                    </p>
                </div>
                <div>
                    <h2>Contact</h2>
                    <p>
                        <b>Phone : </b>
                        <i>{ order.orderInfo.PhoneNo }</i>
                    </p>
                </div>
                <div>
                    <h2>Status</h2>
                    <p>
                        <b>Order Status : </b>
                        <i>{ order.orderInfo.status }</i>
                    </p>
                </div>
                <div>
                    <h2>Payment</h2>
                    <p>
                        <b>Payment Method : </b>
                        <i>{ order.orderInfo.paymentMethod }</i>
                    </p>
                </div>
                <div>
                    <h2>Amount</h2>
                    <p>
                        <b>Items Total : </b><i>{ calculateCheckout.subtotal }</i><MdCurrencyRupee />
                    </p>
                    <p>
                        <b>Shipping Charges : </b><i>{ calculateCheckout.shipping }</i><MdCurrencyRupee />
                    </p>
                    <p>
                        <b>Tax : </b><i>{ calculateCheckout.tax }</i><MdCurrencyRupee />
                    </p>
                </div>
                <div className="total">
                    <h3>Total</h3>
                    <div>
                        { calculateCheckout.total }<MdCurrencyRupee />
                    </div>
                </div>
                <br />
                <br />
                <article>
                    <h2>Ordered Items</h2>
                    { Object.keys(order.order).map((id,inx) =>
                        <div key={inx}>
                            <h4>{ menu[id].name }</h4>
                            <div>
                                <span>{ order.order[id].quantity }</span> x <span>{ menu[id].price }<MdCurrencyRupee /></span>
                            </div>
                        </div>
                    ) }
                </article>
            </section>
        </section>
    );
};
export default OrderDetails;