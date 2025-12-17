import React, { useState } from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router";
import { FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";
import { rightIn } from "../../animation/rightIn";
import { useCart } from "../../state/cart";
import useLanguage from "../../hook/useLanguage";
import { useTranslation } from "react-i18next";
import { useCurrency } from "../../state/currency";
import { useCurrentCurrency } from "../../state/currentCurrency";
import { setCurrentCurrency } from "../../currency/utils/setCurrentCurrency";
import { MdMenu } from "react-icons/md";
import { CgCloseR } from "react-icons/cg";
import { menuTabs, navMenu } from "../../animation/navMenuExpand";
import { useMediaQuery } from "react-responsive";
import ThemeToggler from "../themeToggler/themeToggler";

const Header = () => {

    const location = useLocation();

    const { t, i18n } = useTranslation();
    
    const { changeLanguage } = useLanguage();

    const cartItems = useCart((state) => state.cart);
    
    const { data: currency, isSuccess: currencyIsSuccess } = useCurrency();
    const currentCurrency = useCurrentCurrency((state) => state.current);
    
    const [openMenu, setOpenMenu] = useState(false);
    const isMd = useMediaQuery({ query: '(max-width: 800px)' });

    return (
        <motion.nav variants={ navMenu } initial="collapsed" animate={ isMd ? (openMenu ? "expanded" : "collapsed") : "collapsed" } className="navMenuExpand" data-testid="headerTest">
            <motion.div { ...rightIn(0) }>
                <IoFastFoodOutline />
            </motion.div>
            <motion.div variants={ menuTabs } initial="visible" animate={ isMd ? (openMenu ? "menuExpanded" : "menuCollapsed") : "visible" } className="navTabs">
                <NavLink to="/">{ t(`nav.tabs.home`) }</NavLink>
                <NavLink to="/contact">{ t(`nav.tabs.contact`) }</NavLink>
                <NavLink to="/myorders" state={{ from: location.pathname }}>{ t(`nav.tabs.orders`) }</NavLink>
                <NavLink to="/about">{ t(`nav.tabs.about`) }</NavLink>
                { currencyIsSuccess && <NavLink to="/cart" state={ { from: location.pathname } }>
                    <FiShoppingCart />
                    <div className="cartItemsCount" data-testid="cartIconTest">
                        { Object.keys(cartItems).length }
                    </div>
                </NavLink> }
                <ThemeToggler/>
                <select name="language" onChange={ (e) => { changeLanguage(e.currentTarget.value) } } value={ i18n.language }>
                    { i18n?.services?.resourceStore?.data && Object.keys(i18n.services.resourceStore.data).map((language, inx) => {
                        return <option key={ inx } value={ language }>{ i18n.services.resourceStore.data[language].alias }</option>
                    }) }
                </select>
                { currencyIsSuccess && <select name="currency" onChange={ (e) => { setCurrentCurrency(e.target.value) } } value={ currentCurrency }>
                    { Object.keys(currency.rates).map((currency, inx) => {
                        return <option key={ inx } value={ currency }>{ currency }</option>
                    }) }
                </select> }
            </motion.div>
            {
                isMd ?
                    (!openMenu ?
                        <MdMenu className="navMenuButton" onClick={ () => setOpenMenu(true) } />
                        :
                        <CgCloseR className="navMenuButton" onClick={ () => setOpenMenu(false) } />)
                    :
                    <></>
            }
        </motion.nav>
    );
};
export default Header;