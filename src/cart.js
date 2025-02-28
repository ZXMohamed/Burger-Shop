import { createContext, useReducer } from "react";

export const Cart = createContext(null)

export function Cart_Provider({children}) { 

    const [state,dispatch] = useReducer(reducer,data)

    return (
        <Cart.Provider value={ { data: state, dispatch: dispatch } } >
            {children}
        </Cart.Provider>
    )
}


function reducer(data, action) {
    let datatemp = {};
    switch (action.type) {
        case "add_cart_item":
            datatemp = { ...data };
            datatemp[action.payload.id] = action.payload;
            return datatemp;
            break;
        case "set_quantity":
            for (let id in action.payload) { 
                data[id]["quantity"] = action.payload[id].quantity;
            }
            return data;
            break;
        case "empty_cart":
            datatemp = {};
            return datatemp;
            break;
        default:
            break;
    }
}


const data = {}