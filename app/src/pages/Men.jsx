import { useContext } from "react";
import { ProductsData } from "../context/ProductsCont";
import Card from "../Components/Shared/Card";
import { userData } from "../context/UserContext";
import Loading from "../Components/Loading/Loading";

function Men() {
  const { products } = useContext(ProductsData);
  const { loading } = useContext(userData);
  return (
    <div className="flex flex-wrap justify-center">
      {loading && <Loading />}
      {products.map((item) => {
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
  );
}

export default Men;
