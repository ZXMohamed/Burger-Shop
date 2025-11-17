import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useCart } from "../../state/cart";
import { MdCurrencyRupee } from "react-icons/md";
import CartItem from "./cartItem";
import useMenu from "../../hook/useMenu";
import { motion } from "framer-motion";
import { upIn } from "../../animation/upIn";


const Cart = () => {
  
  const goTo = useNavigate();

  const menu = useMenu();

  const cartItems = useCart((state) => state.cart);
  const INCQuantity = useCart((state) => state.INCQuantity);
  const DECQuantity = useCart((state) => state.DECQuantity);

  const increment = useCallback((id) => {
    INCQuantity({ id });
  }, [INCQuantity]);
  
  const decrement = useCallback((id) => {
    DECQuantity({ id });
  }, [DECQuantity]);

  const calculSubtotal = useMemo(() => {
    let subtotal = 0;
    for (const id in cartItems) {
      const menuItem = menu[id];
      subtotal += (parseFloat(menuItem.price) * parseInt(cartItems[id].quantity));
    }
    return subtotal;
  }, [menu, cartItems]);
  
  const calculTax = () => {
    const tax = (calculSubtotal * 0.10).toFixed(2);
    return parseFloat(tax);
  }

  const calculShipping = () => 200;

  const calculTotal = () => {
    const total = calculSubtotal === 0 ? 0 : calculSubtotal + calculTax() + calculShipping();
    return parseFloat(total.toFixed(2));
  }

  const checkout = () => {
    if (calculSubtotal > 0 && Object.keys(cartItems).length > 0) {
      goTo("/cart/shipping");
    } else if (Object.keys(cartItems).length <= 0) {
      toast.error("no items in cart!");
    } else if (calculSubtotal <= 0) {
      toast.error("quantity is zero please add at less 1!");
    } else {
      toast.error("wrong proccess!");
    }
  }

  return (
    <section className="cart">
      <motion.article {...upIn(0)}>
        <h1>checkout</h1>
        <section>
          { !Object.keys(cartItems).length && <h4 className="noItemsMsg"><b>No items added yet!</b></h4> }
          
          { Object.keys(cartItems).map((id, inx) => {
            const menuItem = menu[id];
            return <CartItem key={ inx } id={ menuItem.id } title={ menuItem.name } photo={ menuItem.photo } price={ menuItem.price } quantity={ cartItems[id].quantity } increment={ increment } decrement={ decrement } />
          }) }
          
          <article>
            <div>
              <h4>Sub Total</h4>
              <p>{ calculSubtotal }<MdCurrencyRupee /></p>
            </div>
            <div>
              <h4>Tax</h4>
              <p>{ calculTax() }<MdCurrencyRupee /></p>
            </div>
            <div>
              <h4>Shipping Charges</h4>
              <p>{ calculShipping() }<MdCurrencyRupee /></p>
            </div>
            <div>
              <h4>Total</h4>
              <p>{ calculTotal() }<MdCurrencyRupee /></p>
            </div>
            <button onClick={ checkout }>Checkout</button>
          </article>
        </section>
      </motion.article>
    </section>
  );
};
export default Cart;