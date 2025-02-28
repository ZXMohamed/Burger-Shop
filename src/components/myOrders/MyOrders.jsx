import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { Orders } from "../../orders";

const MyOrders = () => {
  const ordersdata = useContext(Orders);
  const gettotal = (id) => {
    let price = 0;
    Object.keys(ordersdata.data[id].order).map((item) => {
      price += ordersdata.data[id].order[item].price * ordersdata.data[id].order[item].quantity;
    })
    price += price * 0.10
    price += 200
    return price;
  }
  const getquantity = (id) => {
    let quantity = 0;
    Object.keys(ordersdata.data[id].order).map((item) => {
      quantity += ordersdata.data[id].order[item].quantity;
    })
    return quantity;
  }
  return (
    <section className="tableClass">
      <main>
        <table>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Status</th>
              <th>Item Qty</th>
              <th>Total Price</th>
              <th>Payment Method</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            { Object.keys(ordersdata.data).map((val, inx) => (
              <tr key={ inx }>
                <td>{ val }</td>
                <td>{ ordersdata.data[val].orderinfo.status }</td>
                <td>{ getquantity(val) }</td>
                <td>₹{ gettotal(val) }</td>
                <td>{ ordersdata.data[val].orderinfo.paymentmethod }</td>
                <td>
                  <Link to={ `/order/${val}` }>
                    <AiOutlineEye />
                  </Link>
                </td> 
              </tr>
            )) }
          </tbody>
        </table>
      </main>
    </section>
  );
};

export default MyOrders;
