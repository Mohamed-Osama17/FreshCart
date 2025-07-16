import axios from 'axios';
import React, { createContext, useState } from 'react'
import { useEffect } from 'react';
import toast from 'react-hot-toast';


export let CartContext = createContext();

const headers = {
    token: localStorage.getItem('userToken')
}

export default function CartContextProvider({ children }) {

    const [cart, setCart] = useState([]);


    //&===> Add Product To Cart Function
    async function addProductToCart(productId) {
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
                productId: productId
            },
                {
                    headers
                })
            // console.log(data);
            getProductsCart();

            toast.success(data.message, {
                duration: 2000,
                removeDelay: 1000,
                position: 'top-center',
            });

        } catch (error) {
            console.log(error);

        }
    }
    //&===> Update Product To Cart Function
    async function updateProductCountToCart(productId, count) {
        try {
            let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                    count
                }

                , {
                    headers
                })
            // console.log(data);
            setCart(data)

            toast.success(data.status, {
                duration: 1000,
                removeDelay: 1000,
                position: 'top-center',
            });

        } catch (error) {
            console.log(error);

        }
    }


    //&===> Get Product Of Cart Function
    async function getProductsCart() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers
            })

            setCart(data);
            // console.log(data);

        } catch (error) {
            console.log(error.message);

        }
    }
    useEffect(() => {

        getProductsCart();

    }, [])

    //&===> Remove Product Of Cart Function
    async function removeProductFromCart(productId) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                headers
            })

            setCart(data);
            // console.log(data);
            toast.success('Product is removed successfully from your Cart', {
                duration: 2000,
                position: 'top-center',
                removeDelay: 1000,

            })

        } catch (error) {
            console.log(error);

        }
    }

    return <CartContext.Provider value={{ addProductToCart, cart, updateProductCountToCart, removeProductFromCart }}>
        {children}
    </CartContext.Provider>
}

