import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../util/axiosInstance";
import { toast } from "react-toastify";
import axiosErrorManager from "../util/axiosErrorManage";
import { userData } from "../context/UserContext";

function StripeSuccess() {
  const { sessionID } = useParams();
  const {setCart} = useContext(userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionID) {
      toast.error("Session ID is missing.");
      navigate("/"); 
      return;
    }
    const success = async () => {
      try {
        const { data } = await axiosInstance.patch(`/user/orders/stripe/success/${sessionID}`);
        setCart([]);
        window.location.reload();
        navigate("/orders");
        toast.success(data.message);
      } catch (err) {
        toast.error(axiosErrorManager(err));
      }
    };
    success();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionID]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full animate-fadeIn">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-700">
          Your payment was processed successfully. You will be redirected to your orders shortly.
        </p>
        <div className="mt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4M7 12l-2-2 6-6m8 10l-6 6-2-2-4 4"
            />
          </svg>
        </div>
      </div>
    </div>
  );  
}

export default StripeSuccess;
