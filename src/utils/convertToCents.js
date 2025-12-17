function getCurrencyMultiplier(currencyCode) {

    const formatter = new Intl.NumberFormat('en', {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'code'
    });


    const minorUnits = formatter.resolvedOptions().minimumFractionDigits;

    return Math.pow(10, minorUnits);
}

export function convertToCents(currencyCode, amount) {
    const multiplier = getCurrencyMultiplier(currencyCode);

    const convertedAmount = parseFloat(amount) * multiplier;

    return Math.round(convertedAmount);
}

export function itemsToCents(items, currencyCode) {
    for (let item of items) {
        const amount = item.amount;
        const toCents = convertToCents(currencyCode, amount);
        item.amount = toCents;
    }
    return items;
}