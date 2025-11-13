import React, { memo } from "react";
import { motion } from "framer-motion";
import { upIn } from "../../animation/upIn";
import { MdCurrencyRupee } from "react-icons/md";

const MenuCard = memo(({ id, photo, price, name, delay = 0, onClick = () => { } }) => {
console.log("kk");
  return (
    <motion.section { ...upIn(delay) } className="menuCard" >
      <img src={ photo } alt={ name } />
      <h5><MdCurrencyRupee />{ price }</h5>
      <p>{ name }</p>
      <button onClick={ onClick.bind(null, { id, name, price, photo }) }>Buy Now</button>
    </motion.section>
  );
});

export default MenuCard;
