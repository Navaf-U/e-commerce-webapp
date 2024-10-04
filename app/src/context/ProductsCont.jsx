import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { userData } from "./UserContext";
export const ProductsData = createContext();

function ProductsCont({ children }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const {currUser}=useContext(userData)

  const getTotalCartAmount = () => {
    let total = 0;
    products.forEach((item) => {
      const quantity = cart[item.id];
      if (quantity) {
        total += item.price * quantity;
      }
    });
    return total;
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

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const resp = await axios.get("http://localhost:3000/newProducts");
        setProducts(resp.data);
        let storedCart={}
        if (currUser) {
           storedCart = JSON.parse(localStorage.getItem(`${currUser.email}_cart`)) || {};
        }
        let defaultCart = {};
        resp.data.forEach((item) => {
          defaultCart[item.id] = storedCart[item.id] || 0;
        });
        setCart(defaultCart);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductsData();
  }, [currUser]);

  useEffect(() => {
    if (products.length > 0 && currUser) {
      localStorage.setItem(`${currUser.email}_cart`, JSON.stringify(cart));
    }
  }, [cart,currUser,products]);

  const addToCart = (id, quantity) => {
    setCart((prev) => {
      const exitingQuant = (prev[id] || 0  );
      const newCart = {
        ...prev,
        [id]: exitingQuant + quantity,
      };
      return newCart;
    });
  };
  const removeFromCart = (id) => {
    setCart((prev) => {
      const cartNew = { ...prev };
      if (cartNew[id] > 0) {
        cartNew[id] -= 1;
      }
      return cartNew;
    });
  };
  const currency = "₹";
  const value = {
    currency,
    products,
    search,
    setSearch,
    cart,
    setCart,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    cartItemNotify,
  };

  return (
    <div>
      <ProductsData.Provider value={value}>{children}</ProductsData.Provider>
    </div>
  );
}

export default ProductsCont;
