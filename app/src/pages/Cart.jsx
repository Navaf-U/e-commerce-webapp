import { useContext } from "react";
import { RxCross1 } from "react-icons/rx";
import { ProductsData } from "../context/ProductsCont";
import { NavLink } from "react-router-dom";
import { userData } from "../context/UserContext";

const Cart = () => {
  const {  products, currency,  getTotalCartAmount } =
    useContext(ProductsData);
  const { cart, removeFromCart } =
    useContext(userData);

  return (
    <div className="cart-items mx-auto my-8 max-w-screen-lg p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Your Cart</h2>
      {products.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="hidden sm:flex flex-col sm:flex-row items-center py-4 px-4 bg-[#c95555] text-white rounded-lg shadow-md mb-4">
          <p className="flex-1 text-center w-24 object-cover rounded-md sm:mr-4 mb-2 sm:mb-0">
            Product
          </p>
          <p className="flex-1 text-center">Title</p>
          <p className="flex-1 text-right">Price</p>
          <p className="flex-1 text-right">Quantity</p>
          <p className="flex-1 text-right ">Total</p>
          <p className="flex-1 text-right">Remove</p>
        </div>
      )}
      {products.map((item) => {
        const quantity = cart[item.id];
        return (
          quantity > 0 && (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center py-4 px-4 bg-gray-50 rounded-lg shadow-md mb-4"
            >
              <img
                src={item.image}
                className="w-24 h-24 object-cover rounded-md sm:mr-4 mb-2 sm:mb-0"
                alt={item.name}
              />
              <p className="flex-1 text-center mb-2 sm:mb-0">{item.name}</p>
              <p className="flex-1 text-center mb-2 sm:mb-0">
                {currency}
                {item.price.toFixed(2)}
              </p>
              <button className="bg-red-800 h-12 text-white flex items-center justify-center w-24 mb-2 sm:mb-0">
                <p className="text-sm">{quantity}</p>
              </button>
              <p className="flex-1 text-center mb-2 sm:mb-0">
                {currency}
                {(item.price * quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-4 mb-2 sm:mb-0"
              >
                <RxCross1
                  size={28}
                  className="text-red-600 hover:text-red-800 transition-colors duration-200 me-4"
                />
              </button>
            </div>
          )
        );
      })}
      <div className="cart-summary flex flex-col lg:flex-row gap-10 pt-8">
        <div className="cart-totals flex-1 flex flex-col gap-6">
          <h1 className="text-2xl font-semibold">Cart Totals</h1>
          <div className="flex justify-between text-lg">
            <p>Subtotal</p>
            <p>
              {currency} {getTotalCartAmount().toFixed(2)}
            </p>
          </div>
          <hr className="border-gray-400" />
          <div className="flex justify-between text-lg">
            <p>Shipping Fee</p>
            <p>Free</p>
          </div>
          <hr className="border-gray-400" />
          <div className="flex justify-between font-semibold text-xl">
            <h3>Total</h3>
            <h3>
              {currency} {getTotalCartAmount().toFixed(2)}
            </h3>
          </div>
          <NavLink to="/payment">
          <button className="w-full sm:w-1/2 lg:w-[262px] h-14 bg-red-700 text-white font-semibold text-lg rounded-md transition-all hover:bg-red-800">PROCEED TO PAY</button>          
          </NavLink>
        </div>

        <div className="promo-code flex-1">
          <p className="text-lg font-medium text-gray-700">
            If you have a promo code, enter it here:
          </p>
          <div className="flex mt-4">
            <input
              type="text"
              className="flex-grow p-3 border border-gray-400 rounded-l-md text-black focus:outline-none"
              placeholder="Promo code"
            />
            <button className="w-40 h-12 bg-black text-white rounded-r-md font-semibold hover:bg-gray-800">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
