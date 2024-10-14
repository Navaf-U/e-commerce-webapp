import { useContext, useState } from "react";
import MasterCard from "../Components/assets/MasterCard.png";
import PayPal from "../Components/assets/PayPal.png";
import RazorPay from "../Components/assets/RazorPay.png";
import { userData } from "../context/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ProductsData } from "../context/ProductsCont";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const { cart, currUser,setCart} = useContext(userData);
  const {products} = useContext(ProductsData);
  const navigator = useNavigate();

  const paymentMethodsSelection = (method) => {
    setPaymentMethod(method);
  };

  const emptyCart = ()=>{
    const empty = {}

    setCart(empty)
    toast.success("Payment successful! Cart has been cleared.");
  }

  const cartItems = Object.keys(cart).map((productId) => {
    const product = products.find((item) => item.id === productId);
    const quantity = cart[productId];
    return product ? { ...product, quantity } : null;
  }).filter(item => item !== null);

  
  const cartEntries = cartItems.map((item) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    price: item.price
  }));
  
  

  const totalAmount = cartEntries.reduce(
    (sum, item) => sum + (item.price * item.quantity || 0),
    0
  );
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  const HandleEvent = async (e) => {
    e.preventDefault();
  
    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    if (user.firstName && user.lastName && user.email && user.address) {
      const OrderedItems = {
        id: `order ${Math.floor(Math.random() * 10000)}`,
        name: `${user.firstName} ${user.lastName}`,
        address: user.address,
        items: cartEntries.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount,
      };

  
      if (!currUser.orders) {
        currUser.orders = [];
      }
      currUser.orders.push(OrderedItems);
  
      try {
        await axios.patch(`http://localhost:3000/allUsers/${currUser.id}`, {
          orders: currUser.orders,
          cart:{}
        });
        localStorage.removeItem("cart")
        toast.success("Order Successful");
        emptyCart()
        navigator("/cart");
      } catch (error) {
        console.log("Failed to update orders:", error);
        toast.error("Failed to save your order. Please try again.");
      }
    } else {
      toast.error("User information is incomplete");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="payment-page mt-16 pt-5 px-3 rounded-2xl border-[1px] border-[#bf313136] max-w-lg w-full">
        <h1 className="text-[20px] font-[600]">How would you like to pay</h1>
        <hr className="border-[1px] border-[#bf313173] mt-2 w-60" />
        <div className="payment-section flex flex-wrap gap-4 mt-10 px-5 pb-5 sm:px-0 sm:gap-1">
          <button
            onClick={() => paymentMethodsSelection("COD")}
            className={`w-full sm:w-60 h-24 focus:outline-8 focus:border-[2px] focus:border-[#BF3131] rounded-2xl ${
              paymentMethod === "COD" ? "border-[#BF3131] border-2" : ""
            }`}
          >
            <h1 className="text-[40px] font-[900] font-sans">C O D</h1>
            cash on delivery
          </button>
          <button
            onClick={() => paymentMethodsSelection("MasterCard")}
            className={`flex justify-center items-center w-full sm:w-60 h-24 focus:outline-8 focus:border-[2px] focus:border-[#BF3131] rounded-2xl ${
              paymentMethod === "MasterCard" ? "border-[#BF3131] border-2" : ""
            }`}
          >
            <img src={MasterCard} className="w-48 h-36" alt="" />
          </button>
          <button
            onClick={() => paymentMethodsSelection("PayPal")}
            className={`flex justify-center items-center w-full sm:w-60 h-24 focus:outline-8 focus:border-[2px] focus:border-[#BF3131] rounded-2xl ${
              paymentMethod === "PayPal" ? "border-[#BF3131] border-2" : ""
            }`}
          >
            <img src={PayPal} className="w-48 h-32" alt="" />
          </button>
          <button
            onClick={() => paymentMethodsSelection("RazorPay")}
            className={`flex justify-center items-center w-full sm:w-60 h-24 focus:outline-8 focus:border-[2px] focus:border-[#BF3131] rounded-2xl ${
              paymentMethod === "RazorPay" ? "border-[#BF3131] border-2" : ""
            }`}
          >
            <img src={RazorPay} className="w-48 h-36" alt="" />
          </button>
        </div>
        <form className="flex flex-col" onSubmit={HandleEvent}>
          <input
            type="text"
            required
            placeholder="First Name"
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            className="my-2 rounded-2xl bg-gray-200 h-14 md:h-16 w-full ps-5 border-gray-500 outline-none text-[#5c5c5c] text-base"
          />
          <input
            type="text"
            required
            placeholder="Last Name"
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            className="my-2 rounded-2xl bg-gray-200 h-14 md:h-16 w-full ps-5 border-gray-500 outline-none text-[#5c5c5c] text-base"
          />
          <input
            type="email"
            required
            placeholder="Email Address"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="my-2 rounded-2xl bg-gray-200 h-14 md:h-16 w-full ps-5 border-gray-500 outline-none text-[#5c5c5c] text-base"
          />
          <input
            type="text"
            required
            placeholder="Address"
            onChange={(e) => setUser({ ...user, address: e.target.value })}
            className="my-2 rounded-2xl bg-gray-200 h-14 md:h-16 w-full ps-5 border-gray-500 outline-none text-[#5c5c5c] text-base"
          />
          <input
            type="number"
            placeholder="Card Number"
            disabled={paymentMethod == null || paymentMethod === "COD"}
            className={`my-2 rounded-2xl bg-[#000000] h-14 md:h-16 w-full ps-5 border-gray-500 outline-none text-[#fff] text-base`}
          />
          <div className="flex justify-between gap-2">
            <input
              placeholder="Expiration Date"
              disabled={paymentMethod == null || paymentMethod === "COD"}
              className={`my-2 rounded-2xl bg-[#000000] h-14 md:h-20 w-[32%] ps-5 border-gray-500 outline-none text-[#fff] text-base`}
            />
            <input
              placeholder="CVC"
              disabled={!paymentMethod || paymentMethod === "COD"}
              className={`my-2 rounded-2xl bg-[#000000] h-14 md:h-20 w-[32%] ps-5 border-gray-500 outline-none text-[#fff] text-base`}
            />
            <input
              placeholder="ZIP"
              disabled={paymentMethod == null || paymentMethod === "COD"}
              className={`my-2 rounded-2xl bg-[#000000] h-14 md:h-20 w-[32%] ps-5 border-gray-500 outline-none text-[#fff] text-base`}
            />
          </div>
          <button
            type="submit"
            className="mt-4 rounded-2xl bg-[#BF3131] h-12 text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
