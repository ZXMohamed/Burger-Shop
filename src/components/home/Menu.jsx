import React, { useCallback, useEffect } from "react";
import MenuCard from "./MenuCard";
import useMenu from "../../hook/useMenu";
import { toast } from "react-toastify";
import { useCart } from "../../state/cart";
import { useTranslation } from "react-i18next";
import { useCurrentCurrency } from "../../state/currentCurrency";
import { useCurrency } from "../../state/currency";
import useUpdateEffect from "../../hook/useUpdateEffect";

const Menu = () => {

    const { t } = useTranslation();

    const { data: currency, isSuccess: currencyIsSuccess, isError: currencyIsError } = useCurrency();
    const currentCurrency = useCurrentCurrency((state) => state.current);

    const menu = useMenu();
    
    const addCartItemSuccess = useCart((state) => state.success);
    const addItemToCart = useCart((state) => state.add);

    const add = useCallback((id) => {
        addItemToCart({ id });
    }, []);
    
    useUpdateEffect(() => {
        if (addCartItemSuccess.state === true) {
            toast.success(t(`msgs.cart.add`));
        } else if (addCartItemSuccess.state === false) {
            const item = menu(t)[addCartItemSuccess.item.id];
            toast.info(`" ${item.name} " ${t(`msgs.cart.exist`)}`);
        }
    });

    return (
        <section id="menu" className="menuContainer" data-testid="menuTest">
            <h1>{ t(`home.menu.title`) }</h1>
            <div>
                { currencyIsSuccess && Object.values(menu(t, currency?.rates[currentCurrency])).map((item, inx) => (
                    <MenuCard
                        key={ inx }
                        id={ item.id }
                        photo={ item.photo }
                        name={ item.name }
                        price={ item.price }
                        currency={currentCurrency}
                        delay={ inx * 0.3 }
                        onClick={add}
                    />
                )) }
            </div>
            {currencyIsError && <span>{t(`msgs.currency.convertError`)}</span>}//!
        </section>
    );
};
export default Menu;

