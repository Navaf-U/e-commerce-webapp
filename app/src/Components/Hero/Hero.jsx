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
