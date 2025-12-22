import React, { memo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { upIn } from "../../animation/upIn";
import { useTranslation } from "react-i18next";
import CurrencyIcon from "../currencyIcon/currencyIcon";
import Counter from "../counter/counter";
import { BsFillCartCheckFill } from "react-icons/bs";
import { loadMainImage } from "../../assets/images/images";


const MenuCard = memo(({ id, photo, price, name, currency, delay = 0, inCart = false, onClick = () => { } }) => {
  
  const MenuCardImg = useRef();

  const { t } = useTranslation();

  useEffect(() => {
    loadMainImage(photo, MenuCardImg, { type: "img" });
  }, []);

  return (
    <motion.section { ...upIn(delay) } className="menuCard" role="menuItemTest">
      <img ref={MenuCardImg} src={ photo } alt={ name } loading="lazy"/>
      <h3><bdi><Counter from={ 0 } to={ price }><span></span></Counter> <CurrencyIcon currency={ currency } /></bdi></h3>
      <p>{ name }</p>
      <button className={ inCart ? "menuCardinCartButton" : "" } onClick={ () => onClick(id, name, inCart) } data-testid={ `menuItemBtnTest${id}` }>
        { inCart ? <BsFillCartCheckFill size={20}/> : t(`home.menu.buyNow`) }
      </button>
    </motion.section>
  );
});

export default MenuCard;