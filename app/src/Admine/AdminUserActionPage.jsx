import {  useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiUser5Line } from "react-icons/ri";
import axios from "axios";

function AdminUserActionPage() {
  const { state } = useLocation();
  const [users, setUsers] = useState(state?.item);
  const navigates = useNavigate();

  const DeleteUser = async (userID,email) => {
    if (!userID) {
      console.log("NOT FOUND");
      return;
    }
    const cartKey = `${email}_cart`;
    if (localStorage.getItem(cartKey)) {
      localStorage.removeItem(cartKey);
    }
      try {
      await axios.delete(`http://localhost:3000/allUsers/${userID}`);
      navigates("/admin");
    } catch (err) {
      console.log(err);
    }
  };

  const toggleBlockUser = async (Id) => {
    if (!Id) {
      console.log("USER ID NOT FOUND");
      return;
    }
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
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <RiUser5Line size={100} />
      <h1>id: {users.id}</h1>
      <p>{users.name}</p>
      <p>{users.email}</p>
      <button
        onClick={() => DeleteUser(users.id,users.email)}
        className="bg-red-600 w-32 h-10 rounded-2xl mt-10"
      >
        remove
      </button>
      <button
        onClick={() => toggleBlockUser(users.id)}
        className={`${
          users.isBlocked ? "bg-green-700" : "bg-blue-700"
        } w-32 h-10 rounded-2xl mt-10 hover:bg-slate-500 active:bg-orange-500`}
      >
        {users.isBlocked ? "Unblock" : "Block"}
      </button>
    </div>
  );
}

export default AdminUserActionPage;
