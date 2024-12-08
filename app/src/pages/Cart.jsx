import { useContext} from "react";
import { RxCross1 } from "react-icons/rx";
import { ProductsData } from "../context/ProductsCont";
import { NavLink } from "react-router-dom";
import { userData } from "../context/UserContext";

const Cart = () => {

  const { currency } = useContext(ProductsData);
  const { cart, removeFromCart , updateCart } = useContext(userData);  
  const cartLength = cart ? cart.length : 0;
const increaseQuantity = (productID,quantity) => {
  updateCart(productID,quantity+1)
  
}
const decreaseQuantity = (productID,quantity) => {
  updateCart(productID,quantity-1)
  
}
  
  return (
    <div className="cart-items mx-auto my-8 max-w-screen-lg p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Your Cart</h2>
      {!cart ||cartLength === 0 ? (
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
    
      {cart?.map((item,index) => {
        return (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center py-4 px-4 bg-gray-50 rounded-lg shadow-md mb-4"
            >
             <NavLink to={`/products/${item.productID._id}`}>
             <img
                src={item.productID.image}
                className="w-24 h-24 object-cover rounded-md sm:mr-4 mb-2 sm:mb-0"
                alt="image.."
              />
             </NavLink>
              <p className="flex-1 text-center mb-2 sm:mb-0">{item.productID.name}</p>
              <p className="flex-1 text-center mb-2 sm:mb-0">
                {currency}
                {item.productID.price}
              </p>
              <div className="flex">
              <button
                className="text-[30px] bg-[#BF3131] hover:bg-[#800000] text-white w-[30%] active:bg-black"
                onClick={() => decreaseQuantity(item.productID._id , item.quantity)}
              >
                -
              </button>
              <button className="bg-red-800 h-12 text-white flex items-center justify-center w-24 mb-2 sm:mb-0">
                {item.quantity}
                </button>
              <button
                className="text-[22px] bg-[#BF3131] hover:bg-[#800000] text-white w-[30%] active:bg-black"
                onClick={() => increaseQuantity(item.productID._id , item.quantity)}
              >
                +
              </button>
              </div>
              <p className="flex-1 text-center mb-2 sm:mb-0">
                {currency} {item.productID.price * item.quantity}
              </p>
              <button
                onClick={() => removeFromCart(item.productID._id)}
                className="ml-4 mb-2 sm:mb-0"
              >
                <RxCross1
                  size={28}
                  className="text-red-600 hover:text-red-800 transition-colors duration-200 me-4"
                />
              </button>
            </div>
          )
      })}
      {/* <div clasy */}
    </div>
  );
};

export default Cart;
