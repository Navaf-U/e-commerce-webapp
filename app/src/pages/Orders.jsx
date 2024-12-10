/* eslint-disable react-hooks/exhaustive-deps */
import Loading from "../Components/Loading/Loading";
import { SiTicktick } from "react-icons/si";
import { MdOutlinePending } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { userData } from "../context/UserContext";
import axiosInstance from "../util/axiosInstance";
import { ProductsData } from "../context/ProductsCont";

function Orders() {
  const { currUser, loading } = useContext(userData);
  const { currency } = useContext(ProductsData);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axiosInstance.get("user/orders");
        setOrders(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrder();
  }, []);
  if (loading) {
    return <Loading />;
  }
  if (!currUser || !orders) {
    return <div className="text-center mt-5">Loading user data...</div>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Your Orders</h1>
      {orders.length > 0 ? (
        orders.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-lg p-6 mb-4"
          >
            <div>
              <h2 className="text-lg font-semibold">
                Order Status: {item.shippingStatus}
              </h2>
              {item.shippingStatus === "Processing" && (
                <div className="flex gap-1">
                  <p className="text-red-600 font-semibold">Order is pending</p>
                  <MdOutlinePending size={20} className="text-red-600 mt-[3px]" />
                </div>
              )}
            </div>
            {item.shippingStatus === "Delivered" && (
              <div className="flex gap-1">
                <p className="text-green-600 font-semibold">
                  Order is delivered
                </p>
                <SiTicktick size={15} className="text-green-600 mt-[4px]" />
              </div> 
            )}
            <h2 className="text-xl font-[700]">Order ID: {item._id}</h2>
            <h2 className="">name: {item.firstName + " " + item.lastName}</h2>
            <h2 className="">email: {item.email}</h2>
            <h2 className="">mobile: {item.mobile}</h2>
            <p className="text-gray-600">
              {item.address.city}, {item.address.state}, {item.address.zip}
            </p>
            <h5 className="text-gray-600 text-xl font-medium">
              Total : <span className="text-[black]">{currency}</span>
              <span className="text-[red]">{item.totalAmount}</span>
            </h5>
            <h3 className="text-lg font-semibold mt-4">Items:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {item.products.map((i) => (
                <div
                  key={i.productID._id}
                  className="border p-4 rounded-lg flex justify-around"
                >
                  <div>
                    <h4 className="font-semibold">{i.productID.name}</h4>
                    <p>Quantity: {i.quantity}</p>
                    <p>Price: ${i.productID.price}</p>
                  </div>
                  <div>
                    <p>
                      <img
                        src={i.productID.image}
                        width={140}
                        alt="image of product"
                      />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No orders found.</div>
      )}
    </div>
  );
}

export default Orders;
