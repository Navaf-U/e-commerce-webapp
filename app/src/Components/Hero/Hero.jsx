// import { FaArrowRight } from 'react-icons/fa';
// import hero_img from '../assets/Hero.jpg'

// const Hero = () => {
//   return (
//     <div className="hero flex bg-[url(D:\Project\app\src\Components\assets\Backgroundpic.jpg)] bg-cover bg-center h-screen w-full">
//       <div className="hero-left flex flex-col gap-20px leading-[1.1] pt-[60px] ps-[100px]">
//         <h2 className="text-[26px] font-[600] opacity-60">NEW ARRIVALS ONLY</h2>
//       <div>
//         <div className="hero-hand-icon flex items-center gap-20">
//             <p className="text-[70px] font-[700] opacity-30">new</p>
//         </div>
//         <p className="text-[70px] font-[700] opacity-30">collections</p>
//         <p className="text-[70px] font-[700] opacity-30">for everyone</p>
//       </div>
//       <div className="hero-latest-btn flex items-center justify-center gap-14 w-[310px] h-[70px] rounded-[75px] mt-10 bg-red-600 text-[22px] font-[500]">
//         <div className="opacity-50">Latest collections</div>
//         <FaArrowRight/>
//       </div>
//       </div>
//       {/* <div className="hero-right m-3">
//         <img src={hero_img} alt="" />
//       </div> */}
//     </div>
//   )
// }

// export default Hero
import { FaArrowRight } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="hero flex bg-[url(D:\Project\app\src\Components\assets\Backgroundpic.jpg)] bg-cover bg-center h-screen w-full">
      <div className="hero-left flex flex-col gap-6 leading-tight pt-16 px-4 sm:px-10 md:px-20 lg:px-28">
        <h2 className="text-xl md:text-2xl font-semibold opacity-60">NEW ARRIVALS ONLY</h2>
        
        <div>
          <p className="text-5xl md:text-6xl font-bold opacity-30">new</p>
          <p className="text-5xl md:text-6xl font-bold opacity-30">collections</p>
          <p className="text-5xl md:text-6xl font-bold opacity-30">for everyone</p>
        </div>

        <div className="hero-latest-btn flex items-center justify-center gap-4 w-[260px] h-[60px] rounded-full mt-6 bg-red-600 text-lg font-medium">
          <div className="opacity-50">Latest collections</div>
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
}

export default Hero;
