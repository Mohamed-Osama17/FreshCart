import React, { useContext, useState, useEffect } from 'react';
import { FaStar, FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import toast from 'react-hot-toast';
import Lottie from 'lottie-react';
import SignUpAnimation from '../../LoginPageAnimation.json';
import { DarkModeContext } from '../../Context/DarkModeContext';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  let { setUserToken, setUserName } = useContext(UserContext);
  let { darkMode } = useContext(DarkModeContext);
  let navigate = useNavigate();


  let validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email format'),
    password: Yup.string().required('Password is required').matches(/^[A-Z]\w{4,10}/, 'Password must start with a capital letter and be 5-11 characters'),
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin
  });

  async function handleLogin(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userName', data.user.name);
      setUserToken(data.token);
      setUserName(data.user.name);
      navigate('/');
      toast.success(`Welcome back, ${data.user.name}!`, {
        icon: '👋',
        style: {
          borderRadius: '10px',
          background: darkMode ? '#6366f1' : '#8b5cf6',
          color: '#fff',
        },
      });
    } catch (error) {
      console.log(error);
      setApiError(error.response?.data?.message || 'An error occurred');
      setLoading(false);
    }
  }

  // Showing Password on input
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className={`min-h-screen flex items-center justify-center p-4 py-12 transition-colors duration-300 ${darkMode
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      : 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50'
      }`}>
      <div className={`w-full max-w-6xl flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${darkMode
        ? 'bg-gray-800 bg-opacity-30 backdrop-blur-lg border border-gray-700'
        : 'bg-white bg-opacity-90 backdrop-blur-sm border border-gray-200'
        }`}>
        {/* Left Panel - Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className={`text-4xl font-bold mb-2  ${darkMode ? 'text-white' : 'text-gray-800'
              }`}>Welcome Back</h1>
            <div className="flex justify-center">
              <div className={`h-1 w-20 rounded-full  ${darkMode ? 'bg-purple-500' : 'bg-[#ff7f00]'}`}></div>
              <div className={`h-1 w-10 rounded-full  mx-1 ${darkMode ? 'bg-pink-500' : 'bg-yellow-400'}`} ></div>
              <div className={`h-1 w-5 rounded-full  ${darkMode ? 'bg-indigo-500' : 'bg-[#4A7290]'}`}></div>
            </div>
            <p className={`mt-4 ${darkMode ? 'text-indigo-200' : 'text-gray-600'}`}>
              Sign in to continue your journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {apiError && (
              <div className={`p-3 rounded-lg flex items-center animate-shake ${darkMode
                ? 'bg-red-500 bg-opacity-20 text-red-200'
                : 'bg-red-100 text-red-700'
                }`}>
                <FaStar className="mr-2 text-red-500" />
                <span>{apiError}</span>
              </div>
            )}

            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-lg transition-all duration-300 ${darkMode
                  ? 'bg-gray-700 bg-opacity-50 border-gray-600 text-white placeholder-purple-300'
                  : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'
                  } ${errors.email && touched.email
                    ? `${darkMode ? 'border-pink-500 focus:ring-pink-500' : 'border-red-600 focus:ring-red-600'}`
                    : `${darkMode ? 'focus:ring-purple-500 focus:border-purple-500' : 'focus:ring-orange-500 focus:border-orange-500'} `
                  } border focus:outline-none focus:ring-2`}
                placeholder="Email address"
              />
              {errors.email && touched.email && (
                <div className={`absolute left-0 mt-1 text-sm flex items-center ${darkMode ? 'text-pink-400' : 'text-red-600'
                  }`}>
                  <FaStar className="mr-1 text-xs" />
                  {errors.email}
                </div>
              )}
            </div>

            <div className="relative">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-300 ${darkMode
                    ? 'bg-gray-700 bg-opacity-50 border-gray-600 text-white placeholder-purple-300'
                    : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'
                    } ${errors.password && touched.password
                      ? `${darkMode ? 'border-pink-500 focus:ring-pink-500' : 'border-red-600 focus:ring-red-600'}`
                      : `${darkMode ? 'focus:ring-purple-500 focus:border-purple-500' : 'focus:ring-orange-500 focus:border-orange-500'} `
                    } border focus:outline-none focus:ring-2`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-purple-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && touched.password && (
                <div className={`mt-1 text-sm flex items-center ${darkMode ? 'text-pink-400' : 'text-red-600'
                  }`}>
                  <FaStar className="mr-1 text-xs" />
                  {errors.password}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className={`h-4 w-4 rounded ${darkMode ? 'text-purple-500 bg-gray-700 border-gray-600' : 'text-purple-500 border-gray-300'
                    }`}
                />
                <label htmlFor="remember-me" className={`ml-2 block text-sm ${darkMode ? 'text-indigo-200' : 'text-gray-600'
                  }`}>
                  Remember me
                </label>
              </div>
              <a href="#" className={`text-sm transition-colors ${darkMode ? 'text-purple-300 hover:text-purple-200' : 'text-orange-500 hover:text-orange-700'
                }`}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-lg transition-all duration-300 ${loading
                ? `${darkMode ? 'bg-purple-600' : 'bg-orange-400'} cursor-not-allowed`
                : `bg-gradient-to-r ${darkMode ? 'from-fuchsia-600 to-purple-700 hover:from-fuchsia-700 hover:to-purple-800' : 'from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 '} transform hover:-translate-y-0.5`
                } flex items-center justify-center`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <FaStar className="ml-2 animate-pulse" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className={`absolute inset-0 flex items-center ${darkMode ? 'border-purple-700' : 'border-gray-300'
                }`}>
                <div className={`w-full border-t ${darkMode ? 'border-purple-700' : 'border-orange-300'
                  }`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${darkMode ? 'bg-gray-800 text-purple-300' : 'bg-white text-orange-500'
                  }`}>Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className={`w-full flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all ${darkMode
                ? 'bg-gray-700 text-white hover:bg-gray-600 border border-gray-600'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}>
                <FaGoogle className={`mr-2 ${darkMode ? 'text-red-400' : 'text-red-500'}`} />
                Google
              </button>
              <button className={`w-full flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all ${darkMode
                ? 'bg-gray-700 text-white hover:bg-gray-600 border border-gray-600'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}>
                <FaGithub className="mr-2" />
                GitHub
              </button>
            </div>
          </div>

          <p className={`mt-8 text-center text-sm ${darkMode ? 'text-purple-300' : 'text-gray-600'
            }`}>
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className={`font-medium transition-colors ${darkMode ? 'text-white hover:text-purple-200' : 'text-orange-600 hover:text-orange-700'
                }`}
            >
              Sign up
            </button>
          </p>
        </div>

        {/* Right Panel - Animation */}
        <div className={`w-full md:w-1/2 flex items-center justify-center p-8 transition-colors duration-300 ${darkMode
          ? 'bg-gradient-to-br from-indigo-900/70 via-purple-900/70 to-fuchsia-800/70'
          : 'bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100'
          }`}>
          <div className="w-full max-w-md">
            <Lottie
              animationData={SignUpAnimation}
              loop={true}
              className={`transition-all duration-500 ${darkMode ? '' : 'filter brightness-110'}`}
            />
            <div className="text-center mt-6">
              <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'
                }`}>Unlock Premium Features</h3>
              <p className={`max-w-md mx-auto ${darkMode ? 'text-indigo-200' : 'text-gray-600'
                }`}>
                Sign in to access personalized content, exclusive offers, and seamless shopping experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}