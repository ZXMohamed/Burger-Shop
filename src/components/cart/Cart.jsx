import React, { useCallback, useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { useCart } from "../../state/cart";
import { MdCurrencyRupee } from "react-icons/md";
import CartItem from "./cartItem";
import useMenu from "../../hook/useMenu";
import { motion } from "framer-motion";
import { upIn } from "../../animation/upIn";
import { checkout } from "../../utils/checkout";
import { useTranslation } from "react-i18next";


const Cart = () => {

  const goTo = useNavigate();

  const { t } = useTranslation();

  const menu = useMenu();

  const { cart } = useOutletContext();
  const INCQuantity = useCart((state) => state.INCQuantity);
  const DECQuantity = useCart((state) => state.DECQuantity);

  const handleIncrement = useCallback((id) => {
    INCQuantity({ id });
  }, [INCQuantity]);
  
  const handleDecrement = useCallback((id) => {
    DECQuantity({ id });
  }, [DECQuantity]);

  const calculateCheckout = useMemo(() => checkout(menu, cart), [menu, cart]);

  const handleCheckout = () => {
    goTo("/cart/shipping");
  }

  return (
    <section className="cart">
      <motion.article {...upIn(0)}>
        <h1>{ t(`cart.title`) }</h1>
        <section>
          
          { Object.keys(cart).map((id, inx) => {
              const menuItem = menu(t)[id];
              return <CartItem key={ inx } id={ menuItem.id } title={ menuItem.name } photo={ menuItem.photo } price={ menuItem.price } quantity={ cart[id].quantity } increment={ handleIncrement } decrement={ handleDecrement } />
            })
          }
          
          <article>
            <div>
              <h4>{ t(`cart.calculation.subTotal`) }</h4>
              <p data-testid="subTotalTest">{ calculateCheckout.subtotal }<MdCurrencyRupee /></p>
            </div>
            <div>
              <h4>{ t(`cart.calculation.tax`) }</h4>
              <p data-testid="taxTest">{ calculateCheckout.tax }<MdCurrencyRupee /></p>
            </div>
            <div>
              <h4>{ t(`cart.calculation.shippingCharges`) }</h4>
              <p data-testid="shippingTest">{ calculateCheckout.shipping }<MdCurrencyRupee /></p>
            </div>
            <div>
              <h4>{ t(`cart.calculation.total`) }</h4>
              <p data-testid="TotalTest">{ calculateCheckout.total }<MdCurrencyRupee /></p>
            </div>
            <button onClick={ handleCheckout } data-testid={"checkoutTest"}>{ t(`cart.checkoutButton.title`) }</button>
          </article>
          
        </section>
      </motion.article>
    </section>
  );
};
export default Cart;