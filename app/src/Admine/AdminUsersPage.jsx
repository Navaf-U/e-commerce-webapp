import { useContext, useEffect, useState } from "react";
import { userData } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const { currUser } = useContext(userData);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get("http://localhost:3000/allUsers");
      setUsers(data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const func = () => {
      if (!currUser) {
        toast.error("Admin, please login");
      }
    };
    func();
  }, [currUser]);

  return (
    <>
      {!currUser ? (
        <div className="text-center text-red-600 mt-10">
          <h1>Please log in as admin to view users</h1>
        </div>
      ) : (
        <div className="h-[100vh] overflow-scroll mt-1">
          <table className="min-w-full text-center table-auto">
            <thead>
              <tr className="bg-[#BF3131] text-white">
                <th className="p-2 text-xs md:text-sm">ID</th>
                <th className="p-2 text-xs md:text-sm">NAME</th>
                <th className="p-2 text-xs md:text-sm">EMAIL</th>
                <th className="p-2 text-xs md:text-sm">VIEW</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 font-semibold text-xs md:text-sm">
                    {item.id}
                  </td>
                  <td className="py-2 text-xs md:text-sm">{item.name}</td>
                  <td className="py-2 text-xs md:text-sm">{item.email}</td>
                  <td className="py-2">
                    <button
                      onClick={() =>
                        navigate(`/adminUsers/${item.id}`, { state: { item } })
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded text-xs md:text-sm"
                    >
                      Action
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default AdminUsersPage;
