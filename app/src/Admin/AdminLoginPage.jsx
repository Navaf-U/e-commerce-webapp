import { useContext, useState } from "react";
import { userData } from "../context/UserContext";
import axiosErrorManager from "../util/axiosErrorManage";
import { toast } from "react-toastify";

function AdminLogin() {
  const { adminLogin } = useContext(userData);
  // const { isLogged } = useContext(userData);
  const [email, setEmail] = useState("");
  // const navigates = useNavigate();
  const [password, setPassword] = useState("");
  // const [, setIsLogged] = useState(false);
  const handleFunc = async (e) => {
    e.preventDefault();
    try {
      await adminLogin(email, password);
    } catch (err) {
      toast.error(axiosErrorManager(err));
    }
  };
  return (
    <div>
      <div className="login-signup w-full min-h-screen pt-16 pb-20">
        <form action="" onSubmit={handleFunc}>
          <div className="login-cont w-[90%] max-w-[580px] h-auto bg-white m-auto px-6 py-10 md:px-10 md:py-14">
            <h1 className="pb-5 font-bold text-2xl md:text-4xl text-center">
              Admin Login
            </h1>
            <hr className="border-t-4 border-b-2 border-l border-[cyan]" />
            <br />
            <div className="loginsignup-fields flex flex-col gap-6">
              <input
                className="pb-5 bg-gray-200 h-14 md:h-16 w-full ps-5 border-gray-500 outline-none text-[#5c5c5c] text-base md:text-lg"
                type="email"
                id="login-email"
                required
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="bg-gray-200 h-14 md:h-16 w-full ps-5 border-gray-500 outline-none text-[#5c5c5c] text-base md:text-lg"
                type="password"
                id="login-password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="w-full h-14 md:h-16 text-white bg-[cyan] hover:bg-[#039393] focus:ring-4 focus:ring-blue-300 mt-6 text-xl md:text-2xl font-medium">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
