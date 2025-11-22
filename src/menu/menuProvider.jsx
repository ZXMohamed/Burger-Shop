import React from 'react'
import { data } from '../data/menu';
import { Menu } from './menuContext';

function MenuProvider({children}) {

    return (
        <Menu.Provider value={ data }>
            { children }
        </Menu.Provider>
    );
}

export default MenuProvider;
