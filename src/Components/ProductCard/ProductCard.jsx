import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../Context/DarkModeContext';

export default function ProductCard({ product, isFavorite, onAddToCart, onToggleFavorite }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const { darkMode } = useContext(DarkModeContext);

    const handleAddToCart = () => {
        setIsAdded(true);
        onAddToCart(product.id);

        // Reset animation after completion
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div
            className="relative group perspective-1000"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Floating card effect */}
            <div
                className={`relative z-10 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-100 shadow-xl overflow-hidden transition-all duration-500 ${isHovered ? 'shadow-2xl -translate-y-2 rotate-[1deg]' : 'shadow-md'
                    }`}
                style={{
                    transformStyle: 'preserve-3d',
                    transform: isHovered ? 'rotateY(5deg) rotateX(5deg)' : 'none',
                    boxShadow: isHovered ? '0 25px 50px -12px rgba(0, 0, 0, 0.15)' : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                }}
            >
                {/* Glow effect */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className={`absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r ${!darkMode ? 'from-orange-400 to-yellow-500' : 'from-purple-400 to-fuchsia-500'} rounded-full filter blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity duration-700`}></div>
                </div>

                <div className="p-5 relative z-20">
                    {/* Favorite button with floating effect */}
                    <div
                        className={`absolute top-5 right-5 z-30 transition-all duration-300 ${isHovered ? 'animate-bounce' : ''
                            }`}
                    >
                        <button
                            onClick={onToggleFavorite}
                            className={`w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md shadow-lg transition-all ${isFavorite
                                ? 'bg-gradient-to-r from-rose-400 to-red-500 text-white shadow-red-200'
                                : 'bg-white/80 text-gray-400 hover:text-rose-400 hover:bg-white'
                                }`}
                            aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
                        >
                            <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart text-lg`} />
                        </button>
                    </div>

                    {/* Product image with parallax effect */}
                    <Link to={`/productdetalis/${product.id}/${product.category.name}`}>
                        <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200">
                            <div className="relative w-full h-full">
                                <img
                                    src={product.imageCover}
                                    alt={product.title}
                                    className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110' : 'scale-100'
                                        }`}
                                />

                                {/* Subtle gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>

                            {/* Quick view hint */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-sm font-medium rounded-full shadow-lg">
                                    Quick View
                                </span>
                            </div>
                            <div className="absolute inset-0 z-10 flex items-end justify-center p-4 transition-opacity duration-500" style={{ opacity: isHovered ? 1 : 0 }}>
                                <span className={`rounded-full bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-fuchsia-500 to-purple-500'} px-4 py-1.5 text-xs font-semibold text-white shadow-md`}>
                                    {product.category.name}
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Product info */}
                    <div className="mt-4">
                        <Link to={`/productdetalis/${product.id}/${product.category.name}`}>
                            {/* <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-600 text-xs font-medium rounded-full mb-2 border border-indigo-100">
                                {product.category.name}
                            </span> */}

                            <div className='flex justify-between items-center mt-1'>
                                <h3 className="font-bold text-gray-800 text-lg line-clamp-1 ">
                                    {product.title.split(' ').slice(0, 3).join(' ')}
                                </h3>
                                <div className="flex items-center bg-gradient-to-r from-[#ffcc00] to-[#ff7f00]  text-white px-2 py-1 rounded-full text-sm font-medium">
                                    <i className="fas fa-star mr-1 text-xs" />
                                    <span>{product.ratingsAverage}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-3">
                                <div>
                                    <span className={`text-xl font-bold bg-gradient-to-r ${!darkMode ? 'from-gray-700 to-gray-800' : 'from-fuchsia-600 to-purple-600'} bg-clip-text text-transparent`}>
                                        EGP {product.price}
                                    </span>
                                    {product.priceAfterDiscount && (
                                        <span className="ml-2 text-sm text-gray-400 line-through">
                                            EGP {product.priceAfterDiscount}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>

                        {/* Add to cart with unique animation */}
                        <div className="relative mt-5 overflow-hidden rounded-xl">
                            <button
                                onClick={handleAddToCart}
                                className={`w-full flex items-center justify-center py-3.5 px-6 font-medium rounded-xl transition-all duration-500 ${isAdded
                                    ? 'bg-emerald-500 text-white'
                                    : `bg-gradient-to-r text-white ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00] hover:from-orange-600 hover:to-yellow-600' : 'from-fuchsia-500 to-purple-600  hover:from-fuchsia-600 hover:to-purple-600'} `
                                    }`}
                            >
                                {isAdded ? (
                                    <>
                                        <i className="fas fa-check mr-2 animate-pulse"></i>
                                        Added to Cart!
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-cart-plus mr-2"></i>
                                        Add To Cart
                                    </>
                                )}
                            </button>

                            {/* Particle animation effect */}
                            {isAdded && (
                                <>
                                    {[...Array(12)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute w-2 h-2 rounded-full bg-white"
                                            style={{
                                                top: '50%',
                                                left: '50%',
                                                transform: `translate(${Math.cos(i * 0.52) * 60}px, ${Math.sin(i * 0.52) * 60}px) scale(0)`,
                                                animation: `particle 0.8s ease-out forwards`,
                                                opacity: 0,
                                            }}
                                        ></div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating shadow for depth */}
            <div className={`absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-300 rounded-2xl transition-all duration-500 ${isHovered ? 'scale-95 -rotate-3 opacity-80' : 'scale-100 opacity-70 -z-10'
                }`}></div>

            {/* Style tag for particle animation */}
            <style jsx>{`
        @keyframes particle {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 100}px) scale(1);
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
}