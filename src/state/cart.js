import { create } from "zustand";


export const useCart = create((set) => ({

    cart: {},

    add: (payload) => set((state) => {

        if (state.cart[payload.id]) {
        
            return state;
            
        } else {
            
            return ({
                ...state,
                success: { state: true, item: payload },
                cart: {
                    ...state.cart,
                    [payload.id]: { quantity: 1 }
                }
            })
        }
    }),

}));