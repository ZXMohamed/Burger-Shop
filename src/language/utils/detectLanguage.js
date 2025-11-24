import { resources as i18n } from "../i18n";


//*get saved Language form localStorage (but if it not exist use default browser language)

export const detectLanguage = () => {

    const savedLanguage = localStorage.getItem("language");

    if (savedLanguage) {

        const locale = new Intl.Locale(savedLanguage);
        const direction = locale.getTextInfo().direction;
        document.documentElement.lang = savedLanguage;
        document.documentElement.dir = direction;
        return savedLanguage;

    } else {

        const language = (navigator.language || navigator.userLanguage)?.split('-')[0];
        let browserLanguage = "";
        if (language && i18n[language]) {
            browserLanguage = language;
        } else {
            browserLanguage = import.meta.env.VITE_DEFAULT_LANGUAGE;
        }
        const locale = new Intl.Locale(browserLanguage);
        const direction = locale.getTextInfo().direction;
        document.documentElement.lang = browserLanguage;
        document.documentElement.dir = direction;
        localStorage.setItem("language", browserLanguage);
        return browserLanguage;

    }
}