import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function usePayment() {
    return useMutation({
        mutationFn: async (data) => {
            const res = await axios.post(import.meta.env.VITE_PAYMENT_URL, data, {
                headers: {
                    Authorization: `Token ${import.meta.env.VITE_PAYMENT_AUTH_SK}`
                }
            });
            return res.data;
        },
    });
}
