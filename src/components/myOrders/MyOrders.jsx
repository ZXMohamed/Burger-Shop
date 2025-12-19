import React, { useEffect } from "react";
import { Link, useLocation, useOutletContext } from "react-router";
import { AiOutlineEye } from "react-icons/ai";
import { checkout } from "../../utils/checkout";
import useMenu from "../../hook/useMenu";
import { motion } from "framer-motion";
import { upIn } from "../../animation/upIn";
import { useTranslation } from "react-i18next";
import CurrencyIcon from "../currencyIcon/currencyIcon";

const MyOrders = () => {

  const location = useLocation();

  const { t } = useTranslation();

  const { order, currentCurrency, currency: { data : currency, isSuccess: currencyIsSuccess } } = useOutletContext();
  
  const menu = useMenu();

  return (
    <section className="tableClass">
      <motion.section {...upIn(0,"animate")}>
        <table>
          <thead>
            <tr>
              <th>{ t(`myOrders.ordersTable.header.orderId`) }</th>
              <th>{ t(`myOrders.ordersTable.header.status`) }</th>
              <th>{ t(`myOrders.ordersTable.header.totalPrice`) }</th>
              <th>{ t(`myOrders.ordersTable.header.paymentMethod`) }</th>
              <th>{ t(`myOrders.ordersTable.header.action`) }</th>
            </tr>
          </thead>
          <tbody>
            { Object.values(order).map((item, inx) => (
              <tr key={ inx }>
                <td>{ item.orderCode }</td>
                <td>{ t(`myOrders.status.${item.orderInfo.status}`) }</td>
                <td>{ currencyIsSuccess && <bdi>{ checkout(menu, item.order, currency.rates[currentCurrency]).total } <CurrencyIcon currency={ currentCurrency } /></bdi> }</td>
                <td>{ t(`myOrders.paymentMethods.${item.orderInfo.paymentMethod}`) }</td>
                <td>
                  <Link to={ `/myorders/${item.orderCode}` } state={{ from: location.pathname }} >
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
