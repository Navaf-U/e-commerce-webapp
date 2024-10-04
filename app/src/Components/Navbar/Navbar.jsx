import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import logo from "../assets/ChicKickLogo.png";
import { useState } from "react";
import { useContext } from "react";
import { ProductsData } from "../../context/ProductsCont";
import { userData } from "../../context/UserContext";
import { CiLogout } from "react-icons/ci";
import { RiUserFollowFill } from "react-icons/ri";

function Navbar() {
  const {cartItemNotify} = useContext(ProductsData)
  const [menu, setMenu] = useState(false);
  const { search, setSearch } = useContext(ProductsData);
  const {isLogged,logoutUser,currUser} =useContext(userData)
  const [currUserDataShows,setCurrUserDataShows]=useState(false)
  const toggleDropdown = () => {
    setCurrUserDataShows((prev) => !prev);
  };
  return (
    <div className="pb-20">
      <div>
      {currUserDataShows && currUser && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
          <p className="px-4 py-2 font-bold">Hello, {currUser.name}</p>
          <p className="px-4 py-2 text-gray-600">{currUser.email}</p>
          <NavLink to="/profile">
            <button className="w-full px-4 py-2 text-left hover:bg-gray-200">
              View Profile
            </button>
          </NavLink>
          <button onClick={logoutUser} className="w-full px-4 py-2 text-left hover:bg-gray-200">
            Logout
          </button>
        </div>
      )}
      </div>


      <div className="border-b-2 h-20 w-full fixed bg-white z-50 ">
        <div className="nav-logo flex justify-around items-center w-full">
          <div className="flex items-center">
            <img src={logo} className="size-20" alt="" />
            <h1 className="nav-logo hidden text-[30px] font-[900] lg:flex items-center text-gray-800">
              <span className="text-black">Step</span>
              <span className="text-red-600">Prime</span>
            </h1>
          </div>
          <div className="gap-4 hidden sm:flex">
            <NavLink to="/">
              <h1 className="hover-line">Shop</h1>
            </NavLink>
            <NavLink to="/men">
              <h1 className="hover-line">Men</h1>
            </NavLink>
            <NavLink to="/women">
              <h1 className="hover-line">Women</h1>
            </NavLink>
            <NavLink>
              <h1 className="hover-line">Orders</h1>
            </NavLink>
            <NavLink>
              <h1 className="hover-line">Contact</h1>
            </NavLink>
          </div>

          <div className="flex items-center ps-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white border-[1px] border-[#BF3131] ps-3 py-1 sm:w-[100%] w-[60%] border-r-0  outline-none"
              placeholder="search...."
            />
            <NavLink to="/search">
              <FaSearch className="bg-white border-[#BF3131]  border-[1px] h-[34px] border-l-0 w-6 " />
            </NavLink>
           {isLogged=== false ?(
             <NavLink to="/login">
             <FaUser size={20} className="ms-5 me-2" />
           </NavLink>
           ):(
           <RiUserFollowFill size={30} onClick={toggleDropdown} className="ms-5 me-3 cursor-pointer" />
           )}
            {isLogged===true ?(
              <div className="flex gap-5">
                <NavLink to="/cart" className="relative">
              <div className="absolute top-[-20px] right-[-3px]  bg-red-700 rounded-full h-4 w-4 text-center  mt-2">
                <p className="m-[-3px] text-white text-[13px]">{cartItemNotify()}</p>
              </div>
              <IoCartOutline className="ms-3" size={25} />
            </NavLink>
             <CiLogout className="cursor-pointer" onClick={logoutUser} size={20}/>
              </div>
            ) : null}
            
          </div>
          <FaBars onClick={() => setMenu(true)} className="flex sm:hidden" />
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
              <NavLink>
                <h1 className="font-[500] text-[20px] p-5">Orders</h1>
              </NavLink>
            </button>

            <button
              onClick={() => setMenu(false)}
              className="w-full hover:bg-[#7D0A0A] bg-white hover:text-white"
            >
              <NavLink>
                <h1 className="font-[500] text-[20px] p-5">Contact</h1>
              </NavLink>
            </button>

            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
