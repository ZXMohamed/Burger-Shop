export function convertCurrency(price, rate) {
    return (price * rate).toFixed(2);
}