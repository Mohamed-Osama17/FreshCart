import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import CartLoader from '../../CartLoader.json';
import { DarkModeContext } from '../../Context/DarkModeContext';
import { BrandsContext } from '../../Context/BrandsContext';

export default function Brands() {
  let { brands, loading } = useContext(BrandsContext);
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className="min-h-screen bg-gradient-to-br py-12 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Animated Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full animate-pulse"></div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 relative z-10">
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'}`}>
              Our Brands
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover premium partners who share our passion for quality and innovation
          </p>
          <div className="mt-6 flex justify-center">
            <div className={`w-36 h-1 bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-500 to-fuchsia-500'} rounded-full`}></div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="w-64 h-64 relative">
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-full animate-pulse"></div>
              <Lottie
                animationData={CartLoader}
                className="w-full h-full"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {brands?.map((brand) => (
              <div
                key={brand._id}
                className="relative group perspective-1000"
              >
                {/* Card with glassmorphism effect */}
                <div className="h-full flex flex-col bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-white/30 transition-all duration-500 group-hover:shadow-xl group-hover:scale-[1.03]">
                  <div className="relative aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 to-pink-100/30 z-10"></div>
                    <img
                      loading="lazy"
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                      src={brand.image}
                      alt={brand.name}
                    />
                  </div>

                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-semibold text-gray-600 text-center mb-2">{brand.name}</h3>

                    {/* Animated show button */}
                    <div className="mt-auto">
                      <Link
                        to={`branddetails/${brand._id}`}
                        className={`block w-full py-2 px-4 text-center font-medium rounded-full bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00] focus:ring-orange-300' : 'from-purple-600 to-fuchsia-500 focus:ring-purple-300'} text-white shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 focus:outline-none focus:ring-2`}
                      >
                        Explore
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Floating decorative elements */}
                <div className={`absolute -top-3 -right-3 w-6 h-6 ${!darkMode ? 'bg-[#ff7f00]' : 'bg-purple-600'} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className={`absolute -bottom-3 -left-3 w-4 h-4 ${!darkMode ? 'bg-[#ffcc00]' : 'bg-fuchsia-500 '} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Decorative floating elements */}
      <div className="fixed top-1/4 left-5 w-8 h-8 bg-purple-300/30 rounded-full blur-xl animate-float"></div>
      <div className="fixed top-1/3 right-10 w-12 h-12 bg-pink-300/20 rounded-full blur-xl animate-float animation-delay-2000"></div>
      <div className="fixed bottom-1/4 left-1/4 w-6 h-6 bg-purple-400/30 rounded-full blur-xl animate-float animation-delay-1000"></div>
    </div>
  );
}