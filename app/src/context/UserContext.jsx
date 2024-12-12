/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from "js-cookie";
import axiosErrorManager from "../util/axiosErrorManage";
import axiosInstance from "../util/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
// eslint-disable-next-line react-refresh/only-export-components
export const userData = createContext();

// eslint-disable-next-line react/prop-types
function UserContext({ children }) {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartLengthCheck, setCartLengthCheck] = useState(0);
  const [wishlistLengthCheck, setWishlistLengthCheck] = useState(0);
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
    } else {
      setCurrUser(null); // Automatically update UI when cookie is removed
    }
  }, [Cookies.get("currentUser")]); // Depend on the currentUser cookie


  const registerUser = async (name, email, password) => {
    const data = {
      name: name,
      email: email,
      password: password,
    };

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        data
      );
      navigate("/login");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(axiosErrorManager(error));
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      await axios.post(
        "http://localhost:3000/auth/login",
        { email, password },
        { withCredentials: true }
      );
      const cookieUser = Cookies.get("currentUser");
      setCurrUser(JSON.parse(cookieUser));
      navigate("/");
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error(axiosErrorManager(err));
    }
  };
  const logoutUser = async () => {
    try {
      // Call the logout API on the server
      await axiosInstance.post("auth/logout", {}, { withCredentials: true });
      navigate("/"); // Navigate to the homepage or login page
      toast.success("Logged out successfully");
      setCurrUser(null);
    } catch (err) {
      toast.error(axiosErrorManager(err));
    }
  };

  const adminLogin = async (email, password) => {
    try {
      await axios.post(
        "http://localhost:3000/admin/login",
        { email, password },
        { withCredentials: true }
      );
      const cookieAdmin = Cookies.get("currentUser");
      setCurrUser(JSON.parse(cookieAdmin));
      navigate("/");
      toast.success("Admin logged in successfully");
    } catch (err) {
      toast.error(axiosErrorManager(err));
    }
  };

  const getUserWishList = async () => {
    if (currUser) {
      try {
        const data = await axiosInstance.get(`user/wishlist`);
        const fetchedWishlist = data.data?.products || [];
        setWishlist(fetchedWishlist);
        setWishlistLengthCheck(fetchedWishlist.length); // Update length here
      } catch (error) {
        toast.error(axiosErrorManager(error));
      }
    }
  };
  

  useEffect(() => {
    getUserWishList();
  }, [currUser]);

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
    if (currUser) {
      try {
        const data = await axiosInstance.get(`/user/cart`);
        setCart(data.data?.products);
        setCartLengthCheck(data.data?.products.length);
      } catch (error) {
        toast.error(axiosErrorManager(error));
      }
    }
  };

  useEffect(() => {
    getUserCart();
  }, [currUser]);

  const addToCart = async (id, q) => {
    try {
      const res = await axiosInstance.post(`user/cart`, {
        productID: id,
        quantity: q,
      });
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

  const value = {
    currUser,
    setCurrUser,
    registerUser,
    loginUser,
    logoutUser,
    adminLogin,
    loading,
    setLoading,
    cart,
    setCart,
    cartLengthCheck,
    addToCart,
    removeFromCart,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    wishlistLengthCheck,
    isAdmin,
  };

  return <userData.Provider value={value}>{children}</userData.Provider>;
}

export default UserContext;
