import "./AdminStyle.css";
import Swal from "sweetalert2";
import AdminProducts from "./AdminProducts";
import AdminUsersPage from "./AdminUsersPage";
import AdminDashboard from "./AdminDashboard";
import AdminDeletedItems from "./AdminDeletedItems";
import { MdOutlineDashboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { useContext, useState } from "react";
import { userData } from "../context/UserContext";
import { NavLink } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";
import { MdAutoDelete } from "react-icons/md";
function AdminMainPage() {
  const { logoutUser, isAdmin } = useContext(userData);
  const [adminOption, setAdminOption] = useState("dashboard");
  const handleSwitch = () => {
    switch (adminOption) {
      case "dashboard":
        return <AdminDashboard />;
      case "products":
        return <AdminProducts />;
      case "users":
        return <AdminUsersPage />;
      case "deleted":
        return <AdminDeletedItems />;
      default:
        return <AdminProducts />;
    }
  };

  const popupHandler = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#BF3131",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser();
      }
    });
  };
  // addedLogoSmallerVersion

  return (
    <div className="w-full h-screen overflow-x-auto">
      {!isAdmin ? (
        "Cant Access the Page"
      ) : (
        <div className="flex flex-col md:flex-row gap-5">
          <div className="Adminlayout flex items-center h-screen pt-5 md:w-[10%] w-full text-white flex-col gap-5">
            <hr className="border-[#80808066] w-full" />
            <div className="flex flex-col justify-center items-center">
              <hr className="border-[#80808066] w-full mt-5 mb-5" />
              <div className="flex flex-col text-[14px] md:text-[16px] w-full font-[700] items-center">
                <div
                  onClick={() => setAdminOption("dashboard")}
                  className="AdminDashboard flex justify-center gap-1 items-center flex-row hover:bg-[#BF3131] pe-5 w-full h-12 md:h-16 rounded-md"
                >
                  <button className="ms-6 flex justify-center">
                    <MdOutlineDashboard size={30} />
                  </button>
                </div>
                <div
                  onClick={() => setAdminOption("users")}
                  className="AdminUsers flex justify-center items-center flex-row gap-2 hover:bg-[#BF3131] h-12 md:h-16 w-full rounded-md"
                >
                  <button className="ms-2">
                    {" "}
                    <FiUsers size={27} />
                  </button>
                </div>
                <div
                  onClick={() => setAdminOption("products")}
                  className="AdminProducts flex justify-center  items-center flex-row gap-2 hover:bg-[#BF3131]  w-full h-12 md:h-16 rounded-md"
                >
                  <button className="ms-1">
                    <MdOutlineProductionQuantityLimits size={30} />
                  </button>
                </div>
                <div
                  onClick={() => setAdminOption("deleted")}
                  className="AdminProducts flex justify-center  items-center flex-row gap-2 hover:bg-[#BF3131]  w-full h-12 md:h-16 rounded-md"
                >
                  <button className="ms-1">
                    <MdAutoDelete size={30} />
                  </button>
                </div>
                <div
                  onClick={popupHandler}
                  className="AdminLogout flex justify-center items-center flex-row gap-2 hover:bg-[#BF3232] w-full h-12 md:h-16 rounded-md"
                >
                  <button>
                    <BiLogOutCircle size={30} />
                  </button>
                </div>
                <div className="mt-7">
                  <NavLink to="/">
                    <button>
                      <TiArrowBackOutline
                        className="hover:text-[#BA3131] rounded-full"
                        size={27}
                      />
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[100%]">{handleSwitch()}</div>
        </div>
      )}
    </div>
  );
}

export default AdminMainPage;
