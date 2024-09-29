import { NavLink } from "react-router-dom";
import logo from "../assets/PawHeartLogo.png";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="border-b-4 pb-2 border-gray-700 relative">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <img src={logo} className="w-16" alt="Logo" />
          <h1 className="text-[2rem] md:text-[3rem] font-extrabold text-gray-800 italic">
            <span className="hidden md:inline">Paw</span>
            <span className="text-[#ff8499]">Bites</span>
          </h1>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="ml-auto">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>

        <div className="hidden md:flex md:gap-2 items-center">
          <NavLink to={"/"} className="flex items-center">
            <li><b>Shop</b></li>
          </NavLink>
          <NavLink to={"cats"} className="flex items-center">
            <li><b>Cats</b></li>
          </NavLink>
          <NavLink to={"dogs"} className="flex items-center">
            <li><b>Dogs</b></li>
          </NavLink>
        </div>

        <div className="login-cart flex p-4 gap-3 items-center">
          <NavLink to={"login"}>
            <button className="bg-gray-50 border border-fuchsia-700 outline-8 rounded-full w-20 h-8 bg-slate-300">
              Login
            </button>
          </NavLink>
          <NavLink to={"cart"}>
            <FaShoppingCart size={25} />
          </NavLink>
          <div className="nav-cart-count">0</div>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search..."
        className="rounded-full w-11/12 border border-gray-400 ps-3 pe-[50px] h-8 mb-2 md:mb-0"
      />

      {menuOpen && (
        <div className="absolute top-16 right-0 bg-white shadow-lg p-4 w-48 z-10">
          <ul className="flex flex-col items-start">
            <NavLink to={"/"} className="flex items-center mb-2">
              <li><b>Shop</b></li>
            </NavLink>
            <NavLink to={"cats"} className="flex items-center mb-2">
              <li><b>Cats</b></li>
            </NavLink>
            <NavLink to={"dogs"} className="flex items-center mb-2">
              <li><b>Dogs</b></li>
            </NavLink>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
