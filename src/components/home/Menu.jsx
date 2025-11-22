import React, { useCallback, useEffect } from "react";
import MenuCard from "./MenuCard";
import useMenu from "../../hook/useMenu";
import { toast } from "react-toastify";
import { useCart } from "../../state/cart";
import { useTranslation } from "react-i18next";

const Menu = () => {

    const { t } = useTranslation();

    const menu = useMenu();
    
    const addCartItemSuccess = useCart((state) => state.success);
    const addItemToCart = useCart((state) => state.add);

    const add = useCallback((id) => {
        addItemToCart({ id });
    }, []);
    
    useEffect(
        () => {//! on mount this toast fired
            if (addCartItemSuccess.state === true) {
                toast.success(t(`msgs.cart.add`));
            } else if (addCartItemSuccess.state === false) {
                const item = menu[addCartItemSuccess.item.id];
                toast.info(`" ${item.name} " ${t(`msgs.cart.exist`)}`);
            }
        }
    );

    return (
        <section id="menu" data-testid="menuTest">
            <h1>{ t(`home.menu.title`) }</h1>
            <div>
                { Object.values(menu(t)).map((item, inx) => (
                    <MenuCard
                        key={ inx }
                        id={ item.id }
                        photo={ item.photo }
                        name={ item.name }
                        price={ item.price }
                        delay={ inx * 0.3 }
                        onClick={add}
                    />
                )) }
            </div>
        </section>
    );
};
export default Menu;