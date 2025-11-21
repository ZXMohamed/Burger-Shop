import i18n from '../language/i18n';
import { burger1, burger2, burger3 } from '../assets/images/images';

export const data = ()=> ({
    "1": { id: "1", name: i18n.t(`menu.1.name`), price: "200", photo: burger1 },
    "2": { id: "2", name: i18n.t(`menu.2.name`), price: "500", photo: burger2 },
    "3": { id: "3", name: i18n.t(`menu.3.name`), price: "1800", photo: burger3 }
});