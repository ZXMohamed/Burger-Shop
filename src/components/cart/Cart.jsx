import React, { useCallback, useMemo } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router";
import { useCart } from "../../state/cart";
import CartItem from "./cartItem";
import useMenu from "../../hook/useMenu";
import { motion } from "framer-motion";
import { upIn } from "../../animation/upIn";
import { checkout } from "../../utils/checkout";
import { useTranslation } from "react-i18next";
import CurrencyIcon from "../currencyIcon/currencyIcon";
import Counter from "../counter/counter";


const Cart = () => {

  const goTo = useNavigate();
  const location = useLocation();

  const { t } = useTranslation();

  const menu = useMenu();

  const { cart, currentCurrency, currency: { data: currency, isSuccess: currencyIsSuccess } } = useOutletContext();
  const INCQuantity = useCart((state) => state.INCQuantity);
  const DECQuantity = useCart((state) => state.DECQuantity);

  const handleIncrement = useCallback((id) => {
    INCQuantity({ id });
  }, [INCQuantity]);
  
  const handleDecrement = useCallback((id) => {
    DECQuantity({ id });
  }, [DECQuantity]);

  const calculateCheckout = useMemo(() => currencyIsSuccess ? checkout(menu, cart, currency.rates[currentCurrency]) : {}, [menu, cart, currency, currentCurrency, currencyIsSuccess]);

  const handleConfirm = () => {
    goTo("/cart/shipping", { state: { from: location.pathname } });
  }

  return (
    <main className="cart">
      <motion.article { ...upIn(0) }>
        <h1>{ t(`cart.title`) }</h1>
        <section>
          
          {
            currencyIsSuccess && Object.keys(cart).map((id, inx) => {
              const menuItem = menu(t, currency.rates[currentCurrency])[id];
              return <CartItem key={ inx } id={ menuItem.id } title={ menuItem.name } photo={ menuItem.photo } price={ menuItem.price } currency={ currentCurrency } quantity={ cart[id].quantity } increment={ handleIncrement } decrement={ handleDecrement } />
            })
          }
          
          <article>
            <div>
              <h3>{ t(`cart.calculation.subTotal`) }</h3>
              <p data-testid="subTotalTest"><bdi>
                <Counter to={ calculateCheckout?.subtotal || 0 } animationOptions={ { duration: 0.5 } }><span></span></Counter> <CurrencyIcon currency={ currentCurrency } />
              </bdi></p>
            </div>
            <div>
              <h3>{ t(`cart.calculation.tax`) }</h3>
              <p data-testid="taxTest"><bdi>
                <Counter to={ calculateCheckout?.tax || 0 } animationOptions={ { duration: 0.5 } }><span></span></Counter> <CurrencyIcon currency={ currentCurrency } />
              </bdi></p>
            </div>
            <div>
              <h3>{ t(`cart.calculation.shippingCharges`) }</h3>
              <p data-testid="shippingTest"><bdi>
                <Counter to={ calculateCheckout?.shipping || 0 } animationOptions={ { duration: 0.5 } }><span></span></Counter> <CurrencyIcon currency={ currentCurrency } />
              </bdi></p>
            </div>
            <div>
              <h3>{ t(`cart.calculation.total`) }</h3>
              <p data-testid="TotalTest"><bdi>
                <Counter to={ calculateCheckout?.total || 0 } animationOptions={ { duration: 0.5 } }><span></span></Counter> <CurrencyIcon currency={ currentCurrency } />
              </bdi></p>
            </div>
            <button onClick={ handleConfirm } data-testid={ "confirmTest" }>{ t(`cart.confirmButton.title`) }</button>
          </article>
          
        </section>
      </motion.article>
    </main>
  );
};
export default Cart;