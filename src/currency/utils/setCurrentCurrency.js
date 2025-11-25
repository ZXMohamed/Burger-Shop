import { useCurrentCurrency } from "../../state/currentCurrency";

export function setCurrentCurrency(currency) {
    localStorage.setItem("currency", currency);
    useCurrentCurrency.getState().set({ current: currency });
}