import { create } from "zustand";

export const useOrder = create((set) => ({
    order: { o: { orderInfo: {},order:{1:{quantity:1}} } },
    add: (payload) => set((state) => ({
        ...state,
        order: {
            ...state.order,
            [payload.orderCode]: { ...payload }
        }
    }))
}));