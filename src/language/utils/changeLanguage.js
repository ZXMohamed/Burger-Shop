import i18n  from "../i18n";

export const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    changeBrowserLanguage(language);
    typeof window !== "undefined" && localStorage.setItem("language", language);//*SSR
};

export function changeBrowserLanguage(language) {
    const locale = new Intl.Locale(language);
    const direction = locale.getTextInfo().direction;
    typeof document !== "undefined" && (document.documentElement.lang = language);
    typeof document !== "undefined" && (document.documentElement.dir = direction);
};