import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useProducts() {
    async function getProducts() {
        const { data } = await axios.get(
            `https://ecommerce.routemisr.com/api/v1/products`
        );
        return data;
    }

    return useQuery({
        queryKey: ['recentProducts'],
        queryFn: getProducts,
        select: (response) => response.data,
        gcTime: 5 * 60 * 1000, // 5 minutes (matches default)
        staleTime: 0, // Data is immediately stale (default)
    });
}