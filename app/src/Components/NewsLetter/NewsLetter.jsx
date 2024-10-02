function NewsLetter() {
  return (
    <div className="newsletter rounded-[10px] mt-16 bg-gradient-to-r from-[#EAD196] to-[#F8F8F8] pb-20 w-[90%] md:w-[80%] lg:w-[65%] h-auto flex flex-col justify-center items-center m-auto py-14 gap-8">
      <h1 className="text-[#454545] text-2xl sm:text-3xl md:text-4xl lg:text-[55px] font-semibold pt-8 text-center">
        Get Exclusive Offers On Your Email
      </h1>
      <p className="text-[#454545] text-lg sm:text-xl text-center">
        Subscribe to our newsletter and stay updated
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center w-full gap-4 md:w-[730px]">
        <input
          className="w-full md:w-[500px] border-none outline-none text-[#616161] text-sm md:text-base h-[70px] p-2"
          type="email"
          placeholder="Your Email id"
        />
        <button className="w-full md:w-[210px] h-[70px] rounded-full bg-black text-white text-sm md:text-base">
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default NewsLetter;
