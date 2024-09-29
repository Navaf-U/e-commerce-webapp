import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductsData } from "../context/ProductsCont";

function Product() {
  const {id} = useParams()
  const {products} = useContext(ProductsData)
  const findProduct = products.find((item)=>{
    return item.id===id
  })
  
  return (
    
    <div className="flex justify-between">
      <div className="left-section">
          <img  src={findProduct.image} alt=""
          />
          <h3>{findProduct.price}</h3>
      </div>
      <div className="right-section">
        quantity
        <br />
          <button>Add to Cart</button>
      </div>
    </div>
  );
}

export default Product;
