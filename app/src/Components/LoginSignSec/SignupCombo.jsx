import axios from "axios";
import Loading from "../Loading/Loading";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userData } from "../../context/UserContext";
import { toast } from "react-toastify";

function SignupCombo() {
  const { PostUserDatas ,setLoading,loading} = useContext(userData);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlerEvent = async(e) => {
    e.preventDefault();
    const cart = {};
    setLoading(true);
    try{
      const allUsersRes = await axios.get(
        "http://localhost:4000/allUsers"
      );
      const allUsers = allUsersRes.data;
      const isUserExists = allUsers.find((user) => user.email === email);
      if (isUserExists) {
        toast.error("Email already exists. Please use a different email.");
        setLoading(false);
        return;
      }
    }catch(err){
      console.log(err);
      
    }finally{
      setLoading(false)
    }
    if (password === cpassword) {
      PostUserDatas(name, email, password, cart, profilePhoto);
      toast.success("New account created.. Please login");
      navigate("/login");
    } else {
      toast.error("password not matching");
    }
  };

  return (
    <div>
      {loading ? <Loading /> :(
        <div className="login-signup w-full min-h-screen pt-16 pb-20">
        <form onSubmit={handlerEvent}>
          <div className="login-cont w-[90%] max-w-[580px] h-auto bg-white m-auto px-6 py-10 md:px-10 md:py-14">
            <h1 className="pb-5 font-bold text-2xl md:text-4xl">Sign Up</h1>
            <hr className="border-t-4 border-b-2 border-l border-[#7D0A0A]" />
            <br />
            <div className="loginsignup-fields flex flex-col gap-6">
              <input
                type="file"
                id="user-pfp"
                onChange={handleFileChange}
                className="bg-gray-200 h-14 md:h-16 w-full ps-5 border-gray-500 outline-none text-[#5c5c5c] text-base md:text-lg"
              />
              {profilePhoto && (
                <div className="flex justify-center mt-2">
                  <img
                    src={profilePhoto}
                    alt="Preview"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
              )}
              <input
                type="text"
                id="signup-name"
                required
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-200 h-14 md:h-16 w-full ps-5 border-gray-500 outline-none text-[#5c5c5c] text-base md:text-lg"
              />
              <input
                type="email"
                id="signup-email"
                required
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-200 h-14 md:h-16 w-full ps-5 border-gray-500 outline-none text-[#5c5c5c] text-base md:text-lg"
              />
              <input
                type="password"
                id="signup-password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-200 h-14 md:h-16 w-full ps-5 border-gray-500 outline-none text-[#5c5c5c] text-base md:text-lg"
              />
              <input
                type="password"
                id="signup-cpassword"
                required
                placeholder="Confirm Password"
                onChange={(e) => setCpassword(e.target.value)}
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
