import { create } from "zustand";


export const useCart = create((set) => ({

    cart: {},
    success: { state: null, item: {} },

    add: (payload) => set((state) => {

        if (state.cart[payload.id]) {
        
            return ({
                ...state,
                success: { state: false, item: payload }
            })
            
        } else {
            
            return ({
                ...state,
                success: { state: true, item: payload },
                cart: {
                    ...state.cart,
                    [payload.id]: payload
                }
            })
        }
    }),

}));