import React, { useContext } from "react";
import MenuCard from "./MenuCard";
import { Menu as menudata } from "../../menu";


const Menu = () => {
    const data = useContext(menudata);
    console.log(data);
    return (
        <section id="menu">
            <h1>MENU</h1>
            <div className="w-100 h-100">
                { data.map((val, inx) => (
                    <MenuCard
                        key={ inx }
                        burgerSrc={ val.photo }
                        price={ val.price }
                        title={ val.name }
                        id={ val.id }
                        delay={ inx * 0.3 }
                    />
                )) }
            </div>
        </section>
    );
};
export default Menu;
