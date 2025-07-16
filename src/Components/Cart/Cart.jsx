import React, { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { UserContext } from '../../Context/UserContext';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import CartLoader from '../../CartLoader.json';
import { motion } from 'framer-motion';

export default function NewCart() {
  const { cart, updateProductCountToCart, removeProductFromCart } = useContext(CartContext);
  const { userName } = useContext(UserContext);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-12">
      {cart ? (
        <>
          {/* Floating Cart Header */}
          <div className="bg-gradient-to-br from-indigo-900 to-purple-800 rounded-3xl p-6 mb-8 shadow-2xl border border-indigo-400/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-amber-400/20 to-pink-500/20 rounded-full transform translate-x-12 -translate-y-12"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold text-white">
                  <span className="text-amber-300 capitalize">
                    {`${userName?.split(' ', 1)}'s`}
                  </span>{' '}
                  Shopping Cart
                </h1>
                <p className="text-indigo-200 mt-1">
                  {cart?.numOfCartItems} {cart?.numOfCartItems === 1 ? 'item' : 'items'}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-indigo-300/30">
                <div className="flex items-center justify-between gap-8">
                  <div>
                    <p className="text-indigo-200">Total Amount</p>
                    <p className="text-2xl font-bold text-amber-300">
                      EGP {cart?.data?.totalCartPrice}
                    </p>
                  </div>
                  <Link
                    to="/checkout"
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95"
                  >
                    Secure Checkout →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Product Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cart?.data?.products.map((item, index) => (
              <motion.div
                key={item.product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl border border-indigo-100 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex gap-5">
                    <div className="bg-gray-100 border-2 border-dashed border-gray-200 rounded-xl w-24 h-24 overflow-hidden flex items-center justify-center">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-gray-800 line-clamp-2">
                          {item.product.title}
                        </h3>
                        <button
                          onClick={() => removeProductFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          aria-label="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <span className="text-lg font-bold text-purple-700">
                          EGP {item.price}
                        </span>

                        <div className="flex items-center bg-gray-100 rounded-full px-2">
                          <button
                            onClick={() =>
                              item.count > 1
                                ? updateProductCountToCart(item.product.id, item.count - 1)
                                : removeProductFromCart(item.product.id)
                            }
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-200 rounded-l-full transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>

                          <span className="w-8 text-center font-medium">
                            {item.count}
                          </span>

                          <button
                            onClick={() => updateProductCountToCart(item.product.id, item.count + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-200 rounded-r-full transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Subtotal
                    </div>
                    <div className="text-xl font-bold text-purple-800">
                      EGP {(item.price * item.count).toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-t border-indigo-100 px-5 py-3 flex justify-end">
                  <div className="flex gap-2">
                    <button
                      className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                      onClick={() => updateProductCountToCart(item.product.id, item.count - 1)}
                    >
                      Move to Wishlist
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Floating Summary Card */}
          <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl border border-indigo-100 p-6 mt-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="text-indigo-900">
                <p className="text-lg">Enjoy free shipping on orders over EGP 500</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-2.5 rounded-full"
                    style={{ width: `${Math.min(100, (cart?.data?.totalCartPrice / 500) * 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-1">
                  {cart?.data?.totalCartPrice < 500
                    ? `Add EGP ${(500 - cart?.data?.totalCartPrice).toFixed(2)} more for free shipping`
                    : 'Congratulations! You get free shipping'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="text-xl font-bold text-purple-800">
                    EGP {cart?.data?.totalCartPrice}
                  </p>
                </div>

                <Link
                  to="/checkout"
                  className="bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  Checkout Now
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-64 h-64">
            <Lottie animationData={CartLoader} loop={true} />
          </div>
          <p className="text-gray-600 mt-4 text-xl font-medium">Loading your cart...</p>
          <p className="text-gray-500 mt-2">Preparing your shopping experience</p>
        </div>
      )}
    </div>
  );
}