import logo from "../assets/shoe-navaf.svg";
import sLogo from "../assets/logoSmallerV.svg";
import Swal from "sweetalert2";
import smallerLogo from "../assets/logoSmallerV.svg";
import { Link, NavLink } from "react-router-dom";
import { FaSearch, FaBars, FaBackspace } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useState, useContext } from "react";
import { ProductsData } from "../../context/ProductsCont";
import { userData } from "../../context/UserContext";
import { IoMdLogOut } from "react-icons/io";
import { RiUserFollowFill } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
function Navbar() {
  const [menu, setMenu] = useState(false);
  const [currUserDataShows, setCurrUserDataShows] = useState(false);
  const { search, setSearch } = useContext(ProductsData);
  const { currUser, logoutUser, cartLengthCheck, wishlistLengthCheck, isAdmin } =
  useContext(userData);
  

  
  const toggleDropdown = () => {
    setCurrUserDataShows((prev) => !prev);
  };

  const toggleDropdownMenu = () => {
    setMenu((prev) => !prev);
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


  return (
    <div className="pb-20">
      <div>
        {currUserDataShows && currUser && (
          <div className="fixed right-0 w-48 mt-20 bg-[#fff9f9]  shadow-lg py-2 z-50">
            <p className="px-4 py-2 font-bold hover:bg-[#800000] hover:text-white">
              {currUser.name}
            </p>
            <p className="px-4 py-2 text-gray-600 hover:bg-[#800000] hover:text-white">
              {currUser.email}
            </p>
            <NavLink to="/profile">
              <button className="w-full px-4 py-2 text-left hover:bg-[#800000] hover:text-white">
                View Profile
              </button>
            </NavLink>
            <button
              onClick={popupHandler}
              className="w-full px-4 py-2 text-left hover:bg-[#800000] hover:text-white"
            >
              Logout
            </button>
            <FaBackspace
              size={20}
              onClick={toggleDropdown}
              className="ms-5 mt-3 mb-2"
            />
          </div>
        )}
      </div>
      <div className="border-b-2 h-20 flex justify-center w-full fixed bg-white z-50">
        <div className="nav-logo flex justify-between items-center w-full px-4">
          <Link to="/">
            <div className="md:flex items-center hidden ">
              <img src={logo} className="h-12 w-44 hidden lg:flex" alt="" />
              <img src={sLogo} className="h-12  lg:hidden" alt="" />
            </div>
            <div className="md:hidden w-12 me-2">
              <img src={smallerLogo} alt="" className="me-5" />
            </div>
          </Link>
          <div className="hidden sm:flex gap-4">
            <NavLink to="/">
              <h1 className="hover-line ms-3 hover:font-semibold">Shop</h1>
            </NavLink>
            <NavLink to="/men">
              <h1 className="hover-line hover:font-semibold">Men</h1>
            </NavLink>
            <NavLink to="/women">
              <h1 className="hover-line hover:font-semibold">Women</h1>
            </NavLink>
            <NavLink to="/orders">
              <h1 className="hover-line hover:font-semibold">Orders</h1>
            </NavLink>
            <NavLink to="/contact">
              <h1 className="hover-line hover:font-semibold">Contact</h1>
            </NavLink>
            {currUser && isAdmin && (
              <NavLink to="/admin">
                <h1 className="hover-line font-[600] text-[#BF3131]">Admin</h1>
              </NavLink>
            )}
          </div>
          <div className="flex items-center ps-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white border border-[#BF3131] h-[40px] rounded-l-full ps-4 py-1.5 sm:w-[80%] w-[60%] outline-none shadow-md transition-all duration-300 focus:shadow-lg"
              placeholder="Search for products..."
            />
            <NavLink to="/search">
              <FaSearch className="bg-[#BF3131] text-white h-[40px] w-[40px] p-2 rounded-r-full shadow-md hover:bg-[#a82626] transition-colors duration-300" />
            </NavLink>

            {currUser === null ? (
              <NavLink to="/login">
                <button className="bg-[#BF3131] text-white rounded-lg py-1 px-4 w-20 mx-1 sm:w-auto transition-all duration-300 hover:bg-[#a82626]">
                  Login
                </button>
              </NavLink>
            ) : currUser.image ? (
              <img
                src={currUser.image}
                onClick={toggleDropdown}
                className="ms-5 me-3 w-16 h-[42px] rounded-full cursor-pointer"
                alt="User profile picture"
              />
            ) : (
              <RiUserFollowFill
                size={25}
                onClick={toggleDropdown}
                className="ms-5 w-14  me-3 cursor-pointer hover:text-[#BF3131]"
              />
            )}
            {currUser !== null && (
              <div className="flex gap-5">
                <NavLink to="/wishlist" className="relative">
                  <div className="absolute top-[-18px] right-[-3px] bg-red-700 rounded-full h-4 w-4 text-center mt-2">
                    <p className="m-[-2px] text-white text-[12px]">
                      {wishlistLengthCheck}
                    </p>
                  </div>
                  <CiHeart className="hover:text-[#BF3131]" size={25} />
                </NavLink>

                <NavLink to="/cart" className="relative">
                  <div className="absolute top-[-19px] right-[14px] sm:right-[-10px] bg-red-700 rounded-full h-4 w-4 text-center mt-2">
                    <p className="m-[-3px] text-white text-[13px]">
                      {cartLengthCheck}
                    </p>
                  </div>
                  <IoCartOutline
                    className=" hover:text-[#BF3131] sm:me-[-5px] ms-[-5px] me-[20px]"
                    size={25}
                  />
                </NavLink>

                <IoMdLogOut
                  className="cursor-pointer me-5 ho hidden sm:flex hover:text-[#BF3131] "
                  onClick={popupHandler}
                  size={20}
                />
              </div>
            )}
          </div>
          <FaBars
            onClick={() => setMenu(true)}
            className="flex sm:hidden me-2"
          />
          <div
            className={`absolute bg-white top-0 z-10 right-0 bottom-0 ${
              menu ? "w-[250px]" : "hidden"
            }`}
          >
            <button
              onClick={() => setMenu(false)}
              className="w-full hover:bg-[#7D0A0A] bg-white hover:text-white"
            >
              <NavLink to="/">
                <h1 className="font-[500] text-[20px] p-5">Shop</h1>
              </NavLink>
            </button>

            <button
              onClick={() => setMenu(false)}
              className="w-full hover:bg-[#7D0A0A] bg-white hover:text-white"
            >
              <NavLink to="/men">
                <h1 className="font-[500] text-[20px] p-5">Men</h1>
              </NavLink>
            </button>

            <button
              onClick={() => setMenu(false)}
              className="w-full hover:bg-[#7D0A0A] bg-white hover:text-white"
            >
              <NavLink to="/women">
                <h1 className="font-[500] text-[20px] p-5">Women</h1>
              </NavLink>
            </button>
            <button
              onClick={() => setMenu(false)}
              className="w-full hover:bg-[#7D0A0A] bg-white hover:text-white"
            >
              <NavLink to="/orders">
                <h1 className="font-[500] text-[20px] p-5">Orders</h1>
              </NavLink>
            </button>

            <button
              onClick={() => setMenu(false)}
              className="w-full hover:bg-[#7D0A0A] bg-white hover:text-white"
            >
              <NavLink to="/contact">
                <h1 className="font-[500] text-[20px] p-5">Contact</h1>
              </NavLink>
            </button>
            <button className="w-full hover:bg-[#7D0A0A] bg-white">
              <FaBackspace
                size={30}
                onClick={toggleDropdownMenu}
                className="ms-5 mt-3 mb-3"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
