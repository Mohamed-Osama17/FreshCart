import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import { DarkModeContext } from '../../Context/DarkModeContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('online');
    const [apiError, setApiError] = useState(null);
    const { cart } = useContext(CartContext);
    const { darkMode } = useContext(DarkModeContext);
    const navigate = useNavigate();

    const headers = {
        token: localStorage.getItem('userToken')
    };

    const validationSchema = Yup.object().shape({
        phone: Yup.string()
            .required('Phone is required')
            .matches(/^01[0125][0-9]{8}$/, 'Invalid Egyptian phone number'),
        city: Yup.string().required('City is required'),
        details: Yup.string()
            .required('Address details are required')
            .min(10, 'Address must be at least 10 characters')
            .max(100, 'Address cannot exceed 100 characters'),
    });

    const formik = useFormik({
        initialValues: {
            phone: '',
            city: '',
            details: '',
        },
        validationSchema,
        onSubmit: (values) => {
            if (paymentMethod === 'online') {
                handleCheckout(values);
            } else {
                handleCashOrder(values);
            }
        },
    });

    async function handleCheckout(shippingAddress) {
        try {
            setLoading(true);
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`,
                { shippingAddress },
                { headers }
            );

            toast.success(data.status, {
                style: {
                    borderRadius: '10px',
                    background: darkMode ? '#6366f1' : '#8b5cf6',
                    color: '#fff',
                },
            });

            setTimeout(() => {
                window.location.href = data.session.url;
            }, 1500);
        } catch (error) {
            console.error(error);
            setApiError(error.response?.data?.message || 'An error occurred');
            setLoading(false);
        }
    }

    async function handleCashOrder(shippingValues) {
        setLoading(true);
        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,
                { shippingAddress: shippingValues },
                { headers }
            );

            navigate('/userorders');
            toast.success('Your order has been placed successfully', {
                style: {
                    borderRadius: '10px',
                    background: darkMode ? '#6366f1' : '#8b5cf6',
                    color: '#fff',
                },
            });
        } catch (error) {
            console.error(error);
            setApiError(error.response?.data?.message || 'An error occurred');
            setLoading(false);
        }
    }

    return (
        <div className={`min-h-screen py-12 px-4 sm:px-6 transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-purple-950 to-fuchsia-950' : ''}`}>
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 relative">
                    <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'bg-gradient-to-r bg-clip-text text-transparent from-purple-600 to-fuchsia-600' : 'bg-gradient-to-r bg-clip-text text-transparent from-[#ff7f00] to-[#ffcc00]'}`}>
                        Secure Checkout
                    </h1>
                    <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Complete your purchase with confidence
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Shipping Form */}
                    <div className="lg:w-7/12">
                        <div className={`rounded-2xl shadow-xl overflow-hidden border transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                            <div className={`px-6 py-5 bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'}`}>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    Shipping Information
                                </h2>
                            </div>

                            <form onSubmit={formik.handleSubmit} className="p-6">
                                <div className="space-y-6">
                                    {/* Phone Input */}
                                    <div>
                                        <label htmlFor="phone" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-purple-300' : 'text-gray-700'}`}>
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} sm:text-sm`}>+20</span>
                                            </div>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formik.values.phone}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className={`pl-12 w-full rounded-lg border py-3 px-4 shadow-sm focus:outline-none focus:ring-2 ${formik.touched.phone && formik.errors.phone
                                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                                    : `${darkMode ? 'focus:ring-purple-500 focus:border-purple-500 border-purple-300' : 'focus:ring-orange-500 focus:border-orange-500 border-orange-300'}`
                                                    } ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                                                placeholder="10-digit Egyptian number"
                                            />
                                        </div>
                                        {formik.touched.phone && formik.errors.phone && (
                                            <p className="mt-1 text-sm text-red-600">{formik.errors.phone}</p>
                                        )}
                                    </div>

                                    {/* City Select */}
                                    <div>
                                        <label htmlFor="city" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-purple-300' : 'text-gray-700'}`}>
                                            City
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="city"
                                                name="city"
                                                value={formik.values.city}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className={`w-full rounded-lg border py-3 px-4 shadow-sm focus:outline-none focus:ring-2 appearance-none ${formik.touched.city && formik.errors.city
                                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                                    : `${darkMode ? 'focus:ring-purple-500 focus:border-purple-500 border-purple-300' : 'focus:ring-orange-500 focus:border-orange-500 border-orange-300'}`
                                                    } ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                                                placeholder='Enter Your City'
                                            />
                                        </div>
                                        {formik.touched.city && formik.errors.city && (
                                            <p className="mt-1 text-sm text-red-600">{formik.errors.city}</p>
                                        )}
                                    </div>

                                    {/* Address Details */}
                                    <div>
                                        <label htmlFor="details" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-purple-300' : 'text-gray-700'}`}>
                                            Address Details
                                        </label>
                                        <textarea
                                            id="details"
                                            name="details"
                                            rows="4"
                                            value={formik.values.details}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`w-full rounded-lg border py-3 px-4 shadow-sm focus:outline-none focus:ring-2 ${formik.touched.details && formik.errors.details
                                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                                : `${darkMode ? 'focus:ring-purple-500 focus:border-purple-500 border-purple-300' : 'focus:ring-orange-500 focus:border-orange-500 border-orange-300'}`
                                                } ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                                            placeholder="Street name, building number, apartment, etc."
                                        ></textarea>
                                        {formik.touched.details && formik.errors.details && (
                                            <p className="mt-1 text-sm text-red-600">{formik.errors.details}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="mt-8">
                                    <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Payment Method
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('online')}
                                            className={`py-3 px-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${paymentMethod === 'online'
                                                ? `${darkMode ? 'border-purple-600' : 'border-orange-600'} shadow-sm`
                                                : `${darkMode ? 'border-purple-300 hover:border-purple-700' : 'border-orange-300 hover:border-orange-500'} `
                                                } ${darkMode ? paymentMethod === 'online' ? 'bg-gray-700' : 'bg-gray-800' : 'bg-white'}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'online' ? `${darkMode ? 'border-purple-600 bg-purple-600' : 'border-orange-600 bg-orange-600'}` : 'border-gray-400'
                                                    }`}>
                                                    {paymentMethod === 'online' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                                </div>
                                                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Online Payment</span>
                                            </div>
                                            <div className="flex mt-2 gap-2">
                                                <div className={`w-8 h-5 rounded-sm ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
                                                <div className={`w-8 h-5 rounded-sm ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
                                                <div className={`w-8 h-5 rounded-sm ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
                                            </div>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('cash')}
                                            className={`py-3 px-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${paymentMethod === 'cash'
                                                ? `${darkMode ? 'border-purple-600' : 'border-orange-600'} shadow-sm`
                                                : `${darkMode ? 'border-purple-300 hover:border-purple-700' : 'border-orange-300 hover:border-orange-500'} `
                                                } ${darkMode ? paymentMethod === 'cash' ? 'bg-gray-700' : 'bg-gray-800' : 'bg-white'}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cash' ? `${darkMode ? 'border-purple-600 bg-purple-600' : 'border-orange-600 bg-orange-600'}` : 'border-gray-400'
                                                    }`}>
                                                    {paymentMethod === 'cash' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                                </div>
                                                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Cash on Delivery</span>
                                            </div>
                                            <div className="flex mt-2 gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={darkMode ? '#9CA3AF' : '#6B7280'}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="mt-8">
                                    {apiError && (
                                        <div className={`mb-4 py-3 px-4 rounded-lg ${darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-50 text-red-700'}`}>
                                            {apiError}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full py-4 px-6 rounded-xl text-white font-bold shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-500/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center ${loading ? 'opacity-80 cursor-not-allowed' : ''
                                            } ${darkMode ? 'bg-gradient-to-r from-purple-700 to-fuchsia-700 hover:from-purple-800 hover:to-fuchsia-800' : 'bg-gradient-to-r from-[#ff7f00] to-[#ffcc00] hover:from-orange-500 hover:to-yellow-500'}`}
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                {paymentMethod === 'online' ? 'Processing Payment...' : 'Placing Order...'}
                                            </>
                                        ) : (
                                            <>
                                                {paymentMethod === 'online' ? 'Pay Securely' : 'Place Order'}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </>
                                        )}
                                    </button>

                                    <div className={`mt-4 text-center text-sm flex items-center justify-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                        Secure 256-bit SSL encryption
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-5/12">
                        <div className={`rounded-2xl shadow-xl border sticky top-8 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                            <div className={`px-6 py-5 bg-gradient-to-r ${darkMode ? 'from-purple-600 to-fuchsia-600' : 'from-[#ff7f00] to-[#ffcc00]'} `}>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                    </svg>
                                    Order Summary
                                </h2>
                            </div>

                            <div className="p-6">
                                <div className="space-y-4">
                                    {/* Cart Items */}
                                    <div className="max-h-64 overflow-y-auto pr-2 -mr-2">
                                        {cart?.data?.products?.map((item) => (
                                            <div key={item.product._id} className={`flex py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                                <div className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                                    <img
                                                        src={item.product.imageCover}
                                                        alt={item.product.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="ml-4 flex-1">
                                                    <h3 className={`font-medium line-clamp-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                        {item.product.title}
                                                    </h3>
                                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        Qty: {item.count}
                                                    </p>
                                                </div>
                                                <div className="ml-4">
                                                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                        EGP {(item.price * item.count).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Order Totals */}
                                    <div className="space-y-3 pt-4">
                                        <div className="flex justify-between">
                                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
                                            <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                EGP {cart?.data?.totalCartPrice?.toFixed(2) || '0.00'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
                                            <span className="font-medium text-green-600">Free</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Tax</span>
                                            <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                EGP {(cart?.data?.totalCartPrice * 0.14).toFixed(2) || '0.00'}
                                            </span>
                                        </div>
                                        <div className={`flex justify-between pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                            <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Total</span>
                                            <span className={`text-lg font-bold ${darkMode ? 'text-purple-600' : 'text-orange-500'} `}>
                                                EGP {cart?.data?.totalCartPrice ? (cart?.data?.totalCartPrice * 1.14).toFixed(2) : '0.00'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Security Badges */}
                                    <div className="pt-6">
                                        <div className={`flex justify-between items-center rounded-lg p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Guaranteed safe checkout</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className={`w-8 h-5 rounded-sm ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
                                                <div className={`w-8 h-5 rounded-sm ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
                                                <div className={`w-8 h-5 rounded-sm ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;