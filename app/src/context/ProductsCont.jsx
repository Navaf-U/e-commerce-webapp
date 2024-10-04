import { useContext, useEffect, useState, createContext } from "react";
import axios from "axios";
import { userData } from "./UserContext";

export const ProductsData = createContext();

// const cartUpdater=(userId,updatedCart)=>{
//    axios.patch(`http://localhost:3000/allUsers/${userId}`,{cart:updatedCart})
//    .catch((err)=>console.log(err))
// }


// eslint-disable-next-line react/prop-types
function ProductsCont({ children }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  
  const { currUser,cart } = useContext(userData) || {};


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

  // useEffect(()=>{
  //   cart?localStorage.setItem("cart",JSON.stringify(cart)):null
  // },[cart])
  // useEffect(()=>{
  //   currUser?cartUpdater(currUser.id,cart):null
  // },[cart,currUser])
  
  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const resp = await axios.get("http://localhost:3000/newProducts");
        setProducts(resp.data);

      } catch (err) {
        console.log(err);
      }
    };
    fetchProductsData();
  }, [currUser]);



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
