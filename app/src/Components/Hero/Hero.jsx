import { FaArrowRight } from 'react-icons/fa';
import mainBgAd from '../assets/storeBg.png';

const Hero = () => {
  return (
    <div className="hero flex flex-col md:flex-row bg-cover bg-center bg-[#7D0A0A] md:h-screen w-full relative">
      <div className="hero-left flex flex-col gap-6 leading-tight  mt-28 px-4 sm:px-10 md:px-20 lg:px-24">
        <h2 className="text-xl md:text-2xl font-semibold opacity-80 text-[#fff]">NEW ARRIVALS ONLY</h2>
        <div>
          <p className="text-5xl md:text-6xl font-bold text-[#fff] opacity-80">New</p>
          <p className="text-5xl md:text-6xl font-bold text-[#fff] opacity-80">collections</p>
          <p className="text-5xl md:text-6xl font-bold text-[#fff] opacity-80">for everyone</p>
        </div>
        <div>
          <button className="hero-latest-btn flex items-center justify-center gap-4 w-full md:w-[260px] h-[60px] rounded-full mt-6 bg-[white] text-lg font-medium  hover:opacity-100 text-[#7D0A0A] hover:bg-[#ecdec2] hover:text-[black]">Latest collections <FaArrowRight /></button>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center md:justify-end">
        <img src={mainBgAd} alt="" className="max-w-full h-auto" />
      </div>
    </div>
  );
}

export default Hero;
