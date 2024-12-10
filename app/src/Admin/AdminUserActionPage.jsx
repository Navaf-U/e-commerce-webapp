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
  const handlerForMain = () => {
    navigate("/admin");
  };

  return (
    user && (
      <div className="flex justify-center items-center">
        <IoCloseOutline
          onClick={handlerForMain}
          className="cursor-pointer bg-[#80808069] rounded-full hover:text-[#BA3131] position fixed left-4 top-2"
          size={40}
        />
        {loading ? (
          <Loading />
        ) : (
          <div className="sm:ps-20 pt-10 px-4 sm:px-0">
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
      </div>
    )
  );
}

{
  /* <div>
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold text-center mb-6">
                      Your Orders
                    </h1>
                    {user.length > 0 ? (
                      user.orders.map((item) => (
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
                      <div className="text-center text-gray-500">
                        No orders found.
                      </div>
                    )}
                  </div>
                </div> */
}
export default AdminUserActionPage;
