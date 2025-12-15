import React from 'react'
import { CgDarkMode } from "react-icons/cg";
import useTheme from '../../hook/useTheme';
import themes from "../../theme/themes/themes.json";


function ThemeToggler() {
    const { changeTheme, currentTheme } = useTheme();

    function toggleTheme() {
      if (currentTheme == themes.dark.value) {
        changeTheme(themes.light.value)
      } else {
        changeTheme(themes.dark.value)
      }
    }
  return (
    <CgDarkMode className='themeToggler' onClick={()=>toggleTheme()}/>
  )
}

export default ThemeToggler;