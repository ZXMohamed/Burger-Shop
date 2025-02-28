import React, { useContext, useEffect } from "react";
import { Orders as Ordersdb } from "../../orders";
import { useNavigate, useParams } from "react-router-dom";
const OrderDetails = () => {
    const goto = useNavigate();
    const orderid = useParams().id;
    const orderdata = useContext(Ordersdb).data[orderid];
    
    useEffect(() => { 
        if (!(orderdata && orderid)) goto("/");
    },[])
    const getsubtotal = () => {
        let price = 0;
        Object.keys(orderdata.order).map((item) => {
            price += orderdata.order[item].price * orderdata.order[item].quantity;
        })
        return price;
    }
    return (
        !(orderdata && orderid) ? <h1 style={ { width: "99vw", height: "90vh", textAlign: "center", paddingTop: "100px" } }>Not Found!</h1>:<section className="orderDetails">
            <main>
                <h1>Order Details</h1>
                <div>
                    <h1>Shipping</h1>
                    <p>
                        <b>Address</b>
                        <i>{ orderdata.orderinfo.country + " " + orderdata.orderinfo.state + " " + orderdata.orderinfo.city + " " + orderdata.orderinfo.HNo }</i>
                    </p>
                </div>
                <div>
                    <h1>Contact</h1>
                    <p>
                        <b>Phone</b>
                        <i>{ orderdata.orderinfo.PhoneNo }</i>
                    </p>
                </div>
                <div>
                    <h1>Status</h1>
                    <p>
                        <b>Order Status</b>
                        <i>{ orderdata.orderinfo.status }</i>
                    </p>
                </div>
                <div>
                    <h1>Payment</h1>
                    <p>
                        <b>Payment Method</b>
                        <i>{ orderdata.orderinfo.paymentmethod }</i>
                    </p>
                </div>
                <div>
                    <h1>Amount</h1>
                    <p>
                        <b>Items Total</b>₹<i>{ getsubtotal() }</i>
                    </p>
                    <p>
                        <b>Shipping Charges</b>₹<i>{ 200 }</i>
                    </p>
                    <p>
                        <b>Tax</b>₹<i>{ getsubtotal()*0.10 }</i>
                    </p>
                    <p>
                        <b>Total Amount</b>₹<i>{ (getsubtotal() * 0.10) + 200 + getsubtotal() }</i>
                    </p>
                </div>
                <article>
                    <h1>Ordered Items</h1>
                    { Object.keys(orderdata.order).map((val,inx) =>
                        <div key={inx}>
                            <h4>{ orderdata.order[val].name }</h4>
                            <div>
                                <span>{ orderdata.order[val].quantity }</span> x <span>{ orderdata.order[val].price }</span>
                            </div>
                        </div>
                    ) }
                    <div>
                        <h4
                            style={ {
                                fontWeight: 800,
                            } }
                        >
                            Sub Total
                        </h4>
                        <div
                            style={ {
                                fontWeight: 800,
                            } }
                        >
                            ₹{ getsubtotal() }
                        </div>
                    </div>
                </article>
            </main>
        </section>
    );
};
export default OrderDetails;