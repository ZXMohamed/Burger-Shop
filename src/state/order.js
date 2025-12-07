import { create } from "zustand";

export const useOrder = create((set) => ({
    order: { o: { orderInfo: {},order:{} } },
    add: (payload) => set((state) => ({
        ...state,
        order: {
            ...state.order,
            [payload.orderCode]: { ...payload }
        }
    }))
}));