import mainBgAd from "../assets/heroBg-3.jpg";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero = () => {
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const lines = [
    { text: "New", color: "text-[#BF3131]" },
    { text: "Collections", color: "text-white" },
    { text: "For Everyone", color: "text-[#BF3131]" },
  ];

  return (
    <div
      className="relative flex flex-col md:flex-row w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${mainBgAd})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60 z-0" />
      <div className="flex-1 flex items-center justify-center z-10 p-4">
        <img
          src={mainBgAd}
          alt="Shoe"
          className="w-3/4 md:w-1/2 h-auto rounded-lg shadow-lg"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center items-start px-4 md:px-6 z-10">
        <h2 className="text-xl md:text-3xl font-semibold text-white tracking-wide uppercase mb-2 md:mb-4">
          Exclusive Arrivals
        </h2>
        <div className="mb-4 md:mb-6 space-y-4">
      {lines.map((line, lineIndex) => (
        <motion.div
          key={lineIndex}
          className="flex justify-center"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          {line.text.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={child}
              className={`text-4xl md:text-6xl font-bold ${
                char === " " ? "mx-2" : line.color
              } drop-shadow-md`}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </div>
        <button className="flex items-center justify-center w-48 md:w-56 h-12 md:h-14 rounded-full bg-[#BF3131] text-white text-base md:text-lg font-semibold transition-transform transform hover:scale-105 hover:bg-[#7D0A0A] shadow-lg">
          Explore Latest <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
