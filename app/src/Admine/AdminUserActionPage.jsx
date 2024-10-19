import { useState } from "react";
import { useLocation} from "react-router-dom";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import Loading from "../Components/Loading/Loading";

function AdminUserActionPage() {
  const { state } = useLocation();
  const [users, setUsers,loading,setLoading] = useState(state?.item);
  const toggleBlockUser = async (Id) => {
    if (!Id) return;
    setLoading(true)
    try {
      const { data } = await axios.get(`http://localhost:3000/allUsers/${Id}`);
      const updatedStatus = !data.isBlocked;
      await axios.patch(`http://localhost:3000/allUsers/${Id}`, {
        isBlocked: updatedStatus,
      });
      setUsers((prevUser) => ({
        ...prevUser,
        isBlocked: updatedStatus,
      }));
    } catch (err) {
      console.log(err);
  }finally{
    setLoading(false)
  }  
};

  return (
    <div className="flex justify-center items-center">
    {loading ? <Loading/> : (
      <div className="sm:ps-20 pt-10 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:gap-28 items-center sm:items-start">
        {users.image ? (
          <img src={users.image} className="h-auto w-48 rounded-md" alt="" />
        ) : (
          <CgProfile size={150} />
        )}
        <div className="text-center sm:text-left">
          <p className="text-[28px] sm:text-[36px] font-semibold">
            {users.name.toUpperCase()}
          </p>
          <p className="text-[18px] sm:text-[23px]">{users.email}</p>
          <p className="text-cyan-700 font-medium">
            {users.isAdmin ? "Administrator" : "User"}
          </p>
          <div className="flex gap-5 sm:gap-0">
            <button
              onClick={() => toggleBlockUser(users.id)}
              className={`sm:ms-8 ${
                users.isBlocked ? "bg-green-700" : "bg-blue-700"
              } w-32 h-10 rounded-2xl sm:mt-10 mt-4 sm:ms-8 hover:bg-[#BF3131] active:bg-orange-500`}
            >
              {users.isBlocked ? "Unblock" : "Block"}
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
            value={users.name}
            readOnly
          />
          <input
            type="text"
            className="ps-2 mb-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#BF3131] h-8 w-[90%]"
            value={users.email}
            readOnly
          />
          <input
            type="text"
            className="ps-2 mb-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#BF3131] h-8 w-[90%]"
            value={users.isAdmin ? "admin" : "user"}
            readOnly
          />
        </div>
      </div>

      <div>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-center mb-6">Your Orders</h1>
          {users.orders.length > 0 ? (
            users.orders.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg p-6 mb-4"
              >
                <h2 className="text-xl font-[700]">{item.name}</h2>
                <p className="text-gray-600">{item.address}</p>
                <img src={item.image} alt="" />
                <h3 className="text-lg font-semibold mt-4">Items:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {item.items.map((i) => (
                    <div key={i.id} className="border p-4 rounded-lg">
                      <h4 className="font-semibold">{i.name}</h4>
                      <p>Quantity: {i.quantity}</p>
                      <p>Price: ${i.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No orders found.</div>
          )}
        </div>
      </div>
    </div>
    )}
    </div>
  );
}

export default AdminUserActionPage;
