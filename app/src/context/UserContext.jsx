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
  const [isLogged, setIsLogged] = useState(false);
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
        setCurrUser(JSON.parse(decodeURIComponent(cookieUser)));
      } catch (error) {
        console.error("Failed to parse currentUser cookie:", error);
      }
    }
  }, []);

console.log("currUser",currUser)
  const loginUser = async (email, password) => {
    setLoading(true)
    try {
      const { data } = await axios.get("");
      const user = data.find(
        (item) => item.email === email && item.password === password
      );
      if (user) {
        if (user.isBlocked) {
          return toast.error("Access Denied");
        }
        if (user.isAdmin) {
          toast.success("ADMIN IS LOGGED");
        }

        if (!user.orders || !Array.isArray(user.orders)) {
          user.orders = [];
        }

        setIsLogged(true);
        setCurrUser(user);
        setCart(user.cart || {});
        navigate("/")
        localStorage.setItem("isLogged", "true");
        localStorage.setItem("currUser", JSON.stringify(user));
        const storedCart =
          JSON.parse(localStorage.getItem(`${user.email}_cart`)) || {};
        setCart(storedCart);
        localStorage.setItem("cart", JSON.stringify(storedCart));
        if (!user.isAdmin) {
          toast.success(`User logged in`);
        }
      } else {
        toast.error("Invalid Email or Password");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
      setCurrUser(null);
      setIsLogged(false);
      navigate("/")
      localStorage.removeItem("isLogged");
      localStorage.removeItem("currUser");
      localStorage.removeItem("cart");
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
      setIsLogged(true);
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
    isLogged,
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
