import React, { useCallback, useEffect } from "react";
import MenuCard from "./MenuCard";
import useMenu from "../../hook/useMenu";
import { toast } from "react-toastify";
import { useCart } from "../../state/cart";

const Menu = () => {
    const menu = useMenu();
    
    const addCartItemSuccess = useCart((state) => state.success);
    const addItemToCart = useCart((state) => state.add);

    const add = useCallback((id) => {
        addItemToCart({ id });
    }, []);
    
    useEffect(
        () => {
            if (addCartItemSuccess.state === true) {
                toast.success("added to cart successfully!");
            } else if (addCartItemSuccess.state === false) {
                const item = menu[addCartItemSuccess.item.id];
                toast.info(`" ${item.name} " is already in cart!"`);
            }
        }
    );

    return (
        <section id="menu" data-testid="menuTest">
            <h1>MENU</h1>
            <div>
                { Object.values(menu).map((item, inx) => (
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