import { useContext, useEffect, useState } from "react";
import axiosErrorManager from "../util/axiosErrorManage";
import { toast } from "react-toastify";
import axiosInstance from "../util/axiosInstance";
import { userData } from "../context/UserContext";
import Loading from "../Components/Loading/Loading";

function AdminDeletedItems() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const { loading, setLoading } = useContext(userData);
  // fetching blocked users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get("/admin/users");

        const blockedUser = data.users.filter(
          (item) => item.isBlocked === true
        );
        setUsers(blockedUser);
      } catch (err) {
        toast.error(axiosErrorManager(err));
      }
    };
    fetchData();
  }, []);

  const unblockUser = async (id) => {
    setLoading(true);
    try {
      const res = await axiosInstance.patch(`/admin/user/unblock/${id}`);
      // will remove the unblocked users by checking id
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      toast.success(res.data.message);
    } catch (err) {
      toast.error(axiosErrorManager(err));
    } finally {
      setLoading(false);
    }
  };

  // fetching deleted products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get("/admin/products");
        const blockedUser = data.data.filter((item) => item.isDeleted === true);
        setProducts(blockedUser);
      } catch (err) {
        toast.error(axiosErrorManager(err));
      }
    };
    fetchData();
  }, []);

  const restoreProducts = async (id) => {
    setLoading(true);
    try {
      const res = await axiosInstance.patch(`/admin/product/restore/${id}`);
      // will remove the unblocked users by checking id
      setProducts((prevUsers) => prevUsers.filter((user) => user._id !== id));
      toast.success(res.data.message);
    } catch (err) {
      toast.error(axiosErrorManager(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {loading ? (
        <div className="flex items-center justify-center flex-grow">
          <Loading />
        </div>
      ) : (
        <>
          <div className="flex-grow overflow-y-auto p-6 space-y-8">
            {/* this is blocked users section :> */}
            <section className="bg-[#14141ed9] rounded-md shadow-sm p-6">
              <h2 className="text-xl font-bold text-white border-b pb-2 mb-4">
                Blocked Users
              </h2>
              <div className="grid gap-6">
                {users.length > 0 ? (
                  users.map((item) => (
                    <div
                      key={item._id}
                      className="p-4 border rounded-lg flex justify-between items-center hover:bg-[#1f1f2b]"
                    >
                      <div>
                        <h3 className="text-md font-semibold text-white">
                          {item.name}
                        </h3>
                        <p className="text-sm text-white">{item.email}</p>
                      </div>
                      <button
                        onClick={() => unblockUser(item._id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-500 focus:ring-2 focus:ring-green-400"
                      >
                        Unblock
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-white text-center py-8">
                    No blocked users found.
                  </div>
                )}
              </div>
            </section>

            {/* this is deleted products section :> */}
            <section className="bg-[#14141ed9] rounded-md shadow-sm p-6">
              <h2 className="text-xl font-bold text-white border-b pb-2 mb-4">
                Deleted Products
              </h2>
              <div className="grid gap-6">
                {products.length > 0 ? (
                  products.map((item) => (
                    <div
                      key={item._id}
                      className="p-4 border rounded-lg flex justify-between items-center hover:bg-[#1f1f2b]"
                    >
                      <div>
                        <h3 className="text-md font-semibold text-white">
                          {item.name}
                        </h3>
                        <p className="text-sm text-white">
                          {item.description || "No description available."}
                        </p>
                      </div>
                      <button
                        onClick={() => restoreProducts(item._id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-500 focus:ring-2 focus:ring-blue-400"
                      >
                        Restore
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-white text-center py-8">
                    No deleted products found.
                  </div>
                )}
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDeletedItems;
