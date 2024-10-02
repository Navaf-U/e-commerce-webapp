import { useState } from "react";

const LoginSignup = () => {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <div>
      {isLogged === true ? (
        <div className="login-signup w-full min-h-screen pt-16 pb-20">
          <form action="">
            <div className="login-cont w-[90%] max-w-[580px] h-auto bg-white m-auto px-6 py-10 md:px-10 md:py-14">
              <h1 className="pb-5 font-bold text-2xl md:text-4xl">Sign Up</h1>
              <hr className="border-t-4 border-b-2 border-l border-[#7D0A0A]" />
              <br />
              <div className="loginsignup-fields flex flex-col gap-6">
                <input
                  className="bg-gray-200 h-14 md:h-16 w-full ps-5 border-gray-500 outline-none text-[#5c5c5c] text-base md:text-lg"
                  type="text" id="signup-name"
                  required
                  placeholder="Your Name"
                />
                <input
                  className="bg-gray-200 h-14 md:h-16 w-full ps-5 border-gray-500 outline-none text-[#5c5c5c] text-base md:text-lg"
                  type="email"
                  id="signup-email"
                  required
                  placeholder="Email Address"
                />
                <input
                  className="bg-gray-200 h-14 md:h-16 w-full ps-5 border-gray-500 outline-none text-[#5c5c5c] text-base md:text-lg"
                  type="password"
                  id="signup-password"
                  required
                  placeholder="Password"
                />
                <input
                  className="bg-gray-200 h-14 md:h-16 w-full ps-5 border-gray-500 outline-none text-[#5c5c5c] text-base md:text-lg"
                  type="password" id="signup-cpassword"
                  required
                  placeholder="Confirm Password"
                />
              </div>
              <button className="w-full h-14 md:h-16 text-white bg-[#BF3131] hover:bg-[#7D0A0A] focus:ring-4 focus:ring-blue-300 mt-6 text-xl md:text-2xl font-medium">
                Continue
              </button>
              <p className="loginsignup-login mt-5 text-[#5c5c5c] text-base md:text-lg font-medium">
                Already have an account?
                <button
                  onClick={() => setIsLogged(!isLogged)}
                  className="text-[#ff4141] font-semibold"
                >
                  Login here
                </button>
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
      ) : (
        <div className="login-signup w-full min-h-screen pt-16 pb-20">
          <form action="">
            <div className="login-cont w-[90%] max-w-[580px] h-auto bg-white m-auto px-6 py-10 md:px-10 md:py-14">
              <h1 className="pb-5 font-bold text-2xl md:text-4xl">Login</h1>
              <hr className="border-t-4 border-b-2 border-l border-[#7D0A0A]" />
              <br />
              <div className="loginsignup-fields flex flex-col gap-6">
                <input
                  className="pb-5 bg-gray-200 h-14 md:h-16 w-full ps-5 border-gray-500 outline-none text-[#5c5c5c] text-base md:text-lg"
                  type="email"
                  id="login-email"
                  required
                  placeholder="Email Address"
                />
                <input
                  className="bg-gray-200 h-14 md:h-16 w-full ps-5 border-gray-500 outline-none text-[#5c5c5c] text-base md:text-lg"
                  type="password"
                  id="login-password"
                  required
                  placeholder="Password"
                />
              </div>
              <button className="w-full h-14 md:h-16 text-white bg-[#BF3131] hover:bg-[#7D0A0A] focus:ring-4 focus:ring-blue-300 mt-6 text-xl md:text-2xl font-medium">
                Continue
              </button>
              <p className="loginsignup-login mt-5 text-[#5c5c5c] text-base md:text-lg font-medium">
                {`Don't have an account?`}
                <button
                  onClick={() => setIsLogged(!isLogged)}
                  className="text-[#ff4141] font-semibold"
                >
                  Sign up here
                </button>
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
};

export default LoginSignup;
