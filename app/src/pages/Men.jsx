import { useContext } from "react";
import { ProductsData } from "../context/ProductsCont";
import Card from "../Components/Shared/Card";

function Men() {
  const { products } = useContext(ProductsData);

  return (
    <div className="flex flex-wrap">
      {products.map((item) => {
        if (item.type === "men") {
          return (
            <Card
              key={item.id}
              id={item.id}
              image={item.image}
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
