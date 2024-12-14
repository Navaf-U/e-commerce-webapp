import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../util/axiosInstance";
import axiosErrorManager from "../util/axiosErrorManage";
import { toast } from "react-toastify";
import { IoCloseOutline } from "react-icons/io5";

function AdminOrderStatus() {
  const { orderID, userID } = useParams();
  const [order, setOrder] = useState(null);
  const [shippingStatus, setShippingStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const navigate = useNavigate();



  useEffect(() => {
    const fetchSingleOrder = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/admin/orders/${userID}/${orderID}`
        );
        setOrder(data.data);
      } catch (err) {
        toast.error(axiosErrorManager(err));
      }
    };
    fetchSingleOrder();
  }, [orderID, userID]);
  
  const updateShippingStatus = async () => {
    try {
      const { data } = await axiosInstance.patch(
        `/admin/orders/shipping/${orderID}`,
        {
         status : shippingStatus,
        }
      );
      toast.success(data.message);
      setOrder((prevOrder) => ({
        ...prevOrder,
        shippingStatus,
      }));
    } catch (err) {
      toast.error(axiosErrorManager(err));
    }
  };

  const updatePaymentStatus = async () => {
    try {
      const { data } = await axiosInstance.patch(
        `/admin/orders/payment/${orderID}`,
        {
         status : paymentStatus,
        }
      );
      setOrder((prevOrder) => ({
        ...prevOrder,
        paymentStatus,
      }));
      toast.success(data.message);
    } catch (err) {
      toast.error(axiosErrorManager(err));
    }
  };

  const handlerForMain = () => {
    navigate(`/admin/user/${userID}`);
  };

  return (
    <div className="container mx-auto px-4  h-screen sm:overflow-hidden">
       <IoCloseOutline
          onClick={handlerForMain}
          className="cursor-pointer bg-[#80808069] rounded-full hover:text-[#BA3131] position fixed left-4 top-2"
          size={40}
        />
      <h1 className="text-2xl font-bold text-center mb-6">Order Details</h1>
      {order ? ( 
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-[700] mb-2">Order ID: {order._id}</h2>
          <p className="text-gray-600">
            Purchased Date: {new Date(order.purchasedDate).toLocaleString()}
          </p>
          <p className="text-gray-600">Payment Status: {order.paymentStatus}</p>
          <p className="text-gray-600">Shipping Status: {order.shippingStatus}</p>

          <h3 className="text-lg font-semibold mt-4">Products:</h3>
          <div className="flex flex-col sm:flex-row gap-8 mt-4">
            <div className="sm:w-1/2 w-full space-y-4">
              {order.products.map((product) => (
                <div
                  key={product.productID._id}
                  className="border p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  <img
                    src={product.productID.image}
                    className="w-full sm:w-24 h-24 object-cover rounded"
                    alt={product.productID.name}
                  />
                  <div className="w-full sm:w-auto">
                    <h4 className="font-semibold">{product.productID.name}</h4>
                    <p>Quantity: {product.quantity}</p>
                    <p>Price: ₹{product.productID.price}</p>
                  </div>
                </div>
              ))}
              <p className="font-semibold text-lg mt-4">
                Total Amount: ₹{order.totalAmount}
              </p>
            </div>
            <div className="sm:w-1/2 w-full sm:m-[-10px]">
              <h3 className="text-lg font-semibold">Shipping Address:</h3>
              <p className="text-gray-600"></p>
              <h3 className="text-lg font-semibold mt-4">Update Shipping:</h3>
              <select onChange={(e) => setShippingStatus(e.target.value)} className="w-[150px] bg-yellow-500 text-white hover:bg-yellow-600 mt-2 mb-3 py-2 px-3 rounded">
                <option value={order.shippingStatus}>{order.shippingStatus}</option>
                <option className={`${order.shippingStatus !== "Delivered" ? "flex" : "hidden" }`} value="Delivered">Delivered</option>
                <option className={`${order.shippingStatus !== "Processing" ? "flex" : "hidden" }`} value="Processing">Processing</option>
                <option className={`${order.shippingStatus !== "Cancelled" ? "flex" : "hidden" }`} value="Cancelled">Cancelled</option>
              </select>
              <button onClick={updateShippingStatus} className="bg-blue-500 text-white hover:bg-blue-600 mt-2 w-full py-2 rounded">
                Update
              </button>

              <h3 className="text-lg font-semibold mt-4">Update Payment:</h3>
              <select onChange={(e) => setPaymentStatus(e.target.value)} className="w-[150px] bg-red-500 text-white hover:bg-red-600 mt-2 mb-3 py-2 px-3 rounded">
                <option value={order.paymentStatus}>{order.paymentStatus}</option>
                <option className={`${order.paymentStatus !== "Paid" ? "flex" : "hidden" }`} value="Paid">Paid</option>
                <option className={`${order.paymentStatus !== "Pending" ? "flex" : "hidden" }`} value="Pending">Pending</option>
                <option className={`${order.paymentStatus !== "Cancelled" ? "flex" : "hidden" }`} value="Cancelled">Cancelled</option>
              </select>
              <button onClick={updatePaymentStatus} className="bg-blue-500 text-white hover:bg-blue-600 mt-2 w-full py-2 rounded">
                Update
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">Loading order details...</div>
      )}
    </div>
  );
}

export default AdminOrderStatus;
