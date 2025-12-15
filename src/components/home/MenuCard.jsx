import React, { memo } from "react";
import { motion } from "framer-motion";
import { upIn } from "../../animation/upIn";
import { useTranslation } from "react-i18next";
import CurrencyIcon from "../currencyIcon/currencyIcon";
import Counter from "../counter/counter";
import { BsFillCartCheckFill } from "react-icons/bs";


const MenuCard = memo(({ id, photo, price, name, currency, delay = 0, inCart=false, onClick = () => { } }) => {
  const { t } = useTranslation();
  return (
    <motion.section { ...upIn(delay) } className="menuCard" role="menuItem">
      <img src={ photo } alt={ name } />
      <h3><bdi><Counter from={ 0 } to={ price }><span></span></Counter> <CurrencyIcon currency={ currency } /></bdi></h3>
      <p>{ name }</p>
      <button className={ inCart ? "menuCardinCartButton" : "" } onClick={ () => onClick(id, name, inCart) } data-testid={ `menuItemBtnTest${id}` }>
        { inCart ? <BsFillCartCheckFill size={20}/> : t(`home.menu.buyNow`) }
      </button>
    </motion.section>
  );
});

export default MenuCard;