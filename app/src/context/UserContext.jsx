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
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});
  const navigate = useNavigate()

  const isAdmin = currUser !== null && currUser.role ? "admin" : "user";


  useEffect(() => {
    const cookieUser = Cookies.get("currentUser");
    console.log("token is",cookieUser)
    if (cookieUser) {
      try {
        setCurrUser(JSON.parse(cookieUser));
      } catch (error) {
        console.error("Failed to parse currentUser cookie:", error);
      }
    }
  }, []);

console.log("currUser",currUser)

const loginUser = async (email, password) => {
  try {
     await axios.post(
      "http://localhost:3000/auth/login",
      { email, password },
      { withCredentials: true }
    );
    const cookieUser = Cookies.get("currentUser");
    setCurrUser(JSON.parse(cookieUser));
    navigate("/");  // Navigate to the homepage or login page
    toast.success("Logged in successfully");
  } catch (err) {
    toast.error(axiosErrorManager(err));
  }
}
const logoutUser = async () => {
  try {
    // Call the logout API on the server
    await axios.post("http://localhost:3000/auth/logout",{},{withCredentials: true});
    navigate("/");  // Navigate to the homepage or login page
    toast.success("Logged out successfully");
    setCurrUser(null);
  } catch (err) {
    console.error(err, ": error in logout");
    toast.error("Error logging out");
  }
};


  useEffect(() => {
    const logged = localStorage.getItem("isLogged") === "true";
    const saveLog = JSON.parse(localStorage.getItem("currUser"));

    const getCart = async (userId) => {
      setLoading(true)
      try{
        const { data } = await axios.get(
          `http://localhost:4000/allUsers/${userId}`
        );
        setCart(data.cart || {});
      }catch(err){
        console.log(err);
        
      }finally{
        setLoading(false)
      }
      }

    if (logged && saveLog){
      setCurrUser(saveLog);
      const storedCart =
        JSON.parse(localStorage.getItem(`${saveLog.email}_cart`)) || {};
      setCart(storedCart);
      getCart(saveLog.id);
    }
  }, []);

  const updateCartInLocalStorage = (updatedCart) => {
    if (currUser){
      localStorage.setItem(
        `${currUser.email}_cart`,
        JSON.stringify(updatedCart)
      );
    }
  };

  const addToCart = (id, quantity) => {
    if (currUser) {
      setCart((prev) => {
        const existingQuant = prev[id] || 0;
        const updatedCart = {
          ...prev,
          [id]: existingQuant + quantity,
        };
        updateCartInLocalStorage(updatedCart);
        axios.patch(`http://localhost:4000/allUsers/${currUser.id}`, {
          cart: updatedCart,
        });
        return updatedCart;
      });
    } else {
      toast.alert("please login");
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[id] > 0) {
        delete updatedCart[id];
      }
      updateCartInLocalStorage(updatedCart);
      axios.patch(`http://localhost:4000/allUsers/${currUser.id}`, {
        cart: updatedCart,
      });
      return updatedCart;
    });
  };

  const increaseQuantity = (id) => {
    setCart((oldCart) => {
      const updatedCart = {
        ...oldCart,
        [id]: (oldCart[id] || 0) + 1,
      };
      updateCartInLocalStorage(updatedCart);
      axios.patch(`http://localhost:4000/allUsers/${currUser.id}`, {
        cart: updatedCart,
      });
      return updatedCart;
    });
  };

  const decreaseQuantity = (id) => {
    setCart((oldCart) => {
      const updatedCart = {
        ...oldCart,
        [id]: oldCart[id] > 1 ? oldCart[id] - 1 : 1,
      };
      updateCartInLocalStorage(updatedCart);
      axios.patch(`http://localhost:4000/allUsers/${currUser.id}`, {
        cart: updatedCart,
      });
      return updatedCart;
    });
  };

  const PostUserDatas = async (name, email, password) => {
    const data = {
      name: name,
      email: email,
      password: password,
    };

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/auth/register", data);
        toast.success("User registered successfully");
        setCurrUser(response.data);
      }catch (error) {
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
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    isAdmin,
  };

  return <userData.Provider value={value}>{children}</userData.Provider>;
}

export default UserContext;
