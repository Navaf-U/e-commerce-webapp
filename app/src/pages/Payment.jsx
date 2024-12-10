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
  const handlePosting = (e) => {
    e.preventDefault();
    postingOrder();
  };
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
      const res = await axiosInstance.post("user/orders/cod", orderedData);
      toast.success(res.data.message);
      setCart([]);
      navigator("/orders");
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
      <div className="payment-page max-w-md w-full p-6 rounded-lg shadow-lg border border-gray-300 bg-white">
        <h1 className="text-2xl font-semibold text-center">Order Options</h1>
        <hr className="border-gray-300 my-3" />
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
