export function replaceAllKeys(items, oldKeys, newKeys) {
    let newItem = {};
    const safeItems = [];
    for (let item of items) {
        for (let key in item) {
            for (let i = 0; i < oldKeys.length; i++) {
                const oldKey = oldKeys[i];
                if (oldKey == key) {
                    newItem = { ...item, [newKeys[i]]: item[oldKey] };
                    delete newItem[oldKey];
                }
            }
        }
        safeItems.push(newItem);
    }
    return safeItems;
}