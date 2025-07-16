import React, { useContext } from 'react';
import Lottie from 'lottie-react';
import { NavLink } from 'react-router-dom';
import NotFoundAnimation from '../../ErrorpageAnimation.json';
import { motion } from 'framer-motion';
import { DarkModeContext } from '../../Context/DarkModeContext';


export default function NotFound() {

  let { darkMode } = useContext(DarkModeContext);
  return <>
    <div className="container mx-auto px-4 lg:px-20 py-12 flex-1 flex flex-col justify-center z-10">
      {/* Logo */}
      <div className="mb-12 lg:mb-20">
        <NavLink to="/" className="flex items-center space-x-2 group">
          <motion.div
            whileHover={{ rotate: 50 }}
            className={`bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00] group-hover:shadow-orange-500' : 'from-purple-600 to-fuchsia-600 group-hover:shadow-purple-500'} rounded-xl p-1.5 shadow-lg   transition-shadow`}
          >
            <div className="bg-white w-10 h-10 rounded-lg flex items-center justify-center shadow-inner">
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`bg-clip-text text-transparent bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'} font-bold text-xl`}
              >
                EM
              </motion.span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'} tracking-tight`}
          >
            EliteMart
          </motion.h1>
        </NavLink>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Content */}
        <div className="max-w-2xl text-center lg:text-left">
          <div className={`inline-block px-4 py-2 mb-6 ${!darkMode ? 'bg-orange-100' : 'bg-purple-100'}  rounded-full`}>
            <span className={`text-sm font-semibold ${!darkMode ? 'text-[#FF7000]' : 'text-purple-700'}`}>Error 404</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            <span className={`block text-transparent bg-clip-text bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#FF7000]' : 'from-purple-600 to-fuchsia-600'}`}>
              Lost in the Void?
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            The cosmic page you're seeking has drifted into the digital abyss.
            Perhaps it's exploring new dimensions or simply taking a cosmic nap.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <NavLink
              to="/"
              className={`px-8 py-4 bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#FF7000]' : 'from-purple-600 to-fuchsia-600'} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Beam Me Home
            </NavLink>

            <button className={`px-8 py-4 bg-white border-2 ${!darkMode ? 'text-[#ff7f00] border-orange-200 hover:border-orange-400' : 'text-purple-600 border-purple-200 hover:border-purple-400'} font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
              Contact Support
            </button>
          </div>
        </div>

        {/* Animation */}
        <div className="relative w-full max-w-xl">
          <div className="relative z-10">
            <Lottie
              animationData={NotFoundAnimation}
              className="w-full h-auto drop-shadow-2xl"
              loop={true}
            />
          </div>
        </div>
      </div>
    </div>
  </>

}