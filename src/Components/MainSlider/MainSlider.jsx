import React, { useContext, useRef } from 'react';
import Slider from 'react-slick';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import mainslide1 from '../../assets/images/slider-image-1.jpeg';
import mainslide2 from '../../assets/images/slider-image-2.jpeg';
import mainslide3 from '../../assets/images/slider-image-3.jpeg';
import banner1 from '../../assets/images/grocery-banner.png';
import banner2 from '../../assets/images/grocery-banner-2.JPEG';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../Context/DarkModeContext';

export default function MainSlider() {
    const sliderRef = useRef(null);
    const { darkMode } = useContext(DarkModeContext);

    const mainSlides = [
        { id: 1, image: mainslide1, title: "Summer Collection", subtitle: "New Arrivals 2023", cta: "Shop Now" },
        { id: 2, image: mainslide2, title: "Winter Essentials", subtitle: "Stay Warm in Style", cta: "Discover" },
        { id: 3, image: mainslide3, title: "Limited Edition", subtitle: "Exclusive Designs", cta: "Explore" },
    ];

    const banners = [
        { id: 1, image: banner1, title: "Fresh Groceries", discount: "30% OFF" },
        { id: 2, image: banner2, title: "Organic Products", discount: "Free Delivery" },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: false,
        customPaging: i => (
            <div className="w-3 h-3 rounded-full bg-white/30 transition-all duration-300 hover:bg-white/80" />
        ),
        appendDots: dots => (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30">
                <ul className="flex space-x-2">{dots}</ul>
            </div>
        ),
    };

    const nextSlide = () => sliderRef.current.slickNext();
    const prevSlide = () => sliderRef.current.slickPrev();

    return (
        <section className="relative max-w-7xl mx-auto px-4 lg:px-20 py-8 md:py-12">
            <div className="flex flex-col lg:flex-row gap-5">
                {/* Main Slider */}
                <div className="lg:w-8/12 relative rounded-2xl overflow-hidden shadow-xl group">
                    <Slider ref={sliderRef} {...settings}>
                        {mainSlides.map((slide) => (
                            <div key={slide.id} className="relative">
                                <div className="bg-gradient-to-r from-black/70 to-transparent absolute inset-0 z-10" />

                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-[400px] md:h-[500px] object-cover object-right"
                                />

                                <div className="absolute inset-0 z-20 flex flex-col justify-center pl-8 md:pl-16 lg:pl-24">
                                    <span className={`${!darkMode ? 'text-orange-400' : 'text-purple-400'} font-bold tracking-wider text-sm md:text-base animate-pulse`}>
                                        SPECIAL OFFER
                                    </span>
                                    <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 animate-pulse delay-100">
                                        {slide.title}
                                    </h2>
                                    <p className="text-xl md:text-2xl text-white/90 mt-3 mb-6 max-w-md animate-pulse delay-200">
                                        {slide.subtitle}
                                    </p>
                                    <Link to={'/products'}>
                                        <button className={`${!darkMode ? 'text-orange-700' : 'text-purple-700'} bg-white/90 hover:bg-white font-bold px-8 py-3 rounded-full shadow-lg w-fit transform transition-all duration-500 hover:scale-105 animate-pulse delay-300`}>
                                            {slide.cta}
                                        </button>
                                    </Link>

                                </div>
                            </div>
                        ))}
                    </Slider>

                    {/* Custom Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30"
                        aria-label="Previous slide"
                    >
                        <FiChevronLeft className="text-white text-2xl" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30"
                        aria-label="Next slide"
                    >
                        <FiChevronRight className="text-white text-2xl" />
                    </button>
                </div>

                {/* Banner Column */}
                <div className="lg:w-4/12 flex flex-col gap-5">
                    {banners.map((banner) => (
                        <div
                            key={banner.id}
                            className="relative rounded-2xl overflow-hidden shadow-lg transition-all duration-700 hover:shadow-xl hover:-translate-y-1 group"
                        >
                            <div className="bg-gradient-to-b from-black/30 to-black/70 absolute inset-0 z-10" />

                            <img
                                src={banner.image}
                                alt={banner.title}
                                className="w-full h-48 md:h-[240px] object-cover object-right"
                            />

                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
                                <span className={`${!darkMode ? 'text-orange-300' : 'text-purple-300'}  font-bold tracking-wider text-lg`}>
                                    {banner.discount}
                                </span>
                                <h3 className="text-2xl font-bold text-white mt-2">
                                    {banner.title}
                                </h3>
                                <button className={`${!darkMode ? 'text-orange-700' : 'text-purple-700'} mt-4 bg-white/90  hover:bg-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform group-hover:scale-105`}>
                                    Shop Collection
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}