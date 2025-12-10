import { changeTheme } from "./changeTheme";
import themes from "../themes/themes.json";


//*get saved Theme form localStorage (but if it not exist use default browser theme)


export const detectTheme = () => {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {

        document.documentElement.setAttribute('data-theme', savedTheme);
        
        return savedTheme;
    
    } else {
        
        const browserTheme = window.matchMedia && window.matchMedia(`(prefers-color-scheme: ${themes.dark.value})`).matches;
        const theme = browserTheme ? themes.dark.value : themes.light.value;
        changeTheme(theme);
        
        return theme;
    }


}