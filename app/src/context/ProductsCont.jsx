import axios from "axios";
import { useContext, useEffect, useState, createContext } from "react";
import { userData } from "./UserContext";

export const ProductsData = createContext();

// eslint-disable-next-line react/prop-types
function ProductsCont({ children }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const { currUser, cart, setLoading } = useContext(userData) || {};

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
      const productExist = products.find((item) => item.id == i);

      if (cart[i] > 0 && productExist) {
        totalNotify += cart[i];
      }
    }
    return totalNotify;
  };

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:4000/newProducts");
        setProducts(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsData();
  }, [currUser, setLoading]);

  const PostProducts = (
    name,
    type,
    image,
    price,
    rating,
    reviews,
    brand,
    description
  ) => {
    const datas = {
      name: name,
      type: type,
      image: image,
      price: price,
      rating: rating,
      reviews: reviews,
      brand: brand,
      description: description,
    };

    const AddProducts = async () => {
      setLoading(true);
      try {
        await axios.post("http://localhost:4000/newProducts", datas);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    AddProducts();
  };

  const currency = "₹";

  const value = {
    currency,
    products,
    search,
    setSearch,
    getTotalCartAmount,
    PostProducts,
    cartItemNotify,
  };

  return (
    <div>
      <ProductsData.Provider value={value}>{children}</ProductsData.Provider>
    </div>
  );
}

export default ProductsCont;
