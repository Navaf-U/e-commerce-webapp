import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import Loading from "../Components/Loading/Loading";
import { useContext } from "react";
import { userData } from "../context/UserContext";
function Contact() {
  const {loading} = useContext(userData) 
  return (
    <>  
    <div className="flex w-full  justify-center items-center">
      {loading && <Loading />}
    </div>
    <div className="w-full flex justify-center mt-10">
      <div className="contact-main flex flex-col lg:flex-row justify-evenly items-center w-full lg:max-w-[1200px] px-5 lg:px-0 gap-10 lg:gap-5">
        <div className="flex flex-col gap-5 bg-[#BF3131] text-white text-center p-6 rounded-md w-full lg:w-[45%] justify-center items-center">
          <span className="font-[700] text-[20px]">GET IN TOUCH WITH US</span>
          <p className="text-wrap mx-3">
            Have any questions or need support? We&apos;re here to assist! Reach out via phone, email, or social media, and we’ll respond as soon as possible. Your satisfaction matters, and we’re happy to help with anything you need.
          </p>
          <div className="text-[18px]">
            Call us directly at
            <h1 className="font-[500] flex mt-2 gap-1">
              <FaPhoneAlt className="mt-1" size={16} /> +91 8113819146
            </h1>
            <h1 className="flex gap-1"><MdOutlineEmail className="mt-1"/> navafsoft@gmail.com</h1>
          </div>
          <p className="underline cursor-pointer">See all numbers and locations</p>
        </div>

        <div className="bg-white w-full lg:w-[45%] p-6 rounded-md shadow-md">
          <h1 className="text-center text-[25px] mt-2 font-[700]">Book a Meeting</h1>
          <form action="">
            <div className="flex flex-col gap-4 mt-5">
              <input
                type="text"
                placeholder="Enter Full Name"
                className="ps-2 bg-[rgb(228,226,226)] rounded-sm h-10"
              />
              <input
                type="number"
                placeholder="Enter Mobile Number"
                className="ps-2 bg-[rgb(228,226,226)] rounded-sm h-10"
              />
              <input
                type="email"
                placeholder="Enter Email Address"
                className="ps-2 bg-[rgb(228,226,226)] rounded-sm h-10"
              />
              <input
                type="text"
                placeholder="Enter Subject"
                className="ps-2 bg-[rgb(228,226,226)] rounded-sm h-10"
              />
              <textarea
                name=""
                id=""
                placeholder="Enter Your Message"
                className="h-24 bg-[rgb(228,226,226)] ps-2 rounded-sm"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-indigo-500 w-full lg:w-32 mt-5 rounded-md h-10 text-white hover:bg-indigo-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default Contact;
