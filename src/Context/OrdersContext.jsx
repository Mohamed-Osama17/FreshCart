import axios from "axios";
import { createContext, useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";

export const OrdersContext = createContext();

export default function OrdersContextProvider({ children }) {
    const [allOrders, setAllOrders] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Memoized fetch functions
    const getAllOrders = useCallback(async (signal) => {
        try {
            const { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/orders`,
                { signal }
            );
            setAllOrders(data?.data || []);
        } catch (err) {
            if (!axios.isCancel(err)) {
                setError('Failed to fetch orders');
                console.error('Orders fetch error:', err);
            }
        }
    }, []);

    const getUserOrders = useCallback(async (userId, signal) => {
        try {
            const { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
                { signal }
            );
            setUserOrders(data || []);
        } catch (err) {
            if (!axios.isCancel(err)) {
                setError('Failed to fetch user orders');
                console.error('User orders fetch error:', err);
            }
        }
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('userToken');
                let userId = null;

                if (token) {
                    try {
                        const decoded = jwtDecode(token);
                        userId = decoded.id;
                        await getUserOrders(userId, signal);
                    } catch (decodeError) {
                        console.error('Token decode error:', decodeError);
                    }
                }

                await getAllOrders(signal);
            } catch (err) {
                if (!axios.isCancel(err)) {
                    setError('Data fetch failed');
                    console.error('Data fetch error:', err);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => abortController.abort();
    }, [getAllOrders, getUserOrders]);

    return (
        <OrdersContext.Provider value={{
            allOrders,
            userOrders,
            isLoading,
            error
        }}>
            {children}
        </OrdersContext.Provider>
    );
}