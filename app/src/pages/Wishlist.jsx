import { useContext } from "react"
import { userData } from "../context/UserContext"
import { NavLink } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";

function Wishlist() {
    const {wishlist,removeFromWishlist} = useContext(userData)

  return (
    <div className="cart-items mx-auto my-8 max-w-screen-lg p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Your Wishlist</h2>
      {!wishlist && wishlist?.length === 0 ? (
        <p className="text-center text-lg">Your wishlist is empty.</p>
      ) : (
        <div className="hidden sm:flex flex-col sm:flex-row items-center py-4 px-4 bg-[#333] text-white rounded-lg shadow-md mb-4">
          <div className="flex justify-between items-center px-5 w-full">
          <p className="text-start ms-20">Product</p>
          <p className=" text-center">Title</p>
          <p className=" text-end ">Price</p>
          </div>
        </div>
      )}

      { Array.isArray(wishlist) && wishlist?.map((item,index) => {
        return (
          <div
          //must use index as key
            key={index}
            className="flex flex-col sm:flex-row items-center py-4 px-4 bg-gray-50 rounded-lg shadow-md mb-4"
          >
            <button
            onClick={() => removeFromWishlist(item._id)}
              className="ml-4 hidden sm:flex mb-2 sm:mb-0"
            >
              <FaRegTrashCan
                size={28}
                className="text-[#333] hover:text-red-800 transition-colors duration-200 me-4"
              />
            </button>
           <div className="flex justify-between items-center px-5 w-full">
           <NavLink to={`/products/${item._id}`}>
              <img
                src={item.image}
                className="w-24 h-24 object-cover rounded-md sm:mr-4 mb-2 sm:mb-0"
                alt="image.."
              />
            </NavLink>
            <p className=" text-center mb-2 sm:mb-0">
              {item.name}
            </p>
            <p className=" text-center mb-2 sm:mb-0">
              
              {item.price}
            </p>
            <button
              onClick={() => removeFromWishlist(item._id)}
              className="ml-4  sm:hidden mb-2 me-[-20px] sm:mb-0"
            >
              <FaRegTrashCan
                size={28}
                className="text-red-600 hover:text-red-800 transition-colors duration-200 me-4"
              />
            </button>
           </div>
          </div>
        );
      })}
    </div>
  )
}

export default Wishlist
