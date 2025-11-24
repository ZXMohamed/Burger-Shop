import { Country } from "country-state-city";


//*get saved currency form localStorage (but if it not exist use default browser country to get currency)

export const detectCurrency = async() => {

    const savedCurrency = localStorage.getItem("currency");

    if (savedCurrency) {

        return savedCurrency;

    } else {

        let countryCode = "";
        const country = (navigator.language || navigator.userLanguage)?.split('-')[1];
        if (!country) {
            const res = await fetch(import.meta.env.VITE_IP_API_URL);
            if (res.ok) {
                const { country } = await res.json();
                countryCode = country;
            } else {
                countryCode = import.meta.env.VITE_DEFAULT_COUNTRY;
            }
        } else {
            countryCode = country;
        } console.log(countryCode,Country.getCountryByCode(countryCode));
        const { currency } = Country.getCountryByCode(countryCode);
        localStorage.setItem("currency", currency);
        return currency;

    }
}