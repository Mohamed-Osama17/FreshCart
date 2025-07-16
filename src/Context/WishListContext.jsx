import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const WishListContext = createContext();

export default function WishListContextProvider({ children }) {
    const [wishList, setWishList] = useState([]);

    const headers = {
        token: localStorage.getItem('userToken')
    };

    async function getUserWishList() {
        try {
            const { data } = await axios.get(
                'https://ecommerce.routemisr.com/api/v1/wishlist',
                { headers }
            );
            // Set to actual wishlist array from response data
            setWishList(data?.data || []);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            setWishList([]);
        }
    }

    async function addProductToWishList(productId) {
        try {
            const { data } = await axios.post(
                'https://ecommerce.routemisr.com/api/v1/wishlist',
                { productId },
                { headers }
            );

            // Refresh wishlist data
            await getUserWishList();

            toast.success(data.message, {
                position: 'top-center'
            });
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            toast.error('Failed to add to wishlist');
        }
    }

    async function removeProductFromWishList(productId) {
        try {
            const { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                { headers }
            );

            // Filter out removed item immediately
            // setWishList(prev => prev.filter(item => item.id !== productId));
            const newFavouriteList = wishList.filter(item => item.id !== productId);
            setWishList(newFavouriteList)

            toast.success(data.message, {
                position: 'top-center'
            });
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            toast.error('Failed to remove from wishlist');
        }
    }

    const checkFavourite = (productId) => {
        return wishList.some(item => item.id === productId);
    };

    useEffect(() => {
        if (headers.token) {
            getUserWishList();
        }
    }, []);

    return (
        <WishListContext.Provider value={{
            wishList,
            addProductToWishList,
            removeProductFromWishList,
            checkFavourite
        }}>
            {children}
        </WishListContext.Provider>
    );
}