import React, { useContext } from 'react';
import { CategoriesContext } from '../../Context/CategoriesContext';
import Lottie from 'lottie-react';
import CartLoader from '../../CartLoader.json';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DarkModeContext } from '../../Context/DarkModeContext';

export default function Categories() {
  const { categories, loading } = useContext(CategoriesContext);
  const { darkMode } = useContext(DarkModeContext);

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      y: -15,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    hover: { opacity: 1 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-20 py-12">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-64 h-64">
            <Lottie animationData={CartLoader} loop={true} />
          </div>
        </div>
      ) : (
        <>
          <div className="text-center mb-12">
            <motion.h1
              className={`text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Discover Our Collections
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Explore our curated categories to find exactly what you're looking for
            </motion.p>
            <div className="mt-6 flex justify-center">
              <div className={`w-36 h-1 bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-500 to-fuchsia-500'} rounded-full`}></div>
            </div>
          </div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories?.map((category, index) => (
              <motion.div
                key={category._id}
                className="relative group"
                variants={cardVariants}
                whileHover="hover"
              >
                {/* Card stack effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${!darkMode ? 'from-orange-100 to-yellow-100' : 'from-purple-100 to-pink-100'} rounded-2xl shadow-lg transform rotate-[-2deg] translate-x-1 translate-y-1 -z-10 group-hover:rotate-[-4deg] group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-300 `}></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${!darkMode ? 'from-orange-200 to-yellow-200' : 'from-purple-200 to-pink-200'} rounded-2xl shadow-md transform rotate-[-1deg] translate-x-0.5 translate-y-0.5 -z-10 group-hover:rotate-[-2deg] group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-300`}></div>

                {/* Main card */}
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${!darkMode ? 'from-orange-500/50 to-yellow-500/50' : 'from-purple-500/20 to-pink-500/20'} z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                    <img
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={category.image}
                      alt={category.name}
                    />

                    <div className="absolute bottom-3 left-3 z-20">
                      <h3 className="text-xl font-bold text-white drop-shadow-md">{category.name}</h3>
                    </div>
                  </div>

                  <div className="p-4 flex-grow flex flex-col">
                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      Explore our curated collection of {category.name.toLowerCase()} items
                    </p>

                    <motion.div
                      className="mt-auto"
                      variants={overlayVariants}
                    >
                      <Link
                        to={`/relatedproducts/${category.name}`}
                        className={`inline-block w-full py-2 px-4 text-white font-medium text-center rounded-lg bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00] hover:from-orange-600 hover:to-yellow-500' : 'from-purple-600 to-fuchsia-500  hover:from-purple-700 hover:to-fuchsia-600'} transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
                      >
                        Shop Collection
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -z-10">
            <div className={`w-64 h-64 rounded-full filter blur-3xl opacity-20 ${!darkMode ? 'bg-orange-300' : 'bg-purple-300'}`}></div>
          </div>
          <div className="absolute bottom-20 left-0 -z-10">
            <div className={`w-80 h-80 rounded-full filter blur-3xl opacity-20 ${!darkMode ? 'bg-yellow-300' : 'dark:bg-pink-300'}`}></div>
          </div>
        </>
      )
      }
    </div >
  );
}