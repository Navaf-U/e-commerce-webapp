import { FaArrowRight } from "react-icons/fa";
import mainBgAd from "../assets/heroBg-3.jpg";
 

const Hero = () => {
  return (
    <div className="relative flex flex-col md:flex-row w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainBgAd})` }}>
      <div className="absolute inset-0 bg-black opacity-60 z-0" />
      <div className="flex-1 flex items-center justify-center z-10">
        <img src={mainBgAd} alt="Shoe" className="w-3/4 md:w-1/2 h-auto rounded-lg shadow-lg" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-start px-6 z-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-wide uppercase mb-4">Exclusive Arrivals</h2>
        <div className="mb-6">
          <p className="text-5xl md:text-6xl font-bold text-[#BF3131] drop-shadow-md transition-transform transform hover:scale-105">New</p>
          <p className="text-5xl md:text-6xl font-bold text-white drop-shadow-md transition-transform transform hover:scale-105">Collections</p>
          <p className="text-5xl md:text-6xl font-bold text-[#BF3131] drop-shadow-md transition-transform transform hover:scale-105">For Everyone</p>
        </div>
        <button className="flex items-center justify-center w-56 h-14 rounded-full bg-[#BF3131] text-white text-lg font-semibold transition-transform transform hover:scale-105 hover:bg-[#7D0A0A] shadow-lg">
          Explore Latest <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
