import { useContext, useEffect, useState, createContext } from "react";
import axios from "axios";
import { userData } from "./UserContext";

export const ProductsData = createContext();


// eslint-disable-next-line react/prop-types
function ProductsCont({ children }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  
  const { currUser,cart,setLoading } = useContext(userData) || {};


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

  
  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true)
      try {
        const {data} = await axios.get("http://localhost:3000/newProducts");
        setProducts(data);

      } catch (err) {
        console.log(err);
      }finally{
        setLoading(false)
      }
    };
    fetchProductsData();
  }, [currUser, setLoading]);



  const currency = "₹";

  const value = {
    currency,
    products,
    search,
    setSearch,
    getTotalCartAmount,
  };

  return (
    <div>
      <ProductsData.Provider value={value}>{children}</ProductsData.Provider>
    </div>
  );
}

export default ProductsCont;
