import { create } from "zustand";

export const useOrder = create((set) => ({
    order: { o: { orderId: "kjk", orderCode: "o", order: {}, orderInfo: {} }, oy: { orderId: "kjk", orderCode: "o", order: {}, orderInfo: {} }, o4y: { orderId: "kjk", orderCode: "o", order: {}, orderInfo: {} } },
    add: (payload) => set((state) => ({
        ...state,
        order: {
            ...state.order,
            [payload.orderCode]: { ...payload }
        }
    }))
}));