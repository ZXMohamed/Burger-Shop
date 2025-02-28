import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Cart as Cartdb } from "../../cart";
import { toast } from "react-toastify";




const CartItem = ({ value,id, title, price, img, increment, decrement }) => {
  const [q, setq] = useState(1);
  
return(
  <div className="cartItem">
    <div>{ console.log("1234567890")}
      <h4>{ title }</h4>
      <img src={ img } alt="Item" />
    </div>
    <div>
      <button onClick={ () => {
        let q = decrement(id);
        if (q) setq(q);
      } }>-</button>
      <input type="number" readOnly value={ q } />
      <button onClick={ () => { setq(increment(id)); } }>+</button>
    </div>
  </div>)
};





const Cart = () => {
  const goto = useNavigate();
  const cartdata = useContext(Cartdb);
  const [items, setitems] = useState([]);
  const [itemquantity, setitemquantity] = useState(() => {
    const initquantities = {}
    for (const id in cartdata.data) {
    
      initquantities[id] = { quantity: 1 };
      
    }
    return initquantities;
  });

  const increment = (itemquantity,setitemquantity,id) => {
    itemquantity[id].quantity++;
    const temp = {...itemquantity};
    setitemquantity(temp);
    return itemquantity[id].quantity;
  };
  const decrement = (itemquantity,setitemquantity,id) => { 
    if (itemquantity[id].quantity > 1) {
      itemquantity[id].quantity--;
      const temp = {...itemquantity};
      setitemquantity(temp);
      return itemquantity[id].quantity;
    }
  };

  const calculsubtotal = () => { 
    let subtotal = 0;
    for (const id in cartdata.data) {
      subtotal += (parseFloat(cartdata.data[id].price) * parseInt(itemquantity[id].quantity));
    }
    return subtotal;
  }
  const calcultax = () => calculsubtotal() * 0.10;
  const calculshipping = () => 200;
  const calcultotal = () => calculsubtotal() + calcultax() + calculshipping();

  const checkout = () => {
    if (calculsubtotal() > 0 && Object.keys(cartdata.data).length > 0) {
      cartdata.dispatch({ type: "set_quantity", payload: itemquantity });
      goto("/shipping");
    } else { 
      toast.error("wrong proccess!");
    }
  }
  
  useEffect(() => {
    setitems(Object.values(cartdata.data).map((val, inx) => {
      console.log("n");
      return <CartItem key={ inx }
        title={ val.name } img={ val.photo } price={ val.price } id={ val.id } value={ itemquantity[val.id].quantity }
        increment={ increment.bind(null, itemquantity, setitemquantity) } decrement={ decrement.bind(null, itemquantity, setitemquantity) }
      />
    }))
  },[])

  return (
    <section className="cart">
      <main>
        { !Object.keys(cartdata.data).length && <h4><b>No items added yet!</b></h4>}
        { items }
        { console.log(items)}
        <article>
          <div>
            <h4>Sub Total</h4>
            <p>₹{calculsubtotal()}</p>
          </div>
          <div>
            <h4>Tax</h4>
            <p>₹{calcultax()}</p>
          </div>
          <div>
            <h4>Shipping Charges</h4>
            <p>₹{ calculshipping()}</p>
          </div>{ " " }
          <div>
            <h4>Total</h4>
            <p>₹{ calcultotal() }</p>
          </div>
          <button onClick={checkout} className="link" style={{border:"none",outLine:"none",display:"block",margin:"auto"}}>Checkout</button>
        </article>
      </main>
    </section>
  );
};
export default Cart;