import { FaArrowRight } from "react-icons/fa";
import mainBgAd from "../assets/storeBg.png";

const Hero = () => {
  return (
    <div className="hero flex flex-col md:flex-row bg-cover bg-center bg-gradient-to-b from-[#fff] via-[#fff] to-[#1f1c1c] md:h-screen w-full relative">
      <div className="hero-left flex flex-col gap-6 leading-tight  mt-24 px-4 sm:px-10 md:px-20 lg:px-24">
        <h2 className="text-xl md:text-2xl font-semibold opacity-80 text-[#]">
          NEW ARRIVALS ONLY
        </h2>
        <div>
          <p className="text-5xl md:text-6xl font-bold text-[#BF3232] opacity-80">
            New
          </p>
          <p className="text-5xl md:text-6xl font-bold text-[#333] opacity-100">
            collections
          </p>
          <p className="text-5xl md:text-6xl font-bold text-[#BF3232] opacity-80">
            for everyone
          </p>
        </div>
        <div>
          <button className="hero-latest-btn flex items-center justify-center gap-4 w-full md:w-[260px] h-[60px] rounded-full mt-6 bg-[white] text-lg font-medium  hover:opacity-100 text-[#7D0A0A] hover:bg-[#7D0A0A] hover:text-[white]">
            Latest collections <FaArrowRight />
          </button>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center md:justify-end mt-[66px]">
        <img src={mainBgAd} alt="" className="max-w-full h-auto" />
      </div>
    </div>
  );
};

export default Hero;
