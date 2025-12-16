import { create } from "zustand";
import { detectCurrency } from "../currency/utils/detectCurrency";

export const useCurrentCurrency = create((set) => ({
    
    current: import.meta.env.VITE_DEFAULT_CURRENCY,

    set: (payload) => set((state) => ({
        ...state,
        current: payload.current
    })),

    detect: async () => {
        const currency = await detectCurrency();
        set((state) => ({
            ...state,
            current: currency
        }))
    }
    
}));