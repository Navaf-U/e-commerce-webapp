import {NavLink} from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import logo from "../assets/mainLogo.png"
function Navbar() {
  return (
    <div className="border-b-2 h-14 flex items-center">
      <div className="nav-logo flex justify-around items-center w-full">
        <div className="flex items-center">
        <img src={logo} className="size-20" alt="" />
        <h1 className="nav-logo text-[30px] font-[900]">Foot PIPI</h1>
        </div>
        <div className="flex gap-2">

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
        <input type="text" className="bg-gray-300 sm:w-[100%] w-[60%]" placeholder="search...." />
        <FaSearch className="bg-gray-300 h-6 w-5"/>        
        <FaUser className="ms-5"/>
        </div>
      </div>
    </div>
  )
}

export default Navbar
