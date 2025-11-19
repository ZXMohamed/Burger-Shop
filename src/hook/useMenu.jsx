import React, { useContext } from 'react'
import { menu } from '../menu/menuContext';

function useMenu() {
    
    const menuData = useContext(menu);

    return menuData;
}

export default useMenu;