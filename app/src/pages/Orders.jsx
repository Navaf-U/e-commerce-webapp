/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { userData } from "../context/UserContext";
import axios from "axios";
import Loading from "../Components/Loading/Loading";

function Orders() {
  const { currUser, setLoading, setCurrUser,loading } = useContext(userData);
  const [, setUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:3000/allUsers");
        setUsers(data);
        const currentUser = data.find((user) => user.id === currUser.id);
        if (currentUser) {
          setCurrUser((prev) => ({ ...prev, orders: currentUser.orders }));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (currUser) {
      fetchData();
    }
  }, [setLoading, setCurrUser]);
  if (loading) {
    return <Loading />;
  }
  if (!currUser || !currUser.orders) {
    return <div className="text-center mt-5">Loading user data...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Your Orders</h1>
      {currUser.orders.length > 0 ? (
        currUser.orders.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h2 className="text-xl font-[700]">{item.name}</h2>
            <p className="text-gray-600">{item.address}</p>
            <h3 className="text-lg font-semibold mt-4">Items:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {item.items.map((i) => (
                <div key={i.id} className="border p-4 rounded-lg">
                  <h4 className="font-semibold">{i.name}</h4>
                  <p>Quantity: {i.quantity}</p>
                  <p>Price: ${i.price}</p>
                  <p><img src={i.image} alt="" /></p>
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
