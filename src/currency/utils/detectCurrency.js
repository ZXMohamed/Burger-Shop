import { Country } from "country-state-city";
import axios from "axios";

//*get saved currency form localStorage (but if it not exist use default browser country to get currency)

export const detectCurrency = async () => {
    const savedCurrency = typeof window !== "undefined" ? localStorage.getItem("currency") : import.meta.env.VITE_DEFAULT_CURRENCY; //*SSR

    if (savedCurrency) {
        return savedCurrency;
    } else {
        let countryCode = "";

        const country = (navigator.language || navigator.userLanguage)?.split('-')[1];

        if (country) {
            countryCode = country;
        } else {
            try {
                const res = await axios.get(import.meta.env.VITE_IP_API_URL);
                const { country } = res.data;
                countryCode = country;
            } catch (error) {
                countryCode = import.meta.env.VITE_DEFAULT_COUNTRY;
            }
        }

        const { currency } = Country.getCountryByCode(countryCode);
        typeof window !== "undefined" && localStorage.setItem("currency", currency); //*SSR

        return currency;
    }
};