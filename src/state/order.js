import { create } from "zustand";

export const useOrder = create((set) => ({
    order: {
        k45: {
            order: { 1: { quantity: 1 } },
            orderCode: "k45",
            orderInfo: {
                HNo: "value.homeNumber",
                city: "value.city",
                country: "value.country",
                state: "value.state",
                PinCode: "value.pinCode",
                PhoneNo: "value.phoneNumber",
                status: "processing",
                paymentMethod: "COD"
            }
        }
},
    add: (payload) => set((state) => ({
        ...state,
        order: {
            ...state.order,
            [payload.orderCode]: { ...payload }
        }
    }))
}));