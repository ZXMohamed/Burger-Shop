import { createContext } from "react";

import burger1 from "./assets/burger1.png";
import burger2 from "./assets/burger2.png";
import burger3 from "./assets/burger3.png";

export const Menu = createContext(null)

export function Menu_Provider({children}) { 

    return (
        <Menu.Provider value={data} >
            {children}
        </Menu.Provider>
    )
}



const data = [
    { id:"1",name: "Cheese Burger", price: "200", photo: burger1 },
    { id:"2",name: "Veg Cheese Burger", price: "500", photo: burger2 },
    { id:"3",name: "Cheese Burger with French Fries", price: "1800", photo: burger3 }
];