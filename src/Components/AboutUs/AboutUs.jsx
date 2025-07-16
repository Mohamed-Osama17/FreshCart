import React, { useContext } from 'react';
import { DarkModeContext } from '../../Context/DarkModeContext';
import { Link } from 'react-router-dom';

export default function AboutUs() {
    const { darkMode } = useContext(DarkModeContext);
    return (
        <section className="py-20 bg-gradient-to-br relative overflow-hidden">

            <div className="container mx-auto px-4 lg:px-20 relative z-10">
                <div className="text-center mb-16">
                    <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'} `}>
                        Why Choose Us
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We're revolutionizing the way you shop for groceries with innovation and care
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
                        <div className="relative">
                            <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-2xl bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'}  flex items-center justify-center shadow-lg group-hover:animate-pulse`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="pt-28 pb-8 px-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-3">10 Minute Grocery Now</h3>
                                <p className="text-sm text-gray-600 mb-6">
                                    Get your order delivered to your doorstep at the earliest from our pickup stores near you.
                                </p>
                                <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
                                    <div className={`absolute top-0 left-0 h-full w-0 bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'} group-hover:w-full transition-all duration-1000`}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
                        <div className="relative">
                            <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-2xl bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'}  flex items-center justify-center shadow-lg group-hover:animate-pulse`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <div className="pt-28 pb-8 px-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-3">Best Prices & Offers</h3>
                                <p className="text-sm text-gray-600 mb-6">
                                    Cheaper than local supermarkets with great cashback offers. We guarantee the best prices.
                                </p>
                                <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
                                    <div className={`absolute top-0 left-0 h-full w-0 bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'} group-hover:w-full transition-all duration-1000`}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
                        <div className="relative">
                            <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-2xl bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'}  flex items-center justify-center shadow-lg group-hover:animate-pulse`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="pt-28 pb-8 px-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-3">Wide Assortment</h3>
                                <p className="text-sm text-gray-600 mb-6">
                                    Choose from 5000+ products across food, personal care, household, bakery, and more.
                                </p>
                                <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
                                    <div className={`absolute top-0 left-0 h-full w-0 bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'} group-hover:w-full transition-all duration-1000`}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
                        <div className="relative">
                            <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-2xl bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'}  flex items-center justify-center shadow-lg group-hover:animate-pulse`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="pt-28 pb-8 px-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-3">Easy Returns</h3>
                                <p className="text-sm text-gray-600 mb-6">
                                    Return products at your doorstep & get refunds within hours. Our no-questions-asked <span className={`${!darkMode ? 'text-orange-600' : 'text-purple-600'}  font-medium`}>policy</span>.
                                </p>
                                <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
                                    <div className={`absolute top-0 left-0 h-full w-0 bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'} group-hover:w-full transition-all duration-1000`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Animated CTA */}
                <div className="mt-16 text-center">
                    <button className={`px-8 py-4 bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'}  text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group`}>
                        <Link to={'/products'} className="relative z-10">Start Shopping Now</Link>
                        <div className={`absolute inset-0 bg-gradient-to-r ${!darkMode ? 'from-orange-600 to-yellow-600' : 'from-purple-800 to-fuchsia-800'}  opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-white opacity-20 group-hover:animate-shine"></div>
                    </button>
                </div>
            </div>
        </section>
    );
}