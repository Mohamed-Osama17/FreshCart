import React, { useContext, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Lottie from 'lottie-react';
import CartLoader from '../../CartLoader.json';
import { DarkModeContext } from '../../Context/DarkModeContext';
import { BrandsContext } from '../../Context/BrandsContext';
import { WishListContext } from '../../Context/WishListContext';
import { CartContext } from '../../Context/CartContext';
import ProductCard from '../ProductCard/ProductCard';

export default function BrandsDetails() {
    // Context hooks
    const { darkMode } = useContext(DarkModeContext);
    const { brandProducts, brandDetails, getSpecificBrand, getBrandDetails, loading } = useContext(BrandsContext);
    const { addProductToWishList, removeProductFromWishList, checkFavourite } = useContext(WishListContext);
    const { addProductToCart } = useContext(CartContext);

    // Route params
    const { id } = useParams();

    // Side effects
    useEffect(() => {
        getSpecificBrand(id);
        getBrandDetails(id);
    }, [id]);


    // Memoized gradient classes for better performance
    const gradientClasses = useMemo(() => ({
        text: darkMode ? 'from-purple-600 to-fuchsia-500' : 'from-[#ff7f00] to-[#ffcc00]',
        divider: darkMode ? 'from-purple-400 to-fuchsia-400' : 'from-orange-400 to-yellow-400'
    }), [darkMode]);

    // Extracted BrandHeader component for better readability
    const BrandHeader = ({ brandName, gradientClasses }) => (
        <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">
                <span className={`bg-gradient-to-r text-transparent bg-clip-text ${gradientClasses.text}`}>
                    {brandName} Brand
                </span>
            </h2>
            <div className={`w-36 h-1 mx-auto rounded-full bg-gradient-to-r ${gradientClasses.divider}`}></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Discover products curated just for you across our diverse collections
            </p>
        </div>
    );

    // Loading state
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="w-64 h-64">
                    <Lottie animationData={CartLoader} loop={true} />
                </div>
                <p className="text-gray-600 text-xl font-medium">Loading your Products...</p>
                <p className="text-gray-500 mt-2">Preparing your shopping experience</p>
            </div>
        );
    }

    // Empty state
    if (brandProducts?.length === 0) {
        return (
            <div className="text-center py-16">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">This brand doesn't have any products available at the moment.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Brand Header Section */}
            <BrandHeader
                brandName={brandDetails.name}
                gradientClasses={gradientClasses}
            />

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {brandProducts?.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        isFavorite={checkFavourite(product.id)}
                        onAddToCart={addProductToCart}
                        onToggleFavorite={() =>
                            checkFavourite(product.id)
                                ? removeProductFromWishList(product.id)
                                : addProductToWishList(product)
                        }
                    />
                ))}
            </div>
        </div>
    );
};

