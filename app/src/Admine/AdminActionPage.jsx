import { useContext } from "react";
import { ProductsData } from "../context/ProductsCont";
import { useParams } from "react-router-dom";

function AdminActionPage() {
  const { id } = useParams();
  const { products } = useContext(ProductsData);
  const productFound = products.find((item) => item.id === id);
  return (
    <div>
      {!products.length ? <p>loading....</p> : !productFound ? <h1>not found</h1> :
        <div key={productFound.id}>
          
          <img src={productFound.image} className="w-[130px]" alt="" />
          
          {productFound.name}

        </div>
       }
    </div>
  );
}

export default AdminActionPage;
