import React, { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { DarkModeContext } from '../../Context/DarkModeContext';
import { Link } from 'react-router-dom';

const NextArrow = ({ onClick }) => {

    const { darkMode } = useContext(DarkModeContext);
    return (
        <button
            onClick={onClick}
            className="absolute -right-5 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur-sm transition-all hover:scale-110 hover:bg-white md:flex"
            aria-label="Next"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${!darkMode ? 'text-orange-600' : 'text-purple-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
    )
}

const PrevArrow = ({ onClick }) => {

    const { darkMode } = useContext(DarkModeContext);
    return (
        <button
            onClick={onClick}
            className="absolute -left-5 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur-sm transition-all hover:scale-110 hover:bg-white md:flex"
            aria-label="Previous"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${!darkMode ? 'text-orange-600' : 'text-purple-600'} `} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        </button>)
}

export default function CategorySlider() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { darkMode } = useContext(DarkModeContext);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    arrows: false,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                }
            }
        ]
    };

    async function getCategories() {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
            setCategories(data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    if (isLoading) {
        return (
            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 h-12 w-64 animate-pulse rounded-xl bg-gray-200 mx-auto"></div>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="h-40 w-full animate-pulse rounded-2xl bg-gray-200"></div>
                                <div className="mt-4 h-6 w-3/4 animate-pulse rounded bg-gray-200"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="py-12 bg-gradient-to-b">
            <div className="mx-auto max-w-7xl px-4 lg:px-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Explore Our <span className={`bg-gradient-to-r text-transparent bg-clip-text ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'}`}>Categories</span>
                    </h2>
                    <div className={`w-36 h-1 mx-auto rounded-full bg-gradient-to-r ${!darkMode ? 'from-orange-400 to-yellow-400' : 'from-purple-500 to-fuchsia-500'}`}></div>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Explore our curated categories to find exactly what you're looking for
                    </p>
                </div>

                <div className="relative">
                    <Slider {...settings}>
                        {categories.map((category) => (
                            <Link key={category._id} to={`/relatedproducts/${category.name}`}>
                                <div className="px-2 focus:outline-none">
                                    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-xl">
                                        <div className="relative h-52 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 text-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                <span className={`inline-block px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-500 to-pink-500'} rounded-full`}>
                                                    Shop Now
                                                </span>
                                            </div>
                                        </div>
                                        <div className="py-4 text-center">
                                            <h3 className={`${!darkMode ? 'group-hover:text-orange-600' : 'group-hover:text-purple-600'} font-bold text-gray-800 transition-colors`}>
                                                {category.name}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
}