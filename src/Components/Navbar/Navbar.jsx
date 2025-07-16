import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';
import { FiMenu, FiX, FiShoppingCart, FiHeart, FiLogOut, FiUser, FiSettings } from 'react-icons/fi';
import { FaFacebook, FaYoutube, FaTwitter, FaInstagram, FaTiktok, FaLinkedin, FaTelegram, FaSun, FaMoon } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdArrowDropdown } from 'react-icons/io';
import { DarkModeContext } from '../../Context/DarkModeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { userToken, setUserToken, userName } = useContext(UserContext);
  let { darkMode, toggleTheme } = useContext(DarkModeContext);
  const { wishList } = useContext(WishListContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef();


  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ProfileDropDown effect
  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setProfileDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const logOut = () => {
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: 'products', label: 'Products' },
    { path: 'categories', label: 'Categories' },
    { path: 'brands', label: 'Brands' },
  ];

  const socialIcons = [
    { icon: <FaFacebook className="hover:text-[#1877F2]" />, key: 'facebook' },
    { icon: <FaYoutube className="hover:text-[#FF0000]" />, key: 'youtube' },
    { icon: <FaTwitter className="hover:text-[#1DA1F2]" />, key: 'twitter' },
    { icon: <FaInstagram className="hover:text-[#E1306C]" />, key: 'instagram' },
    { icon: <FaTiktok className="hover:text-[#000000]" />, key: 'tiktok' },
    { icon: <FaLinkedin className="hover:text-[#0A66C2]" />, key: 'linkedin' },
    { icon: <FaTelegram className="hover:text-[#0088CC]" />, key: 'telegram' },
  ];

  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled
      ? `${darkMode ? 'bg-purple-950/90' : 'bg-white/90'} backdrop-blur-md shadow-2xl py-0`
      : `${darkMode ? 'bg-purple-950' : 'bg-white'} py-1 shadow-lg`
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo with animated gradient */}
          <NavLink to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 50 }}
              className={`${!darkMode ? 'from-[#ff7f00] to-[#ffcc00] group-hover:shadow-orange-500' : 'from-purple-600 to-fuchsia-600 group-hover:shadow-purple-500'} bg-gradient-to-r   rounded-xl p-1.5 shadow-lg   transition-shadow`}
            >
              <div className="bg-white w-9 h-9 rounded-lg flex items-center justify-center shadow-inner">
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`${!darkMode ? 'from-[#ff7f00] to-[#ffcc00] ' : 'from-purple-600 to-fuchsia-600'} bg-clip-text text-transparent bg-gradient-to-r font-bold text-lg`}
                >
                  EM
                </motion.span>
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'} text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r tracking-tight`}
            >
              EliteMart
            </motion.h1>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {userToken && navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `font-medium relative px-1 py-2  ${!darkMode ? 'text-gray-500 hover:text-orange-500' : 'text-gray-300 hover:text-purple-500/90'} transition-colors ${isActive
                    ? `${!darkMode ? 'text-orange-500' : 'text-purple-500/90 '} font-semibold`
                    : ''
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.div
                        className={`${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'} absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r rounded-full`}
                        layoutId="navIndicator"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {userToken ? (
              <>
                <div className={`flex space-x-3 ${!darkMode ? 'text-gray-500' : 'text-gray-300'} `}>
                  {socialIcons.map((item) => (
                    <motion.a
                      key={item.key}
                      href="#"
                      whileHover={{ y: -3 }}
                      className="text-lg transition-colors"
                    >
                      {item.icon}
                    </motion.a>
                  ))}
                </div>

                <NavLink to="wishlist" className="relative p-2 group">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <FiHeart className={`${!darkMode ? 'text-gray-600 group-hover:text-red-500' : 'text-gray-300 group-hover:text-purple-400 '} w-6 h-6 transition-colors`} />
                  </motion.div>
                  {wishList?.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`absolute top-0 right-0 bg-gradient-to-br ${!darkMode ? 'from-red-600 to-rose-600 ' : 'from-purple-600 to-fuchsia-600'} text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md`}
                    >
                      {wishList.length}
                    </motion.span>
                  )}
                </NavLink>

                <NavLink to="cart" className="relative p-2 group">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <FiShoppingCart className={`w-6 h-6 ${!darkMode ? 'text-gray-600 group-hover:text-orange-400' : 'text-gray-300 group-hover:text-purple-400 '} transition-colors`} />
                  </motion.div>
                  {cart?.numOfCartItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`absolute top-0 right-0 bg-gradient-to-br ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'} text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md`}
                    >
                      {cart.numOfCartItems}
                    </motion.span>
                  )}
                </NavLink>

                <div className="hidden md:block mb-1">

                  <div className="relative" ref={profileRef}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setProfileDropdown(!profileDropdown)}
                      className="flex items-center space-x-2 transition-colors group"
                    >
                      <div className={`relative bg-gradient-to-br ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'} p-0.5 rounded-full  `}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${!darkMode ? 'bg-white  group-hover:bg-orange-50' : 'bg-purple-950 group-hover:bg-purple-900'}`}>
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`bg-gradient-to-r  bg-clip-text text-transparent font-bold ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-300 to-fuchsia-300 group-hover:text-transparent'}`}
                          >
                            {getInitials(userName)}
                          </motion.span>
                          <IoMdArrowDropdown className={`absolute -bottom-[17px] text-3xl ${!darkMode ? 'text-orange-400' : 'text-fuchsia-600 '}`} />
                        </div>
                      </div>
                    </motion.button>
                    {profileDropdown && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu">
                          <motion.button
                            whileHover={{ x: 10 }}
                            className={`flex items-center px-4 py-2 text-sm font-medium ${!darkMode ? 'text-gray-600 hover:text-orange-600' : 'text-gray-500 hover:text-orange-500'} transition-colors group`}
                          >
                            <FiUser className="mr-2 transition-transform group-hover:-translate-x-0.5" />
                            <span>Profile</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ x: 10 }}
                            className={`flex items-center px-4 py-2 text-sm font-medium ${!darkMode ? 'text-gray-600 hover:text-orange-600' : 'text-gray-500 hover:text-orange-500'} transition-colors group`}
                          >
                            <FiSettings className="mr-2 transition-transform group-hover:-translate-x-0.5" />
                            <span> Settings</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ x: 10 }}
                            onClick={logOut}
                            className={`flex items-center px-4 py-2 text-sm font-medium ${!darkMode ? 'text-gray-600 hover:text-red-600' : ' text-gray-500 hover:text-red-500'} transition-colors group`}
                          >
                            <FiLogOut className="mr-2 transition-transform group-hover:-translate-x-0.5" />
                            <span>Sign out</span>
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex space-x-4">
                <NavLink
                  to="signup"
                  className={`px-5 py-2.5 rounded-xl font-semibold border transition-colors ${darkMode ? 'text-purple-300 hover:bg-purple-900/50 border-purple-800' : 'text-orange-500 hover:bg-orange-50 border-orange-200'}`}
                >
                  Sign up
                </NavLink>
                <NavLink
                  to="login"
                  className={`px-5 py-2.5 bg-gradient-to-r text-white rounded-xl font-medium hover:shadow-lg transition-all ${darkMode ? 'from-fuchsia-800 to-purple-700 hover:shadow-purple-700/30' : 'from-[#ff7f00] to-[#ffcc00] hover:shadow-orange-300/30'}`}
                >
                  Login
                </NavLink>
              </div>
            )}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${darkMode
                ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:from-purple-700 hover:to-fuchsia-700'
                : 'bg-yellow-200 text-yellow-600 hover:bg-yellow-300'
                } transition-colors duration-300 shadow-md`}
            >
              {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            {userToken && (
              <div className="flex items-center mr-3 space-x-3">
                <NavLink to="wishlist" className="relative p-1 group">
                  <FiHeart className={`w-6 h-6 ${!darkMode ? 'text-gray-600 group-hover:text-red-500' : 'text-gray-300 group-hover:text-purple-400 '} transition-colors`} />
                  {wishList?.length > 0 && (
                    <span className={`absolute -top-1 -right-1 bg-gradient-to-br ${!darkMode ? 'from-red-600 to-rose-600' : 'from-purple-600 to-fuchsia-600'} text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center`}>
                      {wishList.length}
                    </span>
                  )}
                </NavLink>
                <NavLink to="cart" className="relative p-1 group">
                  <FiShoppingCart className={`w-6 h-6 ${!darkMode ? 'text-gray-600 group-hover:text-orange-400' : 'text-gray-300 group-hover:text-purple-400 '} transition-colors`} />
                  {cart?.numOfCartItems > 0 && (
                    <span className={`absolute -top-1 -right-1 bg-gradient-to-br ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'} text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center`}>
                      {cart.numOfCartItems}
                    </span>
                  )}
                </NavLink>
              </div>
            )}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className={`p-2 rounded-lg ${!darkMode ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300 hover:bg-purple-800'}`}
            >
              <FiMenu className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`fixed inset-y-0 right-0 max-w-xs w-full ${!darkMode ? 'bg-white' : 'bg-purple-950'} z-50 shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`${!darkMode ? 'border-orange-300' : 'border-purple-800'} flex justify-between items-center p-5 border-b `}>
                <div className="flex items-center space-x-2">
                  <div className={`bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'} rounded-xl p-1.5`}>
                    <div className={`bg-white w-8 h-8 rounded-lg flex items-center justify-center `}>
                      <span className={`bg-clip-text text-transparent bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'} font-bold`}>EM</span>
                    </div>
                  </div>
                  <h1 className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'}`}>
                    EliteMart
                  </h1>
                </div>

                <motion.button
                  whileHover={{ rotate: 90 }}
                  onClick={() => setIsOpen(false)}
                  className={`p-2 rounded-lg ${!darkMode ? 'text-orange-500 hover:bg-orange-100' : 'text-purple-300 hover:bg-purple-800'}`}
                >
                  <FiX className="h-6 w-6" />
                </motion.button>

              </div>

              <div className="p-5 h-[calc(100vh-80px)] overflow-y-auto">
                {userToken && (
                  <div className="mb-8">
                    <div className={`flex items-center space-x-4 mb-8 p-4 bg-gradient-to-r ${!darkMode ? 'from-orange-200/50 to-yellow-200/50' : 'from-purple-600/50 to-fuchsia-600/50'} rounded-2xl`}>
                      {/* <div className="bg-gradient-to-br from-orange-600 to-amber-400 p-0.5 rounded-full">
                                                <div className="bg-white dark:bg-purple-950 w-10 h-10 rounded-full flex items-center justify-center">
                                                    <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-400">
                                                        {getInitials(userName)}
                                                    </span>
                                                </div>
                                            </div> */}
                      <div>
                        <p className={`${!darkMode ? 'text-gray-600' : 'text-white'} font-bold text-xl`}>{userName}</p>
                        <button
                          className={`flex items-center text-md mt-1 ${!darkMode ? 'text-gray-400 hover:text-orange-500' : 'text-purple-400 hover:text-purple-500'}`}
                        >
                          <FiUser className="mr-1.5" /> profile
                        </button>
                        <button
                          className={`flex items-center text-md mt-1 ${!darkMode ? 'text-gray-400 hover:text-orange-500' : 'text-purple-400 hover:text-purple-500'}`}
                        >
                          <FiSettings className="mr-1.5" /> Setting
                        </button>
                        <button
                          onClick={logOut}
                          className={`flex items-center text-md mt-1 ${!darkMode ? 'text-gray-400 hover:text-red-500' : 'text-purple-400 hover:text-purple-500'}`}
                        >
                          <FiLogOut className="mr-1.5" /> Sign out
                        </button>
                      </div>
                    </div>

                    <nav className="space-y-3 mb-10">
                      {navLinks.map((link) => (
                        <NavLink
                          key={link.path}
                          to={link.path}
                          className={({ isActive }) =>
                            `block px-5 py-4 rounded-xl font-medium text-lg transition-all ${isActive
                              ? `bg-gradient-to-r border-l-4 ${!darkMode ? 'from-orange-500/10 to-amber-500/90 text-orange-500 border-orange-500' : 'from-purple-500/10 to-fuchsia-500/90 text-purple-400 border-purple-500'}`
                              : `bg-gradient-to-r ${!darkMode ? 'text-gray-700 hover:bg-orange-200' : 'text-purple-300 hover:bg-purple-900'}`
                            }`
                          }
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </NavLink>
                      ))}
                    </nav>
                  </div>
                )}

                {!userToken && (
                  <div className="flex flex-col space-y-4 mb-10">
                    <NavLink
                      to="signup"
                      className={`px-5 py-4 text-center rounded-xl font-medium text-lg border ${!darkMode ? 'text-orange-500 hover:bg-orange-50 border-purple-200' : 'text-purple-300 hover:bg-purple-900/50 border-purple-800'}`}
                      onClick={() => setIsOpen(false)}
                    >
                      Sign up
                    </NavLink>
                    <NavLink
                      to="login"
                      className={`px-5 py-4 bg-gradient-to-r text-white font-medium text-lg text-center rounded-xl ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-fuchsia-800 to-purple-700'}`}
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </NavLink>
                  </div>
                )}

                <div className={`mt-auto pt-8 border-t ${!darkMode ? 'border-orange-300' : 'border-purple-800'}  `}>
                  <h3 className={`text-sm font-bold ${!darkMode ? 'text-orange-500' : 'text-purple-500'} mb-4 uppercase tracking-wider`}>
                    Connect with us
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {socialIcons.map((item) => (
                      <motion.a
                        key={item.key}
                        href="#"
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-xl shadow-sm hover:shadow-md transition-all ${!darkMode ? 'from-gray-100 to-gray-100 text-gray-500' : 'from-purple-800 to-purple-800 text-gray-300'}`}
                      >
                        {item.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

