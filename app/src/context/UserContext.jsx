import Cookies from "js-cookie";
import axiosErrorManager from "../util/axiosErrorManage";
import axiosInstance from "../util/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const userData = createContext();

// eslint-disable-next-line react/prop-types
function UserContext({ children }) {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const isAdmin = currUser !== null && currUser.role === "admin" ? true : false;

  useEffect(() => {
    const cookieUser = Cookies.get("currentUser");
    if (cookieUser) {
      try {
        setCurrUser(JSON.parse(cookieUser));
      } catch (error) {
        console.error("Failed to parse currentUser cookie:", error);
      }
    }
  }, []);

  const loginUser = async (email, password) => {
    try {
      await axiosInstance.post("auth/login",
        { email, password },
        { withCredentials: true }
      );
      const cookieUser = Cookies.get("currentUser");
      setCurrUser(JSON.parse(cookieUser));
      navigate("/")
      toast.success("Logged in successfully");
      await getUserCart();
    } catch (err) {
      toast.error(axiosErrorManager(err));
    }
  };
  const logoutUser = async () => {
    try {
      // Call the logout API on the server
      await axiosInstance.post(
        "auth/logout",
        {},
        { withCredentials: true }
      );
      navigate("/"); // Navigate to the homepage or login page
      toast.success("Logged out successfully");
      setCurrUser(null);
    } catch (err) {
      toast.error(axiosErrorManager(err));
    }
  };

  const getUserWishList = async () => {
    try {
      const data = await axiosInstance.get(`user/wishlist`);
      setWishlist(data.data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserWishList();
  }, []);

  const addToWishlist = async (id) => {
    try {
      await axiosInstance.post(`user/wishlist`, {
        productID: id,
      });
      await getUserWishList();
      toast.success("Product added to wishlist");
    } catch (error) {
      toast.error(axiosErrorManager(error));
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      const res = await axiosInstance.delete(`user/wishlist`, {
        data: { productID: id },
      });
      await getUserWishList();
      toast.success(res.data.message);
    } catch (error) {
      console.error(axiosErrorManager(error));
    }
  };

  //cart section

  const getUserCart = async () => {
    try {
      const data = await axiosInstance.get(`/user/cart`);
      setCart(data.data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserCart();
  }, []);

  const addToCart = async (id, q) => {
    try {
      const res = await axiosInstance.post(
        `user/cart`,
        {
          productID: id,
          quantity: q,
        }
      );
      await getUserCart();
      toast.success(res.data.message);
    } catch (error) {
      toast.error(axiosErrorManager(error));
    }
  };

  const removeFromCart = async (id) => {
    try {
      const res = await axiosInstance.delete(`user/cart`, {
        data: { productID: id },
      });
      await getUserCart();
      toast.success(res.data.message);
    } catch (error) {
      console.error(axiosErrorManager(error));
    }
  };

  //updating cart quantity

  const registerUser = async (name, email, password) => {
    const data = {
      name: name,
      email: email,
      password: password,
    };

    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "auth/register",
        data
      );
      navigate("/login")
      toast.success(response.data.message);
    } catch (error) {
      toast.error(axiosErrorManager(error));
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currUser,
    setCurrUser,
    loginUser,
    logoutUser,
    registerUser,
    loading,
    setLoading,
    cart,
    setCart,
    wishlist,
    addToCart,
    removeFromCart,
    removeFromWishlist,
    addToWishlist,
    isAdmin,
  };

  return <userData.Provider value={value}>{children}</userData.Provider>;
}

export default UserContext;
