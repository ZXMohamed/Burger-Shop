import { logo } from "../assets/images/images";
    
export const pageInfo = (t,i18n) => ({
    title: t(`SEO.title`),
    description: t(`SEO.description`),
    icon: logo,
    image: logo,
    type: "Restaurant",
    url: import.meta.env.VITE_CURRENT_URL,
    language: i18n.language,
    keywords: t(`SEO.keywords`),
    LD_Json: {

    }
});