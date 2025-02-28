import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Cart } from "../../cart";
import { toast } from "react-toastify";

const MenuCard = ({ id,burgerSrc, price, title, delay = 0 }) => {

  const Cartcontroll = useContext(Cart);

  const addtocart = (payload) => { 
    if (!Cartcontroll.data[payload.id]) {
      Cartcontroll.dispatch({ type: "add_cart_item", payload: payload });
      toast.success("added to cart successfully!")
    } else { 
      toast.info("\""+ payload.name +"\" is already in cart!")
    }
  }


  return (
    <motion.div className="menuCard"
      initial={{
        x: "-100%",
        opacity: 0,
      }}
      whileInView={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        delay,
      }}
    >
      <div></div>
      <main>

        <img src={burgerSrc} alt={title} />
        <h5>₹{price}</h5>
        <p>{ title }</p>
        <button onClick={ () => addtocart({ id: id,name: title, price: price, photo: burgerSrc }) }>Buy Now</button> 
        
      </main>
    </motion.div>
  );
};

export default MenuCard;
