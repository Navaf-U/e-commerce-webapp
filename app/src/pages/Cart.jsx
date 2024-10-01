import { useContext } from "react";
import { RxCross1 } from "react-icons/rx";
import { ProductsData } from "../context/ProductsCont";

const Cart = () => {
  const { cart, products, currency, removeFromCart } = useContext(ProductsData);

  return (
    <div className="cart-items px-2 sm:px-4 md:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-center my-4">Your Cart</h2>
      <hr className="border-b border-[#7D0A0A] mb-4" />
      {products.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        products.map((item) => {
          const quantity = cart[item.id];
          return (
            quantity > 0 && (
              <div key={item.id} className="flex flex-col sm:flex-row items-center py-4 px-2 sm:px-4 bg-gray-50 rounded-lg shadow-md mb-4">
                <img src={item.image} className="w-20 h-20 object-cover rounded-md sm:mr-4" alt={item.name} />
                <p className="flex-grow text-center text-lg">{item.name}</p>
                <button className="bg-red-800 w-24 h-8 text-white rounded-full flex items-center justify-center">
                  <p className="text-sm">Quantity: {quantity}</p>
                </button>
                <p className="ml-4 text-lg">
                  Price: {currency} {item.price * quantity}
                </p>
                <button onClick={() => removeFromCart(item.id)} className="ml-4">
                  <RxCross1 size={28} className="text-red-600 hover:text-red-800 transition-colors duration-200" />
                </button>
              </div>
            )
          );
        })
      )}
      <hr className="border-b border-[#7D0A0A] mt-4" />
    </div>
  );
};

export default Cart;
