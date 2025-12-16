import { useCurrentCurrency } from "../../state/currentCurrency";

export function setCurrentCurrency(currency) {
    typeof window !== "undefined" && localStorage.setItem("currency", currency);//*SSR
    useCurrentCurrency.getState().set({ current: currency });
}