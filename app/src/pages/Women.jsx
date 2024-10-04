import { useContext } from "react";
import { ProductsData } from "../context/ProductsCont";
import Card from "../Components/Shared/Card";
import { userData } from "../context/UserContext";

function Women() {
  const { products } = useContext(ProductsData);
  const {loading} = useContext(userData);
  return (
    <div className="flex flex-wrap">\
    {loading && <div className="text-center py-2 text-[40px]">Loading user data...</div>}
      {products.map((item) => {
        if (item.type === "women") {
          return (
            <Card
              key={item.id}
              image={item.image}
              id={item.id}
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
