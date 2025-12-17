import React from 'react'
import { createContext } from 'react';
import { data } from '../data/menu';

export const menu = createContext(data);

function MenuProvider({children}) {

    return (
        <menu.Provider value={ data }>
            { children }
        </menu.Provider>
    );
}

export default MenuProvider;
