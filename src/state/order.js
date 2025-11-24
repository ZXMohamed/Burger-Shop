import { create } from "zustand";

export const useOrder = create((set) => ({
    order: {
        1: {
            orderCode: "asd",
            order: {1:{quantity:1}},
            orderInfo: {}
    }},
    add: (payload) => set((state) => ({
        ...state,
        order: {
            ...state.order,
            [payload.orderCode]: { ...payload }
        }
    }))
}));