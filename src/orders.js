import { createContext, useReducer } from "react";

export const Orders = createContext(null)

export function Orders_Provider({children}) { 


    const [state,dispatch] = useReducer(reducer,data)

    return (
        <Orders.Provider value={ { data: state, dispatch: dispatch } } >
            {children}
        </Orders.Provider>
    )
}


function reducer(data, action) {
    switch (action.type) {
        case "add_order":
            data[action.payload.ordercode] = {
                order: action.payload.order,
                orderinfo: action.payload.orderinfo
            };
            return data;
            break;
        default:
            break;
    }
}


const data = {};