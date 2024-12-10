import Loading from "../Components/Loading/Loading";
import { useContext, useState } from "react";
import { userData } from "../context/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { ProductsData } from "../context/ProductsCont";
import axiosErrorManager from "../util/axiosErrorManage";
import axiosInstance from "../util/axiosInstance";

function Payment() {
  const { cart, setCart, loading, setLoading } = useContext(userData);
  const [paymentOption, setPaymentOption] = useState(null);
  const navigator = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: {
      city: "",
      state: "",
      zip: "",
    },
  });
  const handlePosting = async (e) => {
    e.preventDefault();
    if (!paymentOption) {
      return toast.error("Please select a payment option.");
    }
    await postingOrder();
  };
  //posting order
  const postingOrder = async () => {
    if (cart.length === 0) {
      return toast.error("Cart is empty");
    }
    setLoading(true);
    const products = cart.map((item) => ({
      productID: item.productID._id,
      quantity: item.quantity,
    }));
    const totalAmount = cart.reduce(
      (acc, item) => acc + item.productID.price * item.quantity,
      0
    );

    const orderedData = {
      products,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      address: user.address,
      totalAmount,
    };
    try {
      const api = paymentOption === "CARD" ? "user/orders/stripe/checkout" : "user/orders/cod";
      const res = await axiosInstance.post(api, orderedData);
      if (paymentOption === "CARD") {
        window.location.href = res.data.stripeUrl; // redirect to Stripe
      } else {
        toast.success(res.data.message);
        setCart([]);
        navigator("/orders");
      }
    } catch (error) {
      toast.error(axiosErrorManager(error));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex justify-center py-10">
      <div className="payment-page max-w-md sm:max-w-full p-6 rounded-lg shadow-lg border border-gray-300 bg-white">
        <h1 className="text-2xl font-semibold text-center">Order Options</h1>
        <hr className="border-gray-300 my-3" />
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setPaymentOption("COD")}
            className={`px-6 py-3 ${
              paymentOption === "COD"
                ? "bg-gray-300 border-[1px] border-[black]"
                : "bg-white border-gray-300"
            } text-black font-semibold border rounded-lg shadow-md hover:bg-gray-200 hover:shadow-lg transition duration-300`}
          >
            Cash On Delivery
          </button>
          <button
            onClick={() => setPaymentOption("CARD")}
            className={`px-6 py-3 ${
              paymentOption === "CARD"
                ? "bg-blue-600 text-white border-[1px] border-[black]"
                : "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
            } font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg transition duration-300`}
          >
            Online
          </button>
        </div>

        <div className="payment-section grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"></div>
        <form className="flex flex-col mt-6" onSubmit={handlePosting}>
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
            placeholder="Mobile Number"
            onChange={(e) => setUser({ ...user, mobile: e.target.value })}
            className="my-2 rounded-lg bg-gray-200 h-12 ps-4 border border-gray-400 outline-none text-gray-700"
          />
          <div>
            <input
              type="text"
              required
              placeholder="City"
              onChange={(e) =>
                setUser((prevUser) => ({
                  ...prevUser,
                  address: { ...prevUser.address, city: e.target.value },
                }))
              }
              className="my-2 rounded-lg bg-gray-200 h-12 ps-4 border border-gray-400 outline-none text-gray-700"
            />
            <input
              type="text"
              required
              placeholder="State"
              onChange={(e) =>
                setUser((prevUser) => ({
                  ...prevUser,
                  address: { ...prevUser.address, state: e.target.value },
                }))
              }
              className="my-2 rounded-lg bg-gray-200 h-12 ps-4 border border-gray-400 outline-none text-gray-700"
            />
            <input
              type="text"
              required
              placeholder="Zip"
              onChange={(e) =>
                setUser((prevUser) => ({
                  ...prevUser,
                  address: { ...prevUser.address, zip: e.target.value },
                }))
              }
              className="my-2 rounded-lg bg-gray-200 h-12 ps-4 border border-gray-400 outline-none text-gray-700"
            />
          </div>
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
