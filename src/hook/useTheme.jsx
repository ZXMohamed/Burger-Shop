import React, { useContext } from 'react'
import { Theme } from '../theme/themeContext';


function useTheme() {
    
    const themeControl = useContext(Theme);

    return themeControl;

}

export default useTheme;