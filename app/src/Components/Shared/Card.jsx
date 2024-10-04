import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProductsData } from "../../context/ProductsCont";
import { userData } from "../../context/UserContext";
import Cart from "../../pages/Cart";

function Card({ id, price, image, type, name }) {
  const { addToCart } = useContext(ProductsData);
  const {PostUserDatas} = useContext(userData)

  return (
    <div>
      <div className="h-[450px] w-[700px] relative m-10 flex max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <NavLink
          to={`/products/${id}`}
          className="transition-transform duration-1000 ease-in-out hover:scale-110 justify-center w-full mx-3 mt-5 flex h-60 overflow-hidden rounded-xl"
        >
          <img className="object-cover" src={image} alt="product image" />
          <span className="absolute top-0 left-0 m-2  rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            {type}
          </span>
        </NavLink>
        <NavLink
          to=""
          className="relative mx-3 mt-3 flex justify-center overflow-hidden rounded-xl"
        >
          <p className="text-1xl font-bold pt-4  text-slate-900">{name}</p>
        </NavLink>

        <div className="mt-4 px-5 pb-5">
          <div className="mt-2 mb-5 flex items-center justify-center">
            <p>
              <span className="text-3xl text-center font-bold text-slate-900">
                {price}₹
              </span>
            </p>
          </div>
          <NavLink
            onClick={() => addToCart(id)}
            to=""
            className="flex items-center justify-center rounded-md bg-[#BF3131] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#7D0A0A] focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <svg          
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <button onClick={()=>PostUserDatas(cart)}>Add to cart</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Card;
