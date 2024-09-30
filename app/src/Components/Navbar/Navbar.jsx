import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import logo from "../assets/mainLogo.png";
import { useState } from "react";
import { useContext } from "react";
import { ProductsData } from "../../context/ProductsCont";


function Navbar() {
  const [menu, setMenu] = useState(false);
 const {search , setSearch} = useContext(ProductsData)
  return (
    <div className="border-b-2 h-20 w-full fixed bg-white z-50 ">
      <div className="nav-logo flex justify-around items-center w-full">
        <div className="flex items-center">
          <img src={logo} className="size-20" alt="" />
          <h1 className="nav-logo hidden text-[30px] font-[900] lg:flex ">
            Foot PIPI
          </h1>
        </div>
        <div className="gap-2 hidden sm:flex">
          <NavLink to="/">
            <h1>Shop</h1>
          </NavLink>
          <NavLink to="/men">
            <h1>Men</h1>
          </NavLink>
          <NavLink to="/women">
            <h1>Women</h1>
          </NavLink>
          <NavLink>
            <h1>Orders</h1>
          </NavLink>
          <NavLink>
            <h1>Contact</h1>
          </NavLink>
        </div>




        <div className="flex items-center ps-3">
          <input
            type="text" value={search} onChange={(e)=>setSearch(e.target.value)}
            className="bg-white border-[1px] border-[#BF3131] ps-3 py-1 sm:w-[100%] w-[60%] border-r-0 active:border-[#BF3131] focus:border-[#BF3131]"
            placeholder="search...."
          />
          <NavLink to="/search">
          <FaSearch  className="bg-white border-[#BF3131]  border-[1px] h-[34px] border-l-0 w-6 " />
          </NavLink>
          <NavLink to="/login">
            <FaUser size={20} className="ms-5 me-2" />
          </NavLink>
          <NavLink to="/cart" className="relative">
          <div className="absolute top-[-20px] right-[-3px]  bg-red-700 rounded-full h-4 w-4 text-center  mt-2">
            <p className="m-[-3px] text-white text-[13px]">0</p>
          </div>
            <IoCartOutline size={25} />
          </NavLink>
        </div>
        <FaBars onClick={() => setMenu(true)} className="flex sm:hidden" />
        <div
          className={`absolute bg-white top-0 z-10 right-0 bottom-0 ${
            menu ? "w-[250px]" : "hidden"
          }`}
        >
          <button
            onClick={() => setMenu(false)}
            className="w-full hover:bg-[#7D0A0A] hover:text-white"
          >
            <NavLink to="/">
              <h1 className="font-[500] text-[20px] p-5">Shop</h1>
            </NavLink>
          </button>
          <br />
          <button
            onClick={() => setMenu(false)}
            className="w-full hover:bg-[#7D0A0A] hover:text-white"
          >
            <NavLink to="/men">
              <h1 className="font-[500] text-[20px] p-5">Men</h1>
            </NavLink>
          </button>
          <br />
          <button
            onClick={() => setMenu(false)}
            className="w-full hover:bg-[#7D0A0A] hover:text-white"
          >
            <NavLink to="/women">
              <h1 className="font-[500] text-[20px] p-5">Women</h1>
            </NavLink>
          </button>
          <br />
          <button
            onClick={() => setMenu(false)}
            className="w-full hover:bg-[#7D0A0A] hover:text-white"
          >
            <NavLink>
              <h1 className="font-[500] text-[20px] p-5">Orders</h1>
            </NavLink>
          </button>
          <br />
          <button
            onClick={() => setMenu(false)}
            className="w-full hover:bg-[#7D0A0A] hover:text-white"
          >
            <NavLink>
              <h1 className="font-[500] text-[20px] p-5">Contact</h1>
            </NavLink>
          </button>
          <br />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
