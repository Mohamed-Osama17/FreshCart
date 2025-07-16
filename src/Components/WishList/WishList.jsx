import React, { useContext } from 'react';
import { WishListContext } from '../../Context/WishListContext';
import { NavLink } from 'react-router-dom';
import { DarkModeContext } from '../../Context/DarkModeContext';
import { CartContext } from '../../Context/CartContext';

export default function WishList() {
    const { wishList, removeProductFromWishList } = useContext(WishListContext);
    const { addProductToCart } = useContext(CartContext);
    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className="min-h-screen bg-gradient-to-br py-12 px-4">
            {/* Header Section */}
            <div className="text-center mb-12 px-4">
                <div className="inline-block relative">
                    <h1 className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'} mb-3`}>
                        Your Wishlist Treasures
                    </h1>
                    <div className={`absolute -bottom-2 left-1/4 right-1/4 h-1 bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-500 to-fuchsia-500'} rounded-full`}></div>
                </div>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                    Your curated collection of favorite items. Ready to become yours anytime!
                </p>
                <div className={`mt-4 animate-bounce ${!darkMode ? 'text-orange-500' : 'text-purple-500'}`}>
                    <i className="fa-solid fa-heart text-3xl"></i>
                </div>
            </div>

            {/* Empty State */}
            {wishList.length === 0 && (
                <div className="max-w-md mx-auto text-center py-12">
                    <div className={`bg-white/80 backdrop-blur-sm rounded-full w-48 h-48 mx-auto flex items-center justify-center mb-6 border-4 border-dashed ${!darkMode ? 'border-orange-200' : 'border-purple-200'}`}>
                        <i className={`fa-regular fa-heart text-6xl ${!darkMode ? 'text-orange-300' : 'text-purple-300'}`}></i>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">Your Wishlist is Empty</h3>
                    <p className="text-gray-500 mb-6">
                        Start adding items you love to see them appear here!
                    </p>
                    <NavLink to={'/products'}
                        className={`px-6 py-3 bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-500'} text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                    >
                        Explore Products
                    </NavLink>
                </div>
            )}

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 lg:px-20 max-w-7xl mx-auto">
                {wishList.map((product) => (
                    <div
                        key={product.id}
                        className={`group relative bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border ${!darkMode ? 'border-orange-100 hover:border-orange-400' : 'border-purple-100 hover:border-purple-400'} `}
                    >
                        {/* Remove Button */}
                        <button
                            onClick={() => removeProductFromWishList(product.id)}
                            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-red-500 shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:scale-110"
                            aria-label="Remove from wishlist"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>

                        {/* Product Image */}
                        <div className="overflow-hidden relative">
                            <img
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                src={product.imageCover}
                                alt={product.title}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>

                        {/* Product Info */}
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <span className={`inline-block px-3 py-1 text-xs font-semibold ${!darkMode ? 'text-orange-500 bg-orange-200' : 'text-purple-700 bg-purple-100'} rounded-full mb-2 `}>
                                        {product.category.name}
                                    </span>
                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                                        {product.title.split(' ', 2).join(' ')}
                                    </h3>
                                </div>
                                <div className="flex items-center bg-orange-100 px-2 py-1 rounded-full">
                                    <i className="fa-solid fa-star text-orange-500 text-xs mr-1"></i>
                                    <span className="text-xs font-bold text-orange-500">5.0</span>
                                </div>
                            </div>

                            {/* Price & Action */}
                            <div className="flex justify-between items-center mt-2">
                                <div>
                                    <span className={`text-lg font-bold ${!darkMode ? 'text-orange-500' : 'text-purple-600'}`}>EGP {product.price}</span>
                                </div>
                                <div onClick={()=> addProductToCart(product.id)} className="flex space-x-3">
                                    <button className={`w-9 h-9 rounded-full flex items-center justify-center ${!darkMode ? 'bg-orange-100 text-orange-500 hover:bg-orange-200' : 'bg-purple-100 text-purple-600 hover:bg-purple-200'} transition-colors`}>
                                        <i className="fa-solid fa-cart-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Floating Heart */}
                        <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-red-500 shadow-md">
                            <i className="fa-solid fa-heart"></i>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}