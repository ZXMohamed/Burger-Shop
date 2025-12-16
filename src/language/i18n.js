import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { detectLanguage } from "./utils/detectLanguage";

import layout_EN from "./languages/en/layout.json";
import pages_EN from "./languages/en/pages.json";
import menu_EN from "./languages/en/menu.json";
import msgs_EN from "./languages/en/msgs.json";
import SEO_EN from "./languages/en/SEO.json";

import layout_AR from "./languages/ar/layout.json";
import pages_AR from "./languages/ar/pages.json";
import menu_AR from "./languages/ar/menu.json";
import msgs_AR from "./languages/ar/msgs.json";
import SEO_AR from "./languages/ar/SEO.json";

import layout_HI from "./languages/hi/layout.json";
import pages_HI from "./languages/hi/pages.json";
import menu_HI from "./languages/hi/menu.json";
import msgs_HI from "./languages/hi/msgs.json";
import SEO_HI from "./languages/hi/SEO.json";


export const resources = {
  en: { alias: "en", translation: { ...layout_EN, ...pages_EN, ...menu_EN, ...msgs_EN, ...SEO_EN } },
  ar: { alias: "ع", translation: { ...layout_AR, ...pages_AR, ...menu_AR, ...msgs_AR, ...SEO_AR } },
  hi: { alias: "ह", translation: { ...layout_HI, ...pages_HI, ...menu_HI, ...msgs_HI, ...SEO_HI } }
}


i18n.use(initReactI18next)
  .init({
    resources,
    lng: import.meta.env.VITE_DEFAULT_LANGUAGE,
    fallbackLng: "en",
      interpolation: {
        escapeValue: false
      }
  });

export default i18n;