import { create } from "zustand";


export const useCart = create((set) => ({

    cart: { 1: { quantity: 1 }, 2: { quantity: 1 } },
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
                    [payload.id]: { quantity: 1 }
                }
            })
        }
    }),
    INCQuantity: (payload) => set((state) => {
        if (state.cart[payload.id].quantity < 10) {
            return {
                ...state,
                ...state.success,
                cart: {
                    ...state.cart,
                    [payload.id]: {
                        quantity: state.cart[payload.id].quantity + 1
                    }
                }
            }
        } else {
            return state;
        }
    }),
    DECQuantity: (payload) => set((state) => {
        if (state.cart[payload.id].quantity > 0) {
            return {
                ...state,
                ...state.success,
                cart: {
                    ...state.cart,
                    [payload.id]: {
                        quantity: state.cart[payload.id].quantity - 1
                    }
                }
            }
        } else {
            return state;
        }
    }),
    empty: () => set((state) => ({
            ...state,
            cart: {}
        }
    ))
}));