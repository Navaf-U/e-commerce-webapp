import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TbUserSquare } from "react-icons/tb";
import axios from "axios";

function AdminUserActionPage() {
  const { state } = useLocation();
  const [users, setUsers] = useState(state?.item);
  const navigate = useNavigate();

  const DeleteUser = async (userID, email) => {
    if (!userID) return;

    const cartKey = `${email}_cart`;
    if (localStorage.getItem(cartKey)) {
      localStorage.removeItem(cartKey);
    }
    try {
      await axios.delete(`http://localhost:3000/allUsers/${userID}`);
      navigate("/admin");
    } catch (err) {
      console.log(err);
    }
  };

  const toggleBlockUser = async (Id) => {
    if (!Id) return;

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
    }
  };

  return (
    <div className="sm:ps-20 pt-10 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:gap-28 items-center sm:items-start">
        <TbUserSquare size={130} />
        <div className="text-center sm:text-left">
          <p className="text-[28px] sm:text-[36px] font-semibold">{(users.name).toUpperCase()}</p>
          <p className="text-[18px] sm:text-[23px]">{users.email}</p>
          <p className="text-cyan-700 font-medium">{users.isAdmin ? "Administrator" : "User"}</p>
          <div className="flex gap-5 sm:gap-0">
            <button
              onClick={() => DeleteUser(users.id, users.email)}
              className="bg-[#BF3131] w-32 h-10 hover:bg-[#800000] active:bg-[#BF3131] hover:text-white rounded-2xl sm:mt-10 mt-4"
            >
              Remove
            </button>
            <button
              onClick={() => toggleBlockUser(users.id)}
              className={`sm:ms-8 ${users.isBlocked ? "bg-green-700" : "bg-blue-700"} w-32 h-10 rounded-2xl sm:mt-10 mt-4 sm:ms-8 hover:bg-[#BF3131] active:bg-orange-500`}
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
    </div>
  );
}

export default AdminUserActionPage;
