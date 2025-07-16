import React, { useContext, useMemo } from 'react'
import useProducts from '../../Hooks/useProducts';
import { useParams } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import { WishListContext } from '../../Context/WishListContext';
import { CartContext } from '../../Context/CartContext';
import { DarkModeContext } from '../../Context/DarkModeContext';



export default function RelatedProducts() {

    const { data: allProducts } = useProducts();
    const { addProductToCart } = useContext(CartContext);
    const { darkMode } = useContext(DarkModeContext);
    const { addProductToWishList, removeProductFromWishList, checkFavourite } = useContext(WishListContext);
    const { category } = useParams();

    const relatedProducts = useMemo(() => {
        if (!allProducts || !category) return []
        return allProducts
            .filter(product => product.category.name === category)
            .slice(0, 8);
    }, [allProducts, category]);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                    <span className={`bg-gradient-to-r text-transparent bg-clip-text ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'}`}>{category}</span>
                </h2>
                <div className={`w-36 h-1 mx-auto rounded-full bg-gradient-to-r ${!darkMode ? 'from-orange-400 to-yellow-400' : 'from-purple-500 to-fuchsia-500'}`}></div>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    Discover products curated just for you across our diverse collections
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {relatedProducts?.map((product) => (
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
    )
}
