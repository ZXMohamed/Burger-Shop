import React, { memo } from "react";
import { motion } from "framer-motion";
import { upIn } from "../../animation/upIn";
import { useTranslation } from "react-i18next";
import CurrencyIcon from "../currencyIcon/currencyIcon";
import Counter from "../counter/counter";

const MenuCard = memo(({ id, photo, price, name, currency, delay = 0, onClick = () => { } }) => {
  const { t } = useTranslation();
  return (
    <motion.section { ...upIn(delay) } className="menuCard" role="menuItem">
      <img src={ photo } alt={ name } />
      <h5><bdi><Counter from={ 0 } to={ price }><span></span></Counter> <CurrencyIcon currency={ currency } /></bdi></h5>
      <p>{ name }</p>
      <button onClick={ ()=>onClick(id) } data-testid={ `menuItemBtnTest${id}` }>{ t(`home.menu.buyNow`) }</button>
    </motion.section>
  );
});

export default MenuCard;