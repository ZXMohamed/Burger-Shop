//*set object merge function in Object class to
//*use it any where in the site
export function objectMerge() {    
    Object.merge = merge;
    function merge(obj1, obj2, options = { type: Array }) {
        let temp = {};
        let output = new options.type();
        for (let key in obj1) {
            if (options.type == Array) {
                temp = { ...obj1[key], ...obj2[key] }
                output.push(temp);

            } else if (options.type == Object) {

                temp = { [key]: { ...obj1[key], ...obj2[key] } }
                output = { ...output, ...temp };
            }
            temp = {};
        }
        return output;
    }
}