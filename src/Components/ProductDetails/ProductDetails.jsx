import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import Lottie from 'lottie-react';
import { CartContext } from '../../Context/CartContext';
import CartLoader from '../../CartLoader.json';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import { motion } from 'framer-motion';
import { DarkModeContext } from '../../Context/DarkModeContext';

export default function ProductDetails() {
    const { addProductToCart } = useContext(CartContext);
    const { darkMode } = useContext(DarkModeContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const slider1 = useRef(null);
    const slider2 = useRef(null);

    const { id } = useParams();

    useEffect(() => {
        const fetchSpecificProduct = async () => {
            try {
                const { data } = await axios.get(
                    `https://ecommerce.routemisr.com/api/v1/products/${id}`
                );
                setProduct(data.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSpecificProduct();
    }, [id]);

    useEffect(() => {
        if (!loading) {
            setNav1(slider1.current);
            setNav2(slider2.current);
        }
    }, [loading]);

    const handleAddToCart = () => {
        addProductToCart(product.id, quantity);
        // Animation effect
        const btn = document.getElementById('add-to-cart-btn');
        if (btn) {
            btn.classList.add('animate-pulse');
            setTimeout(() => {
                btn.classList.remove('animate-pulse');
            }, 500);
        }
    };

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-fuchsia-50 py-12">
                <div className="w-64 h-64">
                    <Lottie animationData={CartLoader} loop={true} />
                </div>
                <p className="text-gray-700 text-xl font-medium mt-4">Loading your product...</p>
                <p className="text-gray-500 mt-2">Preparing your shopping experience</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${!darkMode ? 'from-orange-50 to-amber-50' : 'from-indigo-50 to-purple-50'} `}>
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
                    <div className="text-6xl mb-4">😢</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
                    <p className="text-gray-600 mb-6">We couldn't find the product you're looking for.</p>
                    <button
                        className={`bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00] hover:from-orange-700 hover:to-amber-700' : 'from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-indigo-700'}  text-white py-3 px-6 rounded-full font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg`}
                        onClick={() => window.history.back()}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const thumbnailSettings = {
        slidesToShow: 4,
        swipeToSlide: true,
        focusOnSelect: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3
                }
            }
        ]
    };

    return (
        <div className={`bg-gradient-to-br ${!darkMode ? 'from-orange-50 to-yellow-50' : 'from-purple-50 to-fuchsia-50'}  min-h-screen`}>
            {/* Floating background elements */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full ${!darkMode ? 'bg-orange-100' : 'bg-purple-100'}  blur-3xl opacity-30`}></div>
                <div className={`absolute top-2/3 right-1/3 w-48 h-48 rounded-full ${!darkMode ? 'bg-yellow-100' : 'bg-fuchsia-100'}  blur-3xl opacity-30`}></div>
            </div>

            <div className="container mx-auto px-4 lg:px-20 py-12 relative z-10">
                {/* Breadcrumbs */}
                <div className="mb-8 text-sm text-gray-600">
                    <Link to={'/'} className={`${!darkMode ? 'hover:text-orange-600' : 'hover:text-purple-600'} cursor-pointer`}>Home</Link> /
                    <Link to={'/products'} className={`${!darkMode ? 'hover:text-orange-600' : 'hover:text-purple-600'} cursor-pointer`}> Products</Link> /
                    <span className={`${!darkMode ? 'hover:text-orange-600' : 'hover:text-purple-600'} cursor-pointer`}> {product.category.name}</span> /
                    <span className="font-medium text-gray-900"> {product.title}</span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden"
                >
                    <div className="flex flex-col lg:flex-row">
                        {/* Product Images */}
                        <div className="lg:w-1/2 p-6 md:p-8">
                            <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-square">
                                <Slider
                                    asNavFor={nav2}
                                    ref={slider => (slider1.current = slider)}
                                    className="h-full"
                                >
                                    {product?.images?.map((image, index) => (
                                        <div key={index} className="h-full flex items-center justify-center">
                                            <img
                                                src={image}
                                                className="object-contain w-full h-full"
                                                alt={`${product.title} ${index + 1}`}
                                            />
                                        </div>
                                    ))}
                                </Slider>

                                {/* Discount badge */}
                                {product.priceAfterDiscount && (
                                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#ff7f00] to-[#ffcc00] text-white font-bold py-1 px-3 rounded-full text-sm shadow-lg">
                                        {Math.round(100 - (product.priceAfterDiscount / product.price * 100))}% OFF
                                    </div>
                                )}
                            </div>

                            <div className="mt-6">
                                <Slider
                                    {...thumbnailSettings}
                                    asNavFor={nav1}
                                    ref={slider => (slider2.current = slider)}
                                >
                                    {product?.images?.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`px-1 transition-all duration-200 ${selectedImage === index ? 'scale-105' : ''}`}
                                            onClick={() => setSelectedImage(index)}
                                        >
                                            <div className={`rounded-xl overflow-hidden border-2 ${selectedImage === index ? `${!darkMode ? 'border-orange-600' : 'border-purple-600'}` : 'border-transparent'}`}>
                                                <img
                                                    src={image}
                                                    className="object-cover w-full h-20 cursor-pointer"
                                                    alt={`${product.title} thumbnail ${index + 1}`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="lg:w-1/2 p-6 md:p-8 border-l border-gray-100">
                            <div className="flex flex-col h-full">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                                {product.title}
                                            </h1>
                                            <div className="flex items-center mb-4">
                                                <div className="flex mr-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className={`w-5 h-5 ${i < Math.floor(product.ratingsAverage) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <span className="text-gray-600">
                                                    {product.ratingsAverage.toFixed(1)} ({product.ratingsQuantity} reviews)
                                                </span>
                                            </div>
                                        </div>

                                        <div className="bg-gray-100 rounded-lg px-3 py-1 flex">
                                            <span className="text-gray-700 font-medium">SKU: </span>
                                            <span className={`${!darkMode ? 'text-orange-500' : 'text-purple-600'}  font-bold ms-1`}>{product.id.slice(0, 8)}</span>
                                        </div>
                                    </div>

                                    <div className="my-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {product.description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-500 mb-1">Category</h4>
                                            <p className={`font-semibold ${!darkMode ? 'text-orange-500' : 'text-purple-600'} `}>{product.category.name}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-500 mb-1">Brand</h4>
                                            <p className={`font-semibold ${!darkMode ? 'text-orange-500' : 'text-purple-600'} `}>{product.brand?.name || 'No Brand'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            {product.priceAfterDiscount ? (
                                                <div className="flex items-center">
                                                    <span className={`text-3xl font-bold ${!darkMode ? 'text-orange-500' : 'text-purple-600'} `}>
                                                        EGP {product.priceAfterDiscount.toFixed(2)}
                                                    </span>
                                                    <span className="line-through text-gray-400 ml-3">
                                                        EGP {product.price.toFixed(2)}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className={`text-3xl font-bold ${!darkMode ? 'text-orange-500' : 'text-purple-600'} `}>
                                                    EGP {product.price.toFixed(2)}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center">
                                            <span className="text-gray-700 mr-3">Quantity:</span>
                                            <div className="flex items-center border border-gray-300 rounded-lg">
                                                <button
                                                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                                                    onClick={decreaseQuantity}
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                                    </svg>
                                                </button>
                                                <span className="w-12 text-center font-medium">{quantity}</span>
                                                <button
                                                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                                                    onClick={increaseQuantity}
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            id="add-to-cart-btn"
                                            onClick={handleAddToCart}
                                            className={`flex-1 bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00] hover:from-orange-500 hover:to-yellow-500' : 'from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700'}  text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl`}
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                            </svg>
                                            Add to Cart
                                        </button>

                                        <button className={`flex-1 bg-white border-2 ${!darkMode ? 'border-orange-500 text-orange-500 hover:bg-orange-50' : 'border-purple-600 text-purple-600 hover:bg-purple-50'}  py-4 px-6 rounded-xl font-medium transition-colors duration-300 flex items-center justify-center shadow-md`}>
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                            </svg>
                                            Wishlist
                                        </button>
                                    </div>

                                    <div className="mt-6 flex items-center justify-center text-gray-500">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <span>Free shipping worldwide</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Product Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className={`${!darkMode ? 'text-orange-500' : 'text-purple-600'} mb-4`}>
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
                        <p className="text-gray-600">All transactions are encrypted and secure</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className={`${!darkMode ? 'text-orange-500' : 'text-purple-600'} mb-4`}>
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">30-Day Returns</h3>
                        <p className="text-gray-600">Not satisfied? Return within 30 days</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className={`${!darkMode ? 'text-orange-500' : 'text-purple-600'} mb-4`}>
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                        <p className="text-gray-600">Our team is always here to help you</p>
                    </div>
                </div>

                {/* Related Products */}
                <div className="my-16">
                    <h2 className="text-3xl font-bold text-center mb-12 relative">
                        <span className={`relative z-10 px-4 bg-gradient-to-br ${!darkMode ? 'from-orange-50 to-yellow-50' : 'from-purple-50 to-fuchsia-50'} `}>You May Also Like</span>
                        <div className={`absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r ${!darkMode ? 'from-transparent via-orange-300 to-transparent' :'from-transparent via-purple-300 to-transparent z-0'}`}></div>
                    </h2>
                    <RelatedProducts categoryId={product.category._id} currentProductId={product.id} />
                </div>
            </div>
        </div>
    );
}