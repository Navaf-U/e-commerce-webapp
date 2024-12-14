import Loading from "../Components/Loading/Loading";
import { CgProfile } from "react-icons/cg";
import { IoCloseOutline } from "react-icons/io5";
import axiosInstance from "../util/axiosInstance";
import { userData } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosErrorManager from "../util/axiosErrorManage";
import { toast } from "react-toastify";
function AdminUserActionPage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const { loading, setLoading } = useContext(userData);
  const navigate = useNavigate();
  const { ID } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosInstance.get(`/admin/user/${ID}`);
        setUser(data.user);
      } catch (err) {
        toast.error(axiosErrorManager(err));
      }
    };
    fetchUser();
  }, [ID]);

  const blockUser = async (id) => {
    setLoading(true);
    try {
      const res = await axiosInstance.patch(`/admin/user/block/${id}`);
      setUser(res.data.user);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(axiosErrorManager(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axiosInstance.get(`/admin/orders/user/${ID}`);
        setOrders(data.data);
      } catch (err) {
        toast.error(axiosErrorManager(err));
      }
    };
    fetchOrders();
  }, [ID]);

  const handlerForMain = () => {
    navigate("/admin");
  };

  return (
    user && (
      <div className="flex flex-col sm:flex-row justify-center h-screen overflow-hidden">
        <IoCloseOutline
          onClick={handlerForMain}
          className="cursor-pointer bg-[#80808069] rounded-full hover:text-[#BA3131] position fixed left-4 top-2"
          size={40}
        />
        {loading ? (
          <Loading />
        ) : (
          <div className="sm:ps-20 px-4 mt-24 sm:px-0">
            <div className="flex flex-col sm:flex-row sm:gap-28 items-center sm:items-start">
              {user.image ? (
                <img
                  src={user.image}
                  className="h-auto w-48 rounded-md"
                  alt=""
                />
              ) : (
                <CgProfile size={150} />
              )}
              <div className="text-center sm:text-left">
                <p className="text-[28px] sm:text-[36px] font-semibold">
                  {user.name.toUpperCase()}
                </p>
                <p className="text-[18px] sm:text-[23px]">{user.email}</p>
                <p className="text-cyan-700 font-medium">
                  {user.role === "admin" ? "Administrator" : "User"}
                </p>
                <div className="flex gap-5 sm:gap-0">
                  <button
                    onClick={user.isBlocked ? null : () => blockUser(user._id)}
                    className={` bg-[#b30000]
                    w-32 h-10 rounded-2xl sm:mt-10 mt-4 sm:ms-8 hover:bg-[#BF3131] active:bg-[#b30000]`}
                  >
                    {user.isBlocked ? "Blocked" : "Block"}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-10 mt-10">
              <div className="flex flex-col items-center sm:items-start">
                <p className="mb-5 ps-2 font-medium">Username:</p>
                <p className="mb-5 ps-2 font-medium">Email:</p>
                <p className="mb-5 ps-2 font-medium">Role:</p>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  className="ps-2 mb-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#BF3131] h-8 w-[90%]"
                  value={user.name}
                  readOnly
                />
                <input
                  type="text"
                  className="ps-2 mb-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#BF3131] h-8 w-[90%]"
                  value={user.email}
                  readOnly
                />
                <input
                  type="text"
                  className="ps-2 mb-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#BF3131] h-8 w-[90%]"
                  value={user.role === "admin" ? "admin" : "user"}
                  readOnly
                />
              </div>
            </div>
          </div>
        )}
        <div className="mt-10 sm:mt-0 sm:w-[50%] h-screen overflow-scroll">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-center mb-6">Your Orders</h1>
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white shadow-md rounded-lg p-6 mb-4"
                >
                  <h2 className="text-xl font-[700]">Order ID: {order._id}</h2>
                  <p className="text-gray-600">
                    Purchased Date:
                    {/* will convert the date into human readable :) */}
                    {new Date(order.purchasedDate).toLocaleString()}
                  </p>
                  <p className="text-gray-600">
                    Payment Status: {order.paymentStatus}
                  </p>
                  <p className="text-gray-600">
                    Shipping Status: {order.shippingStatus}
                  </p>
                  <h3 className="text-lg font-semibold mt-4">Products:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {order.products.map((product) => (
                      <div key={product.productID._id} className="border p-4 rounded-lg">
                        <h4 className="font-semibold">{product.productID.name}</h4>
                        <p>Quantity: {product.productID.quantity}</p>
                        <p>Price: ₹{product.productID.price}</p>
                      </div>
                    ))}
                  </div>
                  <p className="font-semibold text-lg mt-4">
                    Total Amount: ₹{order.totalAmount}
                  </p>
                    <button onClick={() => navigate(`/admin/order/${user._id}/${order._id}`)} className="bg-red-500 text-white px-6 py-2 mt-4 rounded-md hover:bg-red-600 transition duration-300">Update</button>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No orders found.</div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default AdminUserActionPage;
