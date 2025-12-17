import React from 'react'
import { pageInfo } from '../../data/SEO';
import useMenu from '../../hook/useMenu';
import { useCurrentCurrency } from '../../state/currentCurrency';
import { useCurrency } from '../../state/currency';
import { useTranslation } from 'react-i18next';
import {Helmet} from 'react-helmet-async';


function SEO() {

    const { t, i18n } = useTranslation();

    const { title, description, image, icon, type, language, keywords, LD_Json } = pageInfo(t, i18n);
    const pageTitle = pageInfo(t,i18n).title;

    const menu = useMenu();

    const { data: currency, isSuccess: currencyIsSuccess } = useCurrency();
    const currentCurrency = useCurrentCurrency((state) => state.current);

    const LD_Json_Schema = {
        "@context": "https://schema.org",
        "@type": type,
        "name": title,
        "url": import.meta.env.VITE_CURRENT_URL,
        "logo": image,
        "description": description,
        "servesCuisine": t(`SEO.LD_Json.servesCuisine`),
        "hasMenu": {
            "@type": "Menu",
            "name": "Main Menu",
            "url": import.meta.env.VITE_CURRENT_URL + "/#menu"
        },
        "hasDeliveryMethod": {
            "@type": "FoodEstablishmentDelivery",
            "name": "Restaurant Delivery Service",
            "url": import.meta.env.VITE_CURRENT_URL
        },
        "makesOffer": currencyIsSuccess && [...(Object.values(menu(t, currency.rates[currentCurrency])).map((item) => ({
            "@type": "Offer",
            "itemOffered": {
                "@type": "MenuItem",
                "name": item.name,
                "image": import.meta.env.VITE_CURRENT_URL + item.photo
            },
            "price": item.price,
            "priceCurrency": currentCurrency,
            "availability": "https://schema.org/InStock"
        })))],
        ...LD_Json,
    }

    return (
        <Helmet>
            {/* <!-- meta --> */ }
            <meta charset="UTF-8" />
            <meta name="application-name" content={title} />
            <meta name="description" content={ description } />
            <meta name="keywords" content={ keywords } />
            <meta name="generator" content="React-dom" />
            <meta name="author" content={ title } />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            <meta property="og:title" content={ title } />
            <meta property="og:site_name" content={ title } />
            <meta property="og:description" content={ description } />
            <meta property="og:type" content={ type } />
            <meta property="og:image" content={ import.meta.env.VITE_CURRENT_URL + image } />
            <meta property="og:image:alt" content={ title } />
            <meta property="og:url" content={ import.meta.env.VITE_CURRENT_URL } />
            <meta property="og:locale" content={ language } />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@BurgerShop" />
            <meta name="twitter:creator" content="@BurgerShop" />
            <meta name="twitter:title" content={ title } />
            <meta name="twitter:description" content={ description } />
            <meta name="twitter:image" content={ import.meta.env.VITE_CURRENT_URL + image } />
            <meta name="twitter:image:alt" content={ title } />

            {/* <!-- link --> */ }
            <link rel="canonical" href={ import.meta.env.VITE_CURRENT_URL } />
            <link rel="author" href={import.meta.env.VITE_CURRENT_URL} />

            <link rel="alternate" href={ import.meta.env.VITE_CURRENT_URL + "en/" } hreflang="en" />
            <link rel="alternate" href={ import.meta.env.VITE_CURRENT_URL + "ar/" } hreflang="ar" />
            <link rel="alternate" href={ import.meta.env.VITE_CURRENT_URL + "hi/" } hreflang="hi" />

            <link rel="alternate" href={ import.meta.env.VITE_CURRENT_URL + "en/about" } hreflang="en" />
            <link rel="alternate" href={ import.meta.env.VITE_CURRENT_URL + "ar/about" } hreflang="ar" />
            <link rel="alternate" href={ import.meta.env.VITE_CURRENT_URL + "hi/about" } hreflang="hi" />

            <link rel="alternate" href={ import.meta.env.VITE_CURRENT_URL + "en/contact" } hreflang="en" />
            <link rel="alternate" href={ import.meta.env.VITE_CURRENT_URL + "ar/contact" } hreflang="ar" />
            <link rel="alternate" href={ import.meta.env.VITE_CURRENT_URL + "hi/contact" } hreflang="hi" />

            <link rel="icon" type="image/svg+xml" href={ import.meta.env.VITE_CURRENT_URL + icon } />

            {/* <!-- script --> */ }
            <script type="application/ld+json">
                { JSON.stringify(LD_Json_Schema) }
            </script>

            {/* <!-- title --> */ }
            { pageTitle && <title>{ pageTitle }</title> }

        </Helmet>
    )
}

export default SEO;