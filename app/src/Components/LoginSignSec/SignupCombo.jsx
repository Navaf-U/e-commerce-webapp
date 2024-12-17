import Loading from "../Loading/Loading";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { userData } from "../../context/UserContext";
import { toast } from "react-toastify";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";


function SignupCombo() {
  const { registerUser, loading } = useContext(userData);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlerEvent = async (e) => {
    e.preventDefault();
    const { name, email, password, cPassword } = formData;
    if (password === cPassword) {
      registerUser(name, email, password);
    } else {
      toast.error("Password does not match");
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="login-signup w-full min-h-screen pt-16 pb-20">
          <form onSubmit={handlerEvent}>
            <div className="login-cont w-[90%] max-w-[580px] h-auto bg-white m-auto px-6 py-10 md:px-10 md:py-14">
              <h1 className="pb-5 font-bold text-2xl md:text-4xl">Sign Up</h1>
              <hr className="border-t-4 border-b-2 border-l border-[#7D0A0A]" />
              <br />
              <div className="loginsignup-fields flex flex-col gap-6">
                <input
                  type="text"
                  id="signup-name"
                  name="name"
                  required
                  placeholder="Your Name"
                  onChange={handleChange}
                  className="bg-gray-200 h-14 md:h-16 w-full ps-5 border-gray-500 outline-none text-[#5c5c5c] text-base md:text-lg"
                />
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  required
                  placeholder="Email Address"
                  onChange={handleChange}
                  className="bg-gray-200 h-14 md:h-16 w-full ps-5 border-gray-500 outline-none text-[#5c5c5c] text-base md:text-lg"
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="signup-password"
                    name="password"
                    required
                    placeholder="Password"
                    onChange={handleChange}
                    className="bg-gray-200 h-14 md:h-16 w-full ps-5 border-gray-500 outline-none text-[#5c5c5c] text-base md:text-lg"
                  />
                  <span
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#7D0A0A]"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ?  <FaEyeSlash size={23} />  : <IoEyeSharp size={23} /> }
                  </span>
                </div>
                <input
                  type="password"
                  id="signup-cpassword"
                  name="cPassword"
                  required
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  className="bg-gray-200 h-14 md:h-16 w-full ps-5 border-gray-500 outline-none text-[#5c5c5c] text-base md:text-lg"
                />
              </div>
              <button className="w-full h-14 md:h-16 text-white bg-[#BF3131] hover:bg-[#7D0A0A] focus:ring-4 focus:ring-blue-300 mt-6 text-xl md:text-2xl font-medium">
                Continue
              </button>
              <p className="loginsignup-login mt-5 text-[#5c5c5c] text-base md:text-lg font-medium">
                Already have an account?
                <NavLink to="/login">
                  <button className="text-[#ff4141] font-semibold">
                    Login here
                  </button>
                </NavLink>
              </p>
              <div className="loginsignup-agree flex items-center mt-6 gap-5 text-[#5c5c5c] text-base md:text-lg font-medium">
                <input type="checkbox" required />
                <p>
                  By proceeding, you acknowledge acceptance of our
                  <span className="text-[#ff4141] font-semibold">
                    terms of use
                  </span>
                  &
                  <span className="text-[#ff4141] font-semibold">
                    privacy policy
                  </span>
                </p>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default SignupCombo;
