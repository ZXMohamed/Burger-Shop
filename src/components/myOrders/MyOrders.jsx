import React from "react";
import { Link } from "react-router";
import { AiOutlineEye } from "react-icons/ai";
import { MdCurrencyRupee } from "react-icons/md";
import { useOrder } from "../../state/order";
import { checkout } from "../../utils/checkout";
import useMenu from "../../hook/useMenu";
import { motion } from "framer-motion";
import { upIn } from "../../animation/upIn";

const MyOrders = () => {

  const order = useOrder((state) => state.order);
  const menu = useMenu();

  return (
    <section className="tableClass">
      <motion.section {...upIn(0)}>
        <table>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Status</th>
              <th>Total Price</th>
              <th>Payment Method</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { Object.values(order).map((item, inx) => (
              <tr key={ inx }>
                <td>{ item.orderCode }</td>
                <td>{ item.orderInfo.status }</td>
                <td><MdCurrencyRupee />{ checkout(menu, item.order).total }</td>
                <td>{ item.orderInfo.paymentMethod }</td>
                <td>
                  <Link to={ `/myorders/${item.orderCode}` }>
                    <AiOutlineEye />
                  </Link>
                </td> 
              </tr>
            )) }
          </tbody>
        </table>
      </motion.section>
    </section>
  );
};

export default MyOrders;
