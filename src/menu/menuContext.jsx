import React from 'react'
import { createContext } from 'react';
import { burger1, burger2, burger3 } from '../assets/images/images';

const data = [
    { id:"1",name: "Cheese Burger", price: "200", photo: burger1 },
    { id:"2",name: "Veg Cheese Burger", price: "500", photo: burger2 },
    { id:"3",name: "Cheese Burger with French Fries", price: "1800", photo: burger3 }
];

export const menu = createContext(data);

function MenuProvider({children}) {

    return (
        <menu.Provider value={ data }>
            { children }
        </menu.Provider>
    );
}

export default MenuProvider;
