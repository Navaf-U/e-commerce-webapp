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
    <div>
      <h1>Success, your payment was processed!</h1>
    </div>
  );
}

export default StripeSuccess;
