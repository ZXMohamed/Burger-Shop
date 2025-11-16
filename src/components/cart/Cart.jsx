import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useCart } from "../../state/cart";
import { MdCurrencyRupee } from "react-icons/md";
import CartItem from "./cartItem";
import useMenu from "../../hook/useMenu";


const Cart = () => {
  
  const goTo = useNavigate();

  const menu = useMenu();

  const cartItems = useCart((state) => state.cart);
  const INCQuantity = useCart((state) => state.INCQuantity);
  const DECQuantity = useCart((state) => state.DECQuantity);

  const increment = useCallback((inx) => {
    if (cartItems[inx].quantity < 10) {
      INCQuantity({ inx });
    }
  }, []);
  const decrement = useCallback((inx) => {
    if (cartItems[inx].quantity > 0) {
      DECQuantity({ inx });
    }
  }, []);

  const calculSubtotal = useMemo(() => {
    let subtotal = 0;
    for (const cardItem of cartItems) {
      const menuItem = menu[cardItem.id];
      subtotal += (parseFloat(menuItem.price) * parseInt(cardItem.quantity));
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
    if (calculSubtotal > 0 && cartItems.length > 0) {
      goTo("/cart/shipping");
    } else if (cartItems.length <= 0) {
      toast.error("no items in cart!");
    } else if (calculSubtotal <= 0) {
      toast.error("quantity is zero please add at less 1!");
    } else {
      toast.error("wrong proccess!");
    }
  }

  return (
    <section className="cart">
      <article>
        { !cartItems.length && <h4 className="noItemsMsg"><b>No items added yet!</b></h4> }
        
        { cartItems.map((cardItem, inx) => {
          const menuItem = menu[cardItem.id];
          return <CartItem key={ inx } id={ menuItem.id } inx={ inx } title={ menuItem.name } photo={ menuItem.photo } price={ menuItem.price } quantity={ cardItem.quantity } increment={ increment } decrement={ decrement } />
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
      </article>
    </section>
  );
};
export default Cart;