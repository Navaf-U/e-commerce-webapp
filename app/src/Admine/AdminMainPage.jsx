import "./AdmineStyle.css";
import AdminePhoto from "../Components/assets/AdminePhoto.png";
import { MdOutlineDashboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { useContext, useState } from "react";
import { userData } from "../context/UserContext";
import AdminProducts from "./AdminProducts";
import AdminUsersPage from "./AdminUsersPage";
import AdminDashboard from "./AdminDashboard";
import { NavLink } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";

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
      default:
        return <AdminProducts />;
    }
  };

  return (
    <div className="w-full  overflow-x-auto">
      {!isAdmin ? (
        "Cant Access the Page"
      ) : (
        <div className="flex flex-col md:flex-row gap-5 h-auto">
          <div className="Adminlayout flex pt-5 md:w-[18%] w-full text-white flex-col gap-5">
            <h1 className="text-[24px] md:text-[30px] font-[500] ms-3">
              Step Prime
            </h1>
            <hr className="border-[#80808066] w-full" />
            <div className="flex flex-col justify-center items-center">
              <img
                src={AdminePhoto}
                className="ms-3 w-[50%] md:w-[35%]"
                alt=""
              />
              <hr className="border-[#80808066] w-full mt-5 mb-5" />
              <div className="flex flex-col text-[14px] md:text-[16px] w-full font-[700] items-center">
                <div className="AdminDashboard flex justify-start ps-16 gap-1 items-center flex-row hover:bg-[#BF3131] pe-5 w-full h-12 md:h-16 rounded-md">
                  <MdOutlineDashboard size={22} className="mt-1" />
                  <button className="ms-1" onClick={() => setAdminOption("dashboard")}>
                    Dashboard
                  </button>
                </div>
                <div className="AdminUsers flex justify-start ps-16 items-center flex-row gap-2 hover:bg-[#BF3131] h-12 md:h-16 w-full rounded-md">
                  <FiUsers />
                  <button className="ms-2" onClick={() => setAdminOption("users")}> Users</button>
                </div>
                <div className="AdminProducts flex justify-start ps-16 items-center flex-row gap-2 hover:bg-[#BF3131] pe-5 w-full h-12 md:h-16 rounded-md">
                  <MdOutlineProductionQuantityLimits />
                  <button onClick={() => setAdminOption("products")}>
                    Products
                  </button>
                </div>
                <div
                  onClick={logoutUser}
                  className="AdminLogout flex justify-start ps-16 items-center flex-row gap-2 hover:bg-[#BF3232] w-full h-12 md:h-16 rounded-md"
                >
                  <BiLogOutCircle />
                  <button>Logout</button>
                </div>
                <div className="mt-7">
                  <NavLink to="/">
                    <button>
                      <TiArrowBackOutline
                        className="hover:bg-[red] rounded-full"
                        size={27}
                      />
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[82%]">{handleSwitch()}</div>
        </div>
      )}
    </div>
  );
}

export default AdminMainPage;
