import { useQuery } from "@tanstack/react-query";

export const useCurrency = (base = import.meta.env.VITE_DEFAULT_CURRENCY) => {
    return useQuery({
        queryKey: ["currency", base],
        queryFn: async () => {
            const res = await fetch(`${import.meta.env.VITE_CURRENCY_API_URL}${base}`);
            if (res.ok) {
                return await res.json();
            }
            else {
                return res;
            }
        }
    });
};