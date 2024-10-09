import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const userData = createContext();

// eslint-disable-next-line react/prop-types
function UserContext({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState({});

  const loginUser = async (email, password) => {
    try {
      const { data } = await axios.get("http://localhost:3000/allUsers");
      const user = data.find((item) => item.email === email && item.password === password);
      if (user) {
        if (user.isBlocked) {
          return toast.error("Access Denied");
        }
        if (user.isAdmin) {
          toast.success("ADMIN IS LOGGED");
        }
        setIsLogged(true);
        setCurrUser(user);
        setCart(user.cart || {});
        localStorage.setItem("isLogged", "true");
        localStorage.setItem("currUser", JSON.stringify(user));
        const storedCart = JSON.parse(localStorage.getItem(`${user.email}_cart`)) || {};
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
    const confirmLogout = confirm("You are going to log out. Do you want to continue?");
    if (confirmLogout) {
      setCurrUser(null);
      setIsLogged(false);
      setCart({});
      localStorage.removeItem("isLogged");
      localStorage.removeItem("currUser");
      localStorage.removeItem("cart");
    }
  };

  useEffect(() => {
    const logged = localStorage.getItem("isLogged") === "true";
    const saveLog = JSON.parse(localStorage.getItem("currUser"));

    const getCart = async (userId) => {
      const { data } = await axios.get(`http://localhost:3000/allUsers/${userId}`);
      setCart(data.cart || {});
    };

    if (logged && saveLog) {
      setIsLogged(true);
      setCurrUser(saveLog);
      const storedCart = JSON.parse(localStorage.getItem(`${saveLog.email}_cart`)) || {};
      setCart(storedCart);
      getCart(saveLog.id);
    }
  }, []);

  const updateCartInLocalStorage = (updatedCart) => {
    if (currUser) {
      localStorage.setItem(`${currUser.email}_cart`, JSON.stringify(updatedCart));
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
        axios.patch(`http://localhost:3000/allUsers/${currUser.id}`, {
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
        updatedCart[id] -= updatedCart[id];
      }
      updateCartInLocalStorage(updatedCart);
      axios.patch(`http://localhost:3000/allUsers/${currUser.id}`, {
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
      return updatedCart;
    });
  };

  const cartItemNotify = () => {
    let totalNotify = 0;
    for (let i in cart) {
      if (cart[i] > 0) {
        totalNotify += cart[i];
      }
    }
    return totalNotify;
  };

  const PostUserDatas = (name, email, password, cart) => {
    const data = {
      name: name,
      email: email,
      password: password,
      cart: cart,
      isAdmin: false,
      isBlocked: false,
    };
    const postData = async () => {
      try {
        setLoading(true);
        await axios.post("http://localhost:3000/allUsers", data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    postData();
  };

  const value = {
    currUser,
    isLogged,
    loginUser,
    logoutUser,
    PostUserDatas,
    loading,
    setLoading,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartItemNotify,
  };

  return (
    <userData.Provider value={value}>{children}</userData.Provider>
  );
}

export default UserContext;
