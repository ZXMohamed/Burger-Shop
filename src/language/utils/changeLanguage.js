import i18n from "../i18n";

export const changeLanguage = (language) => {
    i18n.changeLanguage(language, () => {
        const locale = new Intl.Locale(language);
        const direction = locale.getTextInfo().direction;
        document.documentElement.lang = language;
        document.documentElement.dir = direction;
        localStorage.setItem("language", language);
    });
};