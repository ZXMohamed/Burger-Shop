import React, { useMemo } from "react";
import { useOutletContext, useParams } from "react-router";
import useMenu from "../../hook/useMenu";
import { checkout } from "../../utils/checkout";
import { useTranslation } from "react-i18next";
import CurrencyIcon from "../currencyIcon/currencyIcon";
import Counter from "../counter/counter";


const OrderDetails = () => {

    const { id: orderId } = useParams();

    const { t } = useTranslation();

    const { order: Orders, currentCurrency, currency: { data: currency, isSuccess: currencyIsSuccess } } = useOutletContext();

    const order = Orders[orderId];

    const menu = useMenu();
    
    const calculateCheckout = useMemo(() => currencyIsSuccess ? checkout(menu, order.order, currency.rates[currentCurrency]) : {}, [currentCurrency, currency, menu, currencyIsSuccess, order.order]);

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
                    <p>
                        <b>{ t(`orderDetails.details.shipping.items.pinCode`) } : </b>
                        <i>{ order.orderInfo.pinCode }</i>
                    </p>
                </div>
                <div>
                    <h2>{ t(`orderDetails.details.contact.title`) }</h2>
                    <p>
                        <b>{ t(`orderDetails.details.contact.items.phone`) } : </b>
                        <i>{ order.orderInfo.phoneNo }</i>
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
                        <bdi><b>{ t(`orderDetails.details.amount.items.itemsTotal`) } : </b><i><Counter to={ calculateCheckout?.subtotal }><span></span></Counter></i> <CurrencyIcon currency={currentCurrency} /></bdi>
                    </p>
                    <p>
                        <bdi><b>{ t(`orderDetails.details.amount.items.shippingCharges`) } : </b><i><Counter to={ calculateCheckout?.shipping }><span></span></Counter></i> <CurrencyIcon currency={currentCurrency} /></bdi>
                    </p>
                    <p>
                        <bdi><b>{ t(`orderDetails.details.amount.items.tax`) } : </b><i><Counter to={ calculateCheckout?.tax }><span></span></Counter></i> <CurrencyIcon currency={currentCurrency} /></bdi>
                    </p>
                </div>
                <div className="total">
                    <h3>{ t(`orderDetails.details.amount.items.total`) }</h3>
                    <div>
                        <bdi><Counter to={ calculateCheckout?.total }><span></span></Counter> <CurrencyIcon currency={currentCurrency} /></bdi>
                    </div>
                </div>
                <br />
                <br />
                <article>
                    <h2>{ t(`orderDetails.details.orderedItems.title`) }</h2>
                    { currencyIsSuccess && Object.keys(order.order).map((id, inx) => {
                        const menuItem = menu(t, currency.rates[currentCurrency])[id];
                        
                        return (
                            <div key={ inx }>
                                <h4>{ menuItem.name }</h4>
                                <div><bdi><span>{ order.order[id].quantity }</span> x <span>{ menuItem.price } <CurrencyIcon currency={currentCurrency} /></span></bdi></div>
                            </div>
                        );
                    }) }
                </article>
            </section>
        </section>
    );
};
export default OrderDetails;