import { memo, useState } from "react";
import Cart from "./cart/cart";
import Nav from "./nav";
import { useAppSelector } from "../store";
import ProductContainer from "../container/productContainer";

function Dashboard() {
  const [showCart, setShowCart] = useState(false);
  const cart = useAppSelector((state) => state.cart);
  const toggleCart = () => {
    setShowCart((prev) => !prev);
  };
  return (
    <>
      <div className="min-h-full">
        <Nav />
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center mx-auto  max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Product List
            </h1>
            <button
              type="button"
              onClick={toggleCart}
              className="flex items-center relative rounded-md text-white p-4 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
            >
              <svg
                className="flex-1 w-12 h-12 fill-indigo-900"
                viewBox="0 0 24 24"
              >
                <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
              </svg>
              <span className="bg-indigo-900 opacity-60 rounded-full text- px-4 py-2 absolute -top-1 right-1">
                {cart.totalQuantity}
              </span>
            </button>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <ProductContainer />
          </div>
        </main>
        <aside>
          <Cart showCart={showCart} toggleCart={toggleCart} />
        </aside>
      </div>
    </>
  );
}
export default memo(Dashboard);
