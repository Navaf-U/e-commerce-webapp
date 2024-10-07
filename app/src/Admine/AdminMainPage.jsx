import './AdmineStyle.css'
import AdminePhoto from '../Components/assets/AdminePhoto.png'
import { MdOutlineDashboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { useContext } from 'react';
import { userData } from '../context/UserContext';
import AdminProducts from './AdminProducts';

function AdminMainPage() {
    const {logoutUser} = useContext(userData) 
  return ( 
    <div className="w-full overflow-x-auto">
      <div className='flex gap-5 min-w-[1000px]'>
        <div className="Adminlayout flex pt-5 md:w-[18%] text-white flex-col gap-5">
          <h1 className='text-[30px] font-[500] ms-3'>Step Prime</h1>
          <hr className='border-[#80808066] w-[100%]'/>
          <div className='flex flex-col justify-center items-center'>
            <img src={AdminePhoto} className='ms-3 w-[35%]' alt="" />
            <hr className='border-[#80808066] w-[100%] mt-5 mb-5'/>
            <div className='flex flex-col gap-5 text-[16px] font-[700] items-center'>
              <div className='AdminDashboard flex justify-center ps-2 gap-1 items-center flex-row hover:bg-pink-700 w-[200%] h-16 rounded-md'>
                <MdOutlineDashboard className='mt-1'/>
                <button>Dashboard</button>
              </div>
              <div className='AdminUsers flex justify-center ps-2 items-center flex-row gap-2 hover:bg-pink-700 h-16 w-[200%] rounded-md'>
                <FiUsers />
                <button>Users</button>
              </div>
              <div className='AdminProducts flex justify-center ps-2 items-center flex-row gap-2 hover:bg-pink-700 w-[200%] h-16 rounded-md'>
                <MdOutlineProductionQuantityLimits/>
                <button>Products</button>
              </div>
              <div onClick={logoutUser} className='AdminLogout flex justify-center ps-2 items-center flex-row gap-2 hover:bg-pink-700 w-[200%] h-16 rounded-md'>
                <BiLogOutCircle/>
                <button>Logout</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <AdminProducts />
        </div>
      </div>
    </div>
  )
}

export default AdminMainPage;
