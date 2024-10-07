import { useContext } from "react";
import { ProductsData } from "../context/ProductsCont";
import { useParams } from "react-router-dom";

function AdminActionPage() {
  const { id } = useParams();
  const { products } = useContext(ProductsData);


  const productFound = products.find((item) => item.id === id);

  return (
    <div>
      {!productFound.length > 0 ? <p>loading....</p> : (!productFound) ? <h1>not found</h1> :(

      productFound.map((item) => {
        return <h1 key={item.id}>{item.name}</h1>;
      })
      ) }
    </div>
  );
}

export default AdminActionPage;
