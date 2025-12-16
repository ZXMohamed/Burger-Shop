import { changeTheme } from "./changeTheme";
import themes from "../themes/themes.json";


//*get saved Theme form localStorage (but if it not exist use default browser theme)


export const detectTheme = () => {

    const savedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : import.meta.env.VITE_DEFAULT_THEME; //*SSR

    if (savedTheme) {

        typeof document !== "undefined" && document.documentElement.setAttribute('data-theme', savedTheme);
        
        return savedTheme;
    
    } else {
        
        const browserTheme = window.matchMedia && window.matchMedia(`(prefers-color-scheme: ${themes.dark.value})`).matches;
        const theme = browserTheme ? themes.dark.value : themes.light.value;
        changeTheme(theme);
        
        return theme;
    }


}