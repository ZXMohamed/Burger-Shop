import React, { useContext } from 'react'
import { Menu } from '../menu/menuContext';

function useMenu() {
    
    const menuData = useContext(Menu);

    return menuData;
}

export default useMenu;