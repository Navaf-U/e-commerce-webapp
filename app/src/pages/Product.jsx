import { useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ProductsData } from "../context/ProductsCont";
import logo from '../Components/assets/MainLogo.png'
function Product() {
  const { id } = useParams();
  const { products, currency,addToCart } = useContext(ProductsData);
  const findProduct = products.find((item) => item.id === id);

  return (
    <div className="flex flex-col md:flex-row justify-around px-4 py-6">
      <div className="left-section md:w-[40%] flex flex-col items-center">
        <img src={findProduct.image} className="w-[100%] max-w-[300px] mb-4" alt="" />
        <h4 className="text-[24px] text-center font-[700]">{findProduct.name}</h4>
        <h3 className="text-[20px] text-center font-[400]">{`Type: ${findProduct.type}`}</h3>
        <h3 className="text-[24px] text-center font-[700]">{`Price: ${findProduct.price}${currency}`}</h3>
      </div>
      <div className="right-section md:w-[50%] mt-4 md:mt-0 flex flex-col items-center justify-center">
      <img src={logo} className="h-[400px] mt-[-20px]" alt="" />
        <p className="text-[50px] font-[300] text-center text-sm md:text-base px-2 mt-[-50px]">
          Experience the perfect blend of style and comfort with our latest collection. <br /> Upgrade your wardrobe today and enjoy free shipping on all orders!
        </p>
        <NavLink to="/cart" onClick={()=> addToCart(id)}>
        <button className="mt-8 w-[350px] h-[70px] rounded-md bg-[#BF3131] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#7D0A0A] focus:outline-none focus:ring-4 focus:ring-blue-300">
          Add to Cart
        </button>
        </NavLink>
      </div>
    </div>
  );
}

export default Product;
