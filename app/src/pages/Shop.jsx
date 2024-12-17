import Hero from "../Components/Hero/Hero";
import menAd from "../Components/assets/menAd.jpg";
import womenAd from "../Components/assets/womenAd.jpg";
import NewsLetter from "../Components/NewsLetter/NewsLetter";
import Button from '@mui/material/Button';
import Card from "../Components/Shared/Card";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import { userData } from "../context/UserContext";
import axiosInstance from "../util/axiosInstance";
import axiosErrorManager from "../util/axiosErrorManage";
import { toast } from "react-toastify";
import Loading from "../Components/Loading/Loading";

function Shop() {
  const [products, setProducts] = useState([]);
  const { currUser, loading,setLoading } = useContext(userData);
  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get("/user/products");
        setProducts(data.data);
      } catch (err) {
        toast.error(axiosErrorManager(err));
      } finally {
        setLoading(false);
      }
    };
    fetchProductsData();
  }, [currUser, setLoading]);

  if(loading){
    return <Loading/>
  }
   
  return (
    <div>
      <Hero />
      <div>
        <div className="shadow-lg pb-5">&nbsp;</div>
        <div className="flex justify-center items-center my-5 bg-black">
        <Button variant="outlined" className="text-[50px] font-extrabold text-center text-slate-900 tracking-wide leading-tight mt-10">
          Popular Shoes
        </Button>
        </div>
      </div>
      <div className="flex items-center justify-center flex-wrap">
        {products.map((item) => {
          return (
            <Card
              key={item._id}
              id={item._id}
              image={item.image}
              price={item.price}
              type={item.type}
              name={item.name}
              rating={item.rating}
            />
          );
        })}
      </div>

      <div className="menAd flex flex-wrap justify-evenly  items-center ">
        <div className="border-[2px] bg-[#EAD196] p-3 border-[#fff]">
          <img src={menAd} className="w-[300px] rounded-xl h-[400px]" alt="" />
          <NavLink to="/men" className=" ">
            <button className="text-[3em] font-[100] flex justify-center text-black bg-white rounded-full w-[100%] mt-5">
              Mens <FaPersonWalkingArrowRight className="ms-7 mt-6" size={35} />
            </button>
          </NavLink>
        </div>
        <div className="border-[2px] p-3 bg-[pink] border-[#fff]">
          <img
            src={womenAd}
            className="w-[300px] rounded-xl h-[400px]"
            alt=""
          />
          <NavLink to="/women" className="flex  justify-center items-center">
            <button className="text-[3em] flex justify-center font-[100] text-black bg-white border-white-600 rounded-full w-[100%] mt-5">
              Womens
              <FaPersonWalkingArrowRight className="ms-7 mt-6" size={35} />
            </button>
          </NavLink>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
}

export default Shop;
