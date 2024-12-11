import { useContext, useEffect, useState, createContext } from "react";
import { userData } from "./UserContext";
import axiosInstance from "../util/axiosInstance";
import axiosErrorManager from "../util/axiosErrorManage";
import { toast } from "react-toastify";

export const ProductsData = createContext();

// eslint-disable-next-line react/prop-types
function ProductsCont({ children }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const { currUser, setLoading } = useContext(userData) || {};

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get("/user/products");
        setProducts(data.data);
      } catch (err) {
        toast.error(axiosErrorManager(err));
      } finally {
        setLoading(false);
      }
    };
    fetchProductsData();
  }, [currUser, setLoading]);

   
  const currency = "₹";

  const value = {
    currency,
    products,
    setProducts,
    search,
    setSearch,
  };

  return (
    <div>
      <ProductsData.Provider value={value}>{children}</ProductsData.Provider>
    </div>
  );
}

export default ProductsCont;
