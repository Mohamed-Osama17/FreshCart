
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Brands from './Components/Brands/Brands.jsx'
import Products from './Components/Products/Products.jsx'
import Login from './Components/Login/Login.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import UserContextProvider from './Context/UserContext.jsx'
import WishListContextProvider from './Context/WishListContext.jsx'
import CartContextProvider from './Context/CartContext.jsx'
import BrandsContextProvider from './Context/BrandsContext.jsx'
import DarkModeContextProvider from './Context/DarkModeContext.jsx'
import OrdersContextProvider from './Context/OrdersContext.jsx'
import CategoriesContextProvider from './Context/CategoriesContext.jsx'
import { Toaster } from 'react-hot-toast'
import BrandsDetails from './Components/BrandsDetails/BrandsDetails.jsx'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import RelatedProducts from './Components/RelatedProducts/RelatedProducts.jsx'
import Checkout from './Components/Checkout/Checkout.jsx'
import AllOrders from './Components/AllOrders/AllOrders.jsx'
import UserOrders from './Components/UserOrders/UserOrders.jsx'
import WishList from './Components/WishList/WishList.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import SignUp from './Components/SignUp/SignUp.jsx'



let routers = createBrowserRouter([{
  path: '', element: <Layout />, children: [
    { path: "signup", element: <SignUp /> },
    { path: "login", element: <Login /> },
    { index: true, element: <ProtectedRoute> <Home /></ProtectedRoute> },
    { path: "cart", element: <ProtectedRoute> <Cart /></ProtectedRoute> },
    { path: "categories", element: <ProtectedRoute> <Categories /></ProtectedRoute> },
    { path: "brands", element: <ProtectedRoute> <Brands /></ProtectedRoute> },
    { path: "brands/branddetails/:id", element: <ProtectedRoute> <BrandsDetails /> </ProtectedRoute> },
    { path: "products", element: <ProtectedRoute> <Products /></ProtectedRoute> },
    { path: "relatedproducts", element: <ProtectedRoute> <RelatedProducts /></ProtectedRoute> },
    { path: "relatedproducts/:category", element: <ProtectedRoute> <RelatedProducts /></ProtectedRoute> },
    { path: "checkout", element: <ProtectedRoute> <Checkout /></ProtectedRoute> },
    { path: "allorders", element: <ProtectedRoute> <AllOrders /> </ProtectedRoute> },
    { path: "userorders", element: <ProtectedRoute> <UserOrders /> </ProtectedRoute> },
    { path: "wishlist", element: <ProtectedRoute> <WishList /> </ProtectedRoute> },
    { path: "productdetalis/:id/:category", element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
    { path: "products/:productdetalis/:id/:category", element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
    { path: "*", element: <NotFound /> },
  ]
}])

const query = new QueryClient();

function App() {

  return <>
    <QueryClientProvider client={query}>
      <ReactQueryDevtools initialIsOpen={false} />
      <UserContextProvider>
        <WishListContextProvider>
          <CartContextProvider>
            <BrandsContextProvider>
              <DarkModeContextProvider>
                <OrdersContextProvider>
                  <CategoriesContextProvider>
                    <RouterProvider router={routers}></RouterProvider>
                    <Toaster />
                  </CategoriesContextProvider>
                </OrdersContextProvider>
              </DarkModeContextProvider>
            </BrandsContextProvider>
          </CartContextProvider>
        </WishListContextProvider>
      </UserContextProvider>
    </QueryClientProvider>



  </>
}

export default App
