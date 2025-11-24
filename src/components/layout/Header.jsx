import React from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { NavLink } from "react-router";
import { FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";
import { rightIn } from "../../animation/rightIn";
import { useCart } from "../../state/cart";
import useLanguage from "../../hook/useLanguage";
import { useTranslation } from "react-i18next";
import { useCurrency } from "../../state/currency";
import { useCurrentCurrency } from "../../state/currentCurrency";
import { setCurrentCurrency } from "../../currency/utils/setCurrentCurrency";


const Header = () => {

    const cartItems = useCart((state) => state.cart);
    const { changeLanguage } = useLanguage();
    const { data: currency, isSuccess: currencyIsSuccess, isError: currencyIsError, isLoading: currencyIsLoading } = useCurrency();
    const currentCurrency = useCurrentCurrency((state) => state.current);
    const { t, i18n } = useTranslation();

    return (
        <nav data-testid="headerTest">
            <motion.div {...rightIn(0)}>
                <IoFastFoodOutline />
            </motion.div>
            <div>
                <NavLink to="/">{ t(`nav.tabs.home`) }</NavLink>
                <NavLink to="/contact">{ t(`nav.tabs.contact`) }</NavLink>
                <NavLink to="/myorders">{ t(`nav.tabs.orders`) }</NavLink>
                <NavLink to="/about">{ t(`nav.tabs.about`) }</NavLink>
                <NavLink to="/cart">
                    <FiShoppingCart />
                    <div className="cartItemsCount" data-testid="cartIconTest">
                        {Object.keys(cartItems).length}
                    </div>
                </NavLink>
                <select onChange={(e)=>{changeLanguage(e.currentTarget.value)}} defaultValue={i18n.language}>
                    { Object.keys(i18n.services.resourceStore.data).map((language,inx) => {
                        return <option key={inx} value={language}>{ i18n.services.resourceStore.data[language].alias }</option>
                    })}
                </select>
                { currencyIsSuccess && <select onChange={ (e) => { setCurrentCurrency( e.target.value ) } } value={currentCurrency}>
                    { Object.keys(currency.rates).map((currency, inx) => {
                        return <option key={ inx } value={ currency }>{ currency }</option>
                    }) }
                </select> }
            </div>
        </nav>
    );
};
export default Header;