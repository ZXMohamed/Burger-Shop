import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCurrency = (base = import.meta.env.VITE_DEFAULT_CURRENCY) => {
    return useQuery({
        queryKey: ["currency", base],
        queryFn: async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_CURRENCY_API_URL}${base}`);
                return res.data;
            } catch (error) {
                return error.response || error;
            }
        }
    });
};