import React, { memo } from "react";
import { motion } from "framer-motion";
import { upIn } from "../../animation/upIn";
import { MdCurrencyRupee } from "react-icons/md";
import { useTranslation } from "react-i18next";
import CurrencyIcon from "../currencyIcon/currencyIcon";

const MenuCard = memo(({ id, photo, price, name, currency, delay = 0, onClick = () => { } }) => {
  const { t } = useTranslation();
  return (
    <motion.section { ...upIn(delay) } className="menuCard" role="menuItem">
      <img src={ photo } alt={ name } />
      <h5><bdi>{ price } <CurrencyIcon currency={currency}/></bdi></h5>
      <p>{ name }</p>
      <button onClick={ onClick.bind(null, id) } data-testid={ `menuItemBtnTest${id}` }>{ t(`home.menu.buyNow`) }</button>
    </motion.section>
  );
});

export default MenuCard;
