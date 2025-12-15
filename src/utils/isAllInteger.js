export function isAllInteger () {
    //*create isAllInteger function on Number class to use it in whole site
    //*check if list of numbers are integer
    Number.isAllInteger = (...numbers) => {
        for (const i of [...numbers]) {
            if (!Number.isInteger(i))
                return false;
        }
        return true;
    }
}