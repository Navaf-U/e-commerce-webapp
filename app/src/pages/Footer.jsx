import { FaInstagramSquare, FaPinterest, FaWhatsappSquare } from "react-icons/fa";
import footerImage from "../Components/assets/footer.jpg";

function Footer() {
  return (
    <div className="main-footer flex flex-col items-center gap-10 px-4 md:px-10">
      <div className="footer-logo flex items-center gap-4">
        <img src={footerImage} alt="" className="h-16 w-16 md:h-20 md:w-20" />
        <p className="text-3xl md:text-4xl text-[#383838] font-bold">PIPI</p>
      </div>
      <ul className="flex flex-col md:flex-row list-none gap-10 text-[#252525] text-lg">
        <li className="cursor-pointer">Company</li>
        <li className="cursor-pointer">Products</li>
        <li className="cursor-pointer">Offices</li>
        <li className="cursor-pointer">About</li>
        <li className="cursor-pointer">Contact</li>
      </ul>
      <div className="footer-social-icons flex gap-4">
        <div className="footer-icons p-4 bg-[#fbfbfb] border border-solid border-[#ebebeb] rounded-full">
          <FaInstagramSquare className="text-2xl text-[#E4405F]" />
        </div>
        <div className="footer-icons p-4 bg-[#fbfbfb] border border-solid border-[#ebebeb] rounded-full">
          <FaPinterest className="text-2xl text-[#E60023]" />
        </div>
        <div className="footer-icons p-4 bg-[#fbfbfb] border border-solid border-[#ebebeb] rounded-full">
          <FaWhatsappSquare className="text-2xl text-[#25D366]" />
        </div>
      </div>
      <div className="footer-copyright flex justify-center items-center gap-6 w-full mb-8 text-[#1a1a1a] text-lg">
        <hr className="w-[40%] border-none rounded-full h-2 bg-[#c7c7c7]" />
        <p>&copy; {new Date().getFullYear()} Navaf. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
