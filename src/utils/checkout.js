export function checkout(menu, cart) {

    let subtotal = 0;
    for (const id in cart) {
        const menuItem = menu[id];
        subtotal += (parseFloat(menuItem.price) * parseInt(cart[id].quantity));
    }

    const tax = parseFloat((subtotal * 0.10).toFixed(2));
    
    const shipping = 200;
    
    const total = parseFloat((subtotal === 0 ? 0 : subtotal + tax + shipping).toFixed(2));

    return { subtotal, tax, shipping, total };
}