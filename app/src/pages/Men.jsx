import Card from "../Components/Shared/Card";
import Loading from "../Components/Loading/Loading";
import { useContext } from "react";
import { ProductsData } from "../context/ProductsCont";
import { userData } from "../context/UserContext";
import { productsJs } from "../Components/Shared/DataJson";

function Men() {
  const { products } = useContext(ProductsData);
  const { loading } = useContext(userData);
  const showProduct = products.length != 0 ? products : productsJs
  return (
    <>  
    <div className="flex w-full  justify-center items-center">
      {loading && <Loading />}
    </div>
    <div className="flex flex-wrap justify-center">
      {showProduct.map((item) => {
        if (item.type === "men") {
          return (
            <Card
              key={item.id}
              id={item.id}
              image={item.image}
              rating={item.rating}
              price={item.price}
              name={item.name}
            />
          );
        }
      })}
    </div>
    </>
  );
}

export default Men;
