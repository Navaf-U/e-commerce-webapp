import { useContext } from "react";
import { ProductsData } from "../context/ProductsCont";
import Card from "../Components/Shared/Card";
import { userData } from "../context/UserContext";

function Men() {
  const { products } = useContext(ProductsData);
  const { loading } = useContext(userData);
  return (
    <div className="flex flex-wrap">
      {loading && (
        <div className="text-center py-2 text-[40px]">Loading user data...</div>
      )}
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
