import { useContext } from "react";
import { ProductsData } from "../context/ProductsCont";
import Card from "../Components/Shared/Card";
import { userData } from "../context/UserContext";
import Loading from "../Components/Loading/Loading";

function Women() {
  const { products } = useContext(ProductsData);
  const {loading} = useContext(userData);
  return (
    <div className="flex flex-wrap justify-center">
    {loading && <Loading/>}
      {products.map((item) => {
        if (item.type === "women") {
          return (
            <Card
              key={item.id}
              image={item.image}
              id={item.id}
              rating={item.rating}
              name={item.name}
              price={item.price}
            />
          );
        }
      })}
    </div>
  );
}

export default Women;
