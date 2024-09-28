import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductsData } from "../context/ProductsCont";

function Product() {
  const {id} = useParams()
  const {products} = useContext(ProductsData)
  const findProduct = products.find((item)=>{
    return item.key===id
  })
  
  return (
    
    <div className="flex justify-between">
      <div className="left-section">
          <img  src={findProduct.src} alt=""
          />
          <h3>$9018</h3>
      </div>
      <div className="right-section">
        8999kg
        <br />
        quantity
        <br />

          {/* quantity */}
          <button>Add to Cart</button>
      </div>
    </div>
  );
}

export default Product;
