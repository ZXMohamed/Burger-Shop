import React, { useState } from "react";
import { Link } from "react-router-dom";
import burger1 from "../../assets/burger1.png";
import burger2 from "../../assets/burger2.png";
import burger3 from "../../assets/burger3.png";

const CartItem = ({ value, title, img, increment, decrement }) => {

  const [num, setnum] = useState(value||0);
return(
  <div className="cartItem">
    <div>
      <h4>{ title }</h4>
      <img src={ img } alt="Item" />
    </div>
    <div>
      <button onClick={ ()=>{decrement(num, setnum);} }>-</button>
      <input type="number" readOnly value={ num } />
      <button onClick={ () => { increment(num, setnum);} }>+</button>
    </div>
  </div>)
};
const Cart = () => {
  
  const increment = (item, set) => {
    var x = item + 1;
    set(x);
    x = undefined;
  };
  const decrement = (item, set) => { 
    if (item > 0) {
      var x = item - 1;
      set(x);
      x = undefined;
    }
  };
  
  return (
    <section className="cart">
      <main>
        <CartItem
          title={ "Cheese Burger" } img={ burger1 } value={ 0 }
          increment={ increment } decrement={ decrement }
        />
        <CartItem
          title={ "Veg Cheese Burger" } img={ burger2 }
          value={ 0 }
          increment={ increment } decrement={ decrement }
        />
        <CartItem
          title={ "Cheese Burger with French Fries" } img={ burger3 }
          value={ 0 }
          increment={ increment }
          decrement={ decrement }
        />
        <article>
          <div>
            <h4>Sub Total</h4>
            <p>₹{ 2000 }</p>
          </div>
          <div>
            <h4>Tax</h4>
            <p>₹{ 2000 * 0.18 }</p>
          </div>
          <div>
            <h4>Shipping Charges</h4>
            <p>₹{ 200 }</p>
          </div>{ " " }
          <div>
            <h4>Total</h4>
            <p>₹{ 2000 + 2000 * 0.18 + 200 }</p>
          </div>
          <Link to="/shipping">Checkout</Link>
        </article>
      </main>
    </section>
  );
};
export default Cart;