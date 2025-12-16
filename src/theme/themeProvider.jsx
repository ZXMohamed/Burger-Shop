import React, { useState } from 'react'
import { changeTheme } from './utils/changeTheme';
import { Theme } from './themeContext';
import { detectTheme } from './utils/detectTheme';

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(detectTheme());
    
    function handleChangeTheme(theme) {
        changeTheme(theme);
        setTheme(detectTheme());
    }

    return (
        <Theme.Provider value={ { changeTheme: handleChangeTheme, currentTheme: theme } } >
            { children }
        </Theme.Provider>
    );
}

export default ThemeProvider;