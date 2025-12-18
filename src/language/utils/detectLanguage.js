import { matchPath } from "react-router";
import { resources as i18n } from "../i18n";
import { changeBrowserLanguage } from "./changeLanguage";


//*get saved Language form localStorage (but if it not exist use default browser language)

export const detectLanguage = () => {

    const savedLanguage = typeof window !== "undefined" ? localStorage.getItem("language") : import.meta.env.VITE_DEFAULT_LANGUAGE;//*SSR

    if (savedLanguage) {

        changeBrowserLanguage(savedLanguage);

        return savedLanguage;

    } else {

        const language = (navigator.language || navigator.userLanguage)?.split('-')[0];
        let browserLanguage = "";
        if (language && i18n[language]) {
            browserLanguage = language;
        } else {
            browserLanguage = import.meta.env.VITE_DEFAULT_LANGUAGE;
        }
        
        changeBrowserLanguage(browserLanguage);

        return browserLanguage;

    }
}