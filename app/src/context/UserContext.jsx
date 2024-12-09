import axios from "axios";
import axiosErrorManager from "../util/axiosErrorManage";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
// eslint-disable-next-line react-refresh/only-export-components
export const userData = createContext();

// eslint-disable-next-line react/prop-types
function UserContext({ children }) {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const isAdmin = currUser !== null && currUser.role ? "admin" : "user";

  useEffect(() => {
    const cookieUser = Cookies.get("currentUser");
    // console.log("token is",cookieUser)
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
      await axios.post(
        "http://localhost:3000/auth/login",
        { email, password },
        { withCredentials: true }
      );
      const cookieUser = Cookies.get("currentUser");
      setCurrUser(JSON.parse(cookieUser));
      navigate("/"); // Navigate to the homepage or login page
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error(axiosErrorManager(err));
    }
  };
  const logoutUser = async () => {
    try {
      // Call the logout API on the server
      await axios.post(
        "http://localhost:3000/auth/logout",
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
        const token = Cookies.get("token");
        const data = await axios.get(`http://localhost:3000/user/wishlist`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setWishlist(data.data?.products);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getUserWishList();
    }, []);

   const removeFromWishist = async (id) => {
    const token = Cookies.get("token");
    try {
      const res = await axios.delete(`http://localhost:3000/user/wishlist`, {
        headers: { token: `Bearer ${token}` },
        data: { productID: id },
      });
      setWishlist(res.data.products);
      await getUserWishList();
      toast.success(res.data.message);
    } catch (error) {
      console.error(axiosErrorManager(error));
    }
   } 

   
   //cart section

   const getUserCart = async () => {
    try {
      const token = Cookies.get("token");
      const data = await axios.get(`http://localhost:3000/user/cart`, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      setCart(data.data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserCart();
  }, []);

  const addToCart = async(id,q) => {
    try {
      const token = Cookies.get("token");
      await axios.post(`http://localhost:3000/user/cart`, {
        productID:id,
        quantity:q 
       },
       { headers: { token: `Bearer ${token}` } },
       { withCredentials: true })
       setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
       await getUserCart();
      toast.success("Product added to cart");
    } catch (error) {
      toast.error(axiosErrorManager(error));
    }
  };


  const removeFromCart = async (id) => {
    const token = Cookies.get("token");
    try {
      const res = await axios.delete(`http://localhost:3000/user/cart`, {
        headers: { token: `Bearer ${token}` },
        data: { productID: id },
      });
      setCart(res.data.cart);
      await getUserCart();
      toast.success(res.data.message);
    } catch (error) {
      console.error(axiosErrorManager(error));
    }
  };

//updating cart quantity



  const PostUserDatas = async (name, email, password) => {
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
      toast.success("User registered successfully");
      setCurrUser(response.data);
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
    PostUserDatas,
    loading,
    setLoading,
    cart,
    setCart,
    wishlist,
    addToCart,
    removeFromCart,
    removeFromWishist,
    isAdmin,
  };

  return <userData.Provider value={value}>{children}</userData.Provider>;
}

export default UserContext;
