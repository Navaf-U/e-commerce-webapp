import { NavLink } from "react-router-dom";
import logo from "../assets/PawHeartLogo.jpg";
import { FaShoppingCart } from "react-icons/fa";
function Navbar() {
  return (
    <div className="border-b-4 pb-2 border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex">
          <img src={logo} className="w-16" width="3%" alt="" />
          <h1 className="text-6xl font-extrabold text-center text-gray-800 italic">
            Paw<span className="text-fuchsia-600">Bites</span>
          </h1>
        </div>        
          <ul className="nav-menu flex gap-2 justify-between">
            <NavLink to={"/"} className="flex flex-col items-center">
              <li><b>Shop</b></li>
              <hr className="bg-stone-950 w-2/4 h-1 hidden" />
            </NavLink>
            <NavLink to={"cats"} className="flex flex-col items-center">
              <li><b>Cats</b></li>
              <hr className="bg-stone-950 w-2/4 h-1 hidden" />
            </NavLink>
            <NavLink to={"dogs"} className="flex flex-col items-center">
              <li><b>Dogs</b></li>
              <hr className="bg-stone-950 w-2/4 h-1 hidden" />
            </NavLink>
          </ul>
        <div className="login-cart flex p-4 gap-3 items-center">
          <input
            type="text"
            placeholder=" search.."
            className="rounded-full  border border-gray-400 ps-3 pe-20 h-8"
          />
          <NavLink to={"login"}>
          <button className="bg-gray-50 border border-fuchsia-700 outline-8 rounded-full w-20 h-8 bg-slate-300">Login
          </button>
          </NavLink>
          <NavLink to={"cart"}>
          <FaShoppingCart size={25} />
          </NavLink>
          <div className="nav-cart-count">0</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;


