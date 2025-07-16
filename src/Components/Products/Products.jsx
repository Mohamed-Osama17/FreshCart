import { useContext } from 'react';
import Lottie from 'lottie-react';
import CartLoader from '../../CartLoader.json';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';
import useProducts from '../../Hooks/useProducts';
import ProductCard from '../ProductCard/ProductCard';
import { DarkModeContext } from '../../Context/DarkModeContext';

export default function Products() {
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishList, removeProductFromWishList, checkFavourite } = useContext(WishListContext);
  const { darkMode } = useContext(DarkModeContext);
  const { data: products, isLoading } = useProducts();



  if (isLoading) {
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

  return (
    <div className="container mx-auto px-4 lg:px-20 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Explore Our <span className={`bg-gradient-to-r text-transparent bg-clip-text ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'}`}>Products</span>
        </h2>
        <div className={`w-36 h-1 mx-auto rounded-full bg-gradient-to-r ${!darkMode ? 'from-orange-400 to-yellow-400' : 'from-purple-500 to-fuchsia-500'}`}></div>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Discover products curated just for you across our diverse collections
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map(product => (
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
}