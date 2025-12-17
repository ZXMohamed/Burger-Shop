import React, { useCallback } from "react";
import MenuCard from "./MenuCard";
import useMenu from "../../hook/useMenu";
import { toast } from "react-toastify";
import { useCart } from "../../state/cart";
import { useTranslation } from "react-i18next";
import { useCurrentCurrency } from "../../state/currentCurrency";
import { useCurrency } from "../../state/currency";
import Loading from "../loading/loading";
import AlertError from "../alertError/alertError";


const Menu = () => {

    const { t, i18n } = useTranslation();

    const { data: currency, isFetching: currencyIsFetching, isSuccess: currencyIsSuccess, isError: currencyIsError } = useCurrency();
    const currentCurrency = useCurrentCurrency((state) => state.current);

    const menu = useMenu();
    
    const cart = useCart((state) => state.cart);
    const addItemToCart = useCart((state) => state.add);

    const add = useCallback((id,name,inCart) => {
        if(inCart)
            toast.info(`" ${name} " ${t(`msgs.cart.exist`)}`)
        else {
            addItemToCart({ id });
            toast.success(t(`msgs.cart.add`));
        }
    }, [i18n.language]);

    return (
        <section id="menu" className="menuContainer" data-testid="menuTest">
            <h2>{ t(`home.menu.title`) }</h2>
            <section className="menuItems">
                { currencyIsSuccess && Object.values(menu(t, currency?.rates[currentCurrency])).map((item, inx) => (
                    <MenuCard
                        key={ inx }
                        id={ item.id }
                        photo={ item.photo }
                        name={ item.name }
                        price={ item.price }
                        currency={currentCurrency}
                        delay={ inx * 0.3 }
                        onClick={ add }
                        inCart={cart[item.id]}
                    />
                )) }
            </section>
            { currencyIsFetching && <Loading/> }
            { currencyIsError && <AlertError title={ t(`msgs.currency.convertError`) } /> }
        </section>
    );
};
export default Menu;

