import Loading from "../Components/Loading/Loading";
import MasterCard from "../Components/assets/MasterCard.png";
import PayPal from "../Components/assets/PayPal.png";
import RazorPay from "../Components/assets/RazorPay.png";
import axios from "axios";
import { useContext, useState } from "react";
import { userData } from "../context/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ProductsData } from "../context/ProductsCont";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const { cart, currUser, setCart,loading,setLoading } = useContext(userData);
  const { products } = useContext(ProductsData);
  const navigator = useNavigate();

  const paymentMethodsSelection = (method) => {
    setPaymentMethod(method);
  };

  const emptyCart = () => {
    setCart({});
    localStorage.removeItem("cart")
    toast.success("Payment successful! Cart has been cleared.");
  };

  const cartItems = Object.keys(cart)
    .map((productId) => {
      const product = products.find((item) => item.id === productId);
      const quantity = cart[productId];
      return product ? { ...product, quantity } : null;
    })
    .filter((item) => item !== null);

  const cartEntries = cartItems.map((item) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    image:item.image
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
    setLoading(true)
    e.preventDefault();

    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      setLoading(false);
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
          image:item.image
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
        localStorage.setItem('currUser', JSON.stringify(currUser));
        toast.success("Order Successful");
        emptyCart();
        navigator("/orders");
      } catch (error) {
        console.log("Failed to update orders:", error);
        toast.error("Failed to save your order. Please try again.");
      }finally{
        setLoading(false)
      }
    } else {
      toast.error("User information is incomplete");
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    
    <div className="flex justify-center py-10">
      <div className="payment-page max-w-md w-full p-6 rounded-lg shadow-lg border border-gray-300 bg-white">
        <h1 className="text-2xl font-semibold text-center">Payment Options</h1>
        <hr className="border-gray-300 my-3" />
        <div className="payment-section grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <button
            onClick={() => paymentMethodsSelection("COD")}
            className={`flex flex-col items-center justify-center h-24 rounded-lg border-2 transition-all duration-300 ${
              paymentMethod === "COD"
                ? "border-red-600 bg-red-50"
                : "border-gray-300"
            } p-4`}
          >
            <h2 className="text-3xl font-bold">C O D</h2>
            <p className="text-sm text-center">Cash on Delivery</p>
          </button>
          <button
            onClick={() => paymentMethodsSelection("MasterCard")}
            className={`flex items-center justify-center h-24 rounded-lg border-2 transition-all duration-300 ${
              paymentMethod === "MasterCard"
                ? "border-red-600 bg-red-50"
                : "border-gray-300"
            } p-4`}
          >
            <img src={MasterCard} className="h-16" alt="MasterCard" />
          </button>
          <button
            onClick={() => paymentMethodsSelection("PayPal")}
            className={`flex items-center justify-center h-24 rounded-lg border-2 transition-all duration-300 ${
              paymentMethod === "PayPal"
                ? "border-red-600 bg-red-50"
                : "border-gray-300"
            } p-4`}
          >
            <img src={PayPal} className="h-16" alt="PayPal" />
          </button>
          <button
            onClick={() => paymentMethodsSelection("RazorPay")}
            className={`flex items-center justify-center h-24 rounded-lg border-2 transition-all duration-300 ${
              paymentMethod === "RazorPay"
                ? "border-red-600 bg-red-50"
                : "border-gray-300"
            } p-4`}
          >
            <img src={RazorPay} className="h-16" alt="RazorPay" />
          </button>
        </div>
        <form className="flex flex-col mt-6" onSubmit={HandleEvent}>
          <input
            type="text"
            required
            placeholder="First Name"
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            className="my-2 rounded-lg bg-gray-200 h-12 ps-4 border border-gray-400 outline-none text-gray-700"
          />
          <input
            type="text"
            required
            placeholder="Last Name"
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            className="my-2 rounded-lg bg-gray-200 h-12 ps-4 border border-gray-400 outline-none text-gray-700"
          />
          <input
            type="email"
            required
            placeholder="Email Address"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="my-2 rounded-lg bg-gray-200 h-12 ps-4 border border-gray-400 outline-none text-gray-700"
          />
          <input
            type="text"
            required
            placeholder="Address"
            onChange={(e) => setUser({ ...user, address: e.target.value })}
            className="my-2 rounded-lg bg-gray-200 h-12 ps-4 border border-gray-400 outline-none text-gray-700"
          />
          <input
            type="number"
            placeholder="Card Number"
            disabled={paymentMethod == null || paymentMethod === "COD"}
            className={`my-2 rounded-lg bg-black h-12 ps-4 border border-gray-400 outline-none text-white ${
              paymentMethod == null || paymentMethod === "COD"
                ? "opacity-50"
                : ""
            }`}
          />
          <div className="flex justify-between gap-2">
            <input
              placeholder="Expiration Date"
              disabled={paymentMethod == null || paymentMethod === "COD"}
              className={`my-2 rounded-lg bg-black h-12 ps-4 border border-gray-400 outline-none text-white ${
                paymentMethod == null || paymentMethod === "COD"
                  ? "opacity-50"
                  : ""
              }`}
            />
            <input
              placeholder="CVC"
              disabled={!paymentMethod || paymentMethod === "COD"}
              className={`my-2 rounded-lg bg-black h-12 ps-4 border border-gray-400 outline-none text-white ${
                !paymentMethod || paymentMethod === "COD" ? "opacity-50" : ""
              }`}
            />
          </div>
          <input
            placeholder="ZIP"
            disabled={paymentMethod == null || paymentMethod === "COD"}
            className={`my-2 rounded-lg bg-black h-12 ps-4 border border-gray-400 outline-none text-white ${
              paymentMethod == null || paymentMethod === "COD"
                ? "opacity-50"
                : ""
            }`}
          />
          <button
            type="submit"
            className="mt-4 rounded-lg bg-red-600 h-12 text-white font-semibold hover:bg-red-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
