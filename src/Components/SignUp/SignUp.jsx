import React, { useState, useContext } from 'react';
import { FaStar, FaEye, FaEyeSlash, FaGoogle, FaGithub, FaUser, FaPhone, FaLock } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import toast from 'react-hot-toast';
import Lottie from 'lottie-react';
import SignUpAnimation from '../../SignUpAnimation.json';
import { DarkModeContext } from '../../Context/DarkModeContext';

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  let { setUserToken, setUserName } = useContext(UserContext);
  let { darkMode } = useContext(DarkModeContext);
  let navigate = useNavigate();

  async function handleSignUp(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values);
      console.log(data);


      if (data.message === "success") {
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userName', data.user.name);
        setUserToken(data.token);
        setUserName(data.user.name);

        toast.success(`Welcome, ${data.user.name}!`, {
          icon: '🎉',
          style: {
            borderRadius: '10px',
            background: darkMode ? '#6366f1' : '#8b5cf6',
            color: '#fff',
          },
        });
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      setApiError(error.response?.data?.message || 'An error occurred during signup');
      setLoading(false);
    }
  }


  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Full name is required')
      .min(3, 'Name must be at least 3 characters')
      .matches(/^[A-Z][a-z]+\s[A-Z][a-z]+$/, 'Please enter your first and last name'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
    phone: Yup.string()
      .required('Phone is required')
      .matches(/^01[0125][0-9]{8}$/, 'Enter a valid Egyptian phone number'),

  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",

    },
    validationSchema,
    onSubmit: handleSignUp
  });


  // Password strength calculation
  const calculatePasswordStrength = (password) => {
    if (!password) return 0;

    let strength = 0;
    if (password.length > 0) strength += 20;
    if (password.length > 5) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;

    return Math.min(strength, 100);
  };

  // Update password strength when password changes
  React.useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(values.password));
  }, [values.password]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Password strength indicator component
  const PasswordStrengthIndicator = ({ strength }) => {
    const getColor = () => {
      if (strength < 40) return 'bg-red-500';
      if (strength < 70) return 'bg-yellow-500';
      return 'bg-green-500';
    };

    const getLabel = () => {
      if (strength === 0) return '';
      if (strength < 40) return 'Weak';
      if (strength < 70) return 'Medium';
      return 'Strong';
    };


    return (
      <div className="mt-2">
        <div className="flex justify-between mb-1">
          <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Password strength
          </span>
          <span className={`text-xs font-medium ${strength < 40 ? 'text-red-500' : strength < 70 ? 'text-yellow-500' : 'text-green-500'}`}>
            {getLabel()}
          </span>
        </div>
        <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div
            className={`${getColor()} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${strength}%` }}
          ></div>
        </div>
      </div>
    );
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
            <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Create Your Account
            </h1>
            <div className="flex justify-center">
              <div className={`h-1 w-20 rounded-full  ${darkMode ? 'bg-purple-500' : 'bg-[#ff7f00]'}`}></div>
              <div className={`h-1 w-10 rounded-full  mx-1 ${darkMode ? 'bg-pink-500' : 'bg-yellow-400'}`} ></div>
              <div className={`h-1 w-5 rounded-full  ${darkMode ? 'bg-indigo-500' : 'bg-[#4A7290]'}`}></div>
            </div>
            <p className={`mt-4 ${darkMode ? 'text-indigo-200' : 'text-gray-600'}`}>
              Join our community and unlock exclusive features
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {apiError && (
              <div className={`p-3 rounded-lg flex items-center animate-shake ${darkMode
                ? 'bg-red-500 bg-opacity-20 text-red-200'
                : 'bg-red-100 text-red-700'
                }`}>
                <FaStar className="mr-2 text-red-500" />
                <span>{apiError}</span>
              </div>
            )}

            {/* Name Field */}
            <div className="relative">
              <div className="relative inset-y-8 left-0 flex items-center pl-3 pointer-events-none">
                <FaUser className={`${darkMode ? 'text-purple-400' : 'text-orange-500'}`} />
              </div>
              <input
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`pl-10 w-full px-4 py-3 rounded-lg transition-all duration-300 ${darkMode
                  ? 'bg-gray-700 bg-opacity-50 border-gray-600 text-white placeholder-purple-300'
                  : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'
                  } ${errors.name && touched.name
                    ? `${darkMode ? 'border-pink-500 focus:ring-pink-500' : 'border-red-600 focus:ring-red-600'}`
                    : `${darkMode ? 'focus:ring-purple-500 focus:border-purple-500' : 'focus:ring-orange-500 focus:border-orange-500'} `
                  } border focus:outline-none focus:ring-2`}
                placeholder="Full name"
              />
              {errors.name && touched.name && (
                <div className={`mt-1 text-sm flex items-center ${darkMode ? 'text-pink-400' : 'text-red-600'
                  }`}>
                  <FaStar className="mr-1 text-xs" />
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="relative">
              <div className="relative inset-y-8 left-0 flex items-center pl-3 pointer-events-none">
                <svg className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-orange-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <input
                type="email"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`pl-10 w-full px-4 py-3 rounded-lg transition-all duration-300 ${darkMode
                  ? 'bg-gray-700 bg-opacity-50 border-gray-600 text-white placeholder-purple-300'
                  : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'
                  } ${errors.email && touched.email
                    ? `${darkMode ? 'border-pink-500 focus:ring-pink-500' : 'border-red-600 focus:ring-red-600'}`
                    : `${darkMode ? 'focus:ring-purple-500 focus:border-purple-500' : 'focus:ring-orange-500 focus:border-orange-500'} `
                  } border focus:outline-none focus:ring-2`}
                placeholder="Email address"
              />
              {errors.email && touched.email && (
                <div className={`mt-1 text-sm flex items-center ${darkMode ? 'text-pink-400' : 'text-red-600'
                  }`}>
                  <FaStar className="mr-1 text-xs" />
                  {errors.email}
                </div>
              )}
            </div>


            {/* Password Field */}
            <div className="relative">
              <div className="relative inset-y-8 left-0 z-50 flex items-center pl-3 pointer-events-none">
                <FaLock className={`${darkMode ? 'text-purple-400' : 'text-orange-500'}`} />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`pl-10 w-full px-4 py-3 rounded-lg transition-all duration-300 ${darkMode
                    ? 'bg-gray-700 bg-opacity-50 border-gray-600 text-white placeholder-purple-300'
                    : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'
                    } ${errors.password && touched.password
                      ? `${darkMode ? 'border-pink-500 focus:ring-pink-500' : 'border-red-600 focus:ring-red-600'}`
                      : `${darkMode ? 'focus:ring-purple-500 focus:border-purple-500' : 'focus:ring-orange-500 focus:border-orange-500'} `
                    } border focus:outline-none focus:ring-2`}
                  placeholder="Create password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-indigo-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'
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

              {/* Password Strength Indicator */}
              {values.password && (
                <PasswordStrengthIndicator strength={passwordStrength} />
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <div className="relative inset-y-8 left-0 z-50 flex items-center pl-3 pointer-events-none">
                <FaLock className={`${darkMode ? 'text-purple-400' : 'text-orange-500'}`} />
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="rePassword"
                  id="rePassword"
                  value={values.rePassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`pl-10 w-full px-4 py-3 rounded-lg transition-all duration-300 ${darkMode
                    ? 'bg-gray-700 bg-opacity-50 border-gray-600 text-white placeholder-purple-300'
                    : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'
                    } ${errors.rePassword && touched.rePassword
                      ? `${darkMode ? 'border-pink-500 focus:ring-pink-500' : 'border-red-600 focus:ring-red-600'}`
                      : `${darkMode ? 'focus:ring-purple-500 focus:border-purple-500' : 'focus:ring-orange-500 focus:border-orange-500'} `
                    } border focus:outline-none focus:ring-2`}
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-indigo-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.rePassword && touched.rePassword && (
                <div className={`mt-1 text-sm flex items-center ${darkMode ? 'text-pink-400' : 'text-red-600'
                  }`}>
                  <FaStar className="mr-1 text-xs" />
                  {errors.rePassword}
                </div>
              )}
            </div>

            {/* Phone Field */}
            <div className="relative">
              <div className="relative inset-y-8 left-0 flex items-center pl-3 pointer-events-none">
                <FaPhone className={`${darkMode ? 'text-purple-400' : 'text-orange-500'}`} />
              </div>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`pl-10 w-full px-4 py-3 rounded-lg transition-all duration-300 ${darkMode
                  ? 'bg-gray-700 bg-opacity-50 border-gray-600 text-white placeholder-purple-300'
                  : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'
                  } ${errors.phone && touched.phone
                    ? `${darkMode ? 'border-pink-500 focus:ring-pink-500' : 'border-red-600 focus:ring-red-600'}`
                    : `${darkMode ? 'focus:ring-purple-500 focus:border-purple-500' : 'focus:ring-orange-500 focus:border-orange-500'} `
                  } border focus:outline-none focus:ring-2`}
                placeholder="Phone number"
              />
              {errors.phone && touched.phone && (
                <div className={`mt-1 text-sm flex items-center ${darkMode ? 'text-pink-400' : 'text-red-600'
                  }`}>
                  <FaStar className="mr-1 text-xs" />
                  {errors.phone}
                </div>
              )}
            </div>



            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className={`h-4 w-4 rounded ${darkMode ? 'text-purple-500 bg-gray-700 border-gray-600' : 'text-purple-500 border-gray-300'
                  }`}
              />
              <label htmlFor="terms" className={`ml-2 block text-sm ${darkMode ? 'text-indigo-200' : 'text-gray-600'
                }`}>
                I agree to the <a href="#" className={`font-medium ${darkMode ? 'text-purple-400' : 'text-orange-600'}`}>Terms of Service</a> and <a href="#" className={`font-medium ${darkMode ? 'text-purple-400' : 'text-orange-600'}`}>Privacy Policy</a>
              </label>
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
                  Creating account...
                </>
              ) : (
                <>
                  <span>Sign Up</span>
                  <FaStar className="ml-2 animate-pulse" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className={`absolute inset-0 flex items-center ${darkMode ? 'border-indigo-700' : 'border-gray-300'
                }`}>
                <div className={`w-full border-t ${darkMode ? 'border-purple-700' : 'border-orange-300'
                  }`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${darkMode ? 'bg-gray-800 text-purple-300' : 'bg-white text-orange-500'
                  }`}>Or sign up with</span>
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
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className={`font-medium transition-colors ${darkMode ? 'text-white hover:text-purple-200' : 'text-orange-600 hover:text-orange-700'
                }`}
            >
              Sign in
            </button>
          </p>
        </div>

        {/* Right Panel - Animation */}
        <div className={`w-full md:w-1/2 flex items-center justify-center p-8 transition-colors duration-300 ${darkMode
          ? 'bg-gradient-to-br from-indigo-900/70 via-purple-900/70 to-pink-800/70'
          : 'bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100'
          }`}>
          <div className="w-full max-w-md">
            <Lottie
              animationData={SignUpAnimation}
              loop={true}
              className={`transition-all duration-500 ${darkMode ? '' : 'filter brightness-110'}`}
            />
            <div className="text-center mt-6">
              <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'
                }`}>Join Our Community</h3>
              <p className={`max-w-md mx-auto ${darkMode ? 'text-indigo-200' : 'text-gray-600'
                }`}>
                Create an account to access exclusive features, personalized content, and special member benefits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

