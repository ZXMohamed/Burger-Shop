import { burger1, burger2, burger3 } from '../assets/images/images';
import { convertCurrency } from '../currency/utils/convertCurrency';

export const data = (t, priceRate = 1) => ({
    "1": { id: "1", name: t(`menu.1.name`), price: convertCurrency("2.23", priceRate), photo: burger1 },
    "2": { id: "2", name: t(`menu.2.name`), price: convertCurrency("5.58", priceRate), photo: burger2 },
    "3": { id: "3", name: t(`menu.3.name`), price: convertCurrency("20.08", priceRate), photo: burger3 }
});