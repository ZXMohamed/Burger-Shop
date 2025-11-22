import { burger1, burger2, burger3 } from '../assets/images/images';

export const data = (t) => ({
    "1": { id: "1", name: t(`menu.1.name`), price: "200", photo: burger1 },
    "2": { id: "2", name: t(`menu.2.name`), price: "500", photo: burger2 },
    "3": { id: "3", name: t(`menu.3.name`), price: "1800", photo: burger3 }
});