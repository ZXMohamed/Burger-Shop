import React, { useCallback, useEffect } from "react";
import MenuCard from "./MenuCard";
import useMenu from "../../hook/useMenu";
import { toast } from "react-toastify";
import { useCart } from "../../state/cart";

const Menu = () => {
    const menu = useMenu();
    
    const addCartItemSuccess = useCart((state) => state.success);
    const addItemToCart = useCart((state) => state.add);

    const add = useCallback((item) => {
        addItemToCart(item)
    }, []);
    
    useEffect(
        () => {
            if (addCartItemSuccess.state === true) {
                toast.success("added to cart successfully!");
            } else if (addCartItemSuccess.state === false) {
                toast.info(`" ${addCartItemSuccess.item?.name} " is already in cart!"`);
            }
        }, [addCartItemSuccess.state,addCartItemSuccess?.item]
    );

    return (
        <section id="menu">
            <h1>MENU</h1>
            <div>
                { menu.map((item, inx) => (
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