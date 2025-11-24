import { convertCurrency } from "../currency/utils/convertCurrency";
import i18n from "../language/i18n";

export function checkout(menu, cart, priceRate = 1) {

    let subtotal = 0;
    for (const id in cart) {
        const menuItem = menu(i18n.t, priceRate)[id];
        subtotal += (parseFloat(menuItem.price) * parseInt(cart[id].quantity));
    }

    subtotal = parseFloat(subtotal.toFixed(2));

    const tax = parseFloat((subtotal * 0.10).toFixed(2));
    
    const shipping = parseFloat(convertCurrency(2.24, priceRate));
    
    const total = parseFloat((subtotal === 0 ? 0 : subtotal + tax + shipping).toFixed(2));

    return { subtotal, tax, shipping, total };
}