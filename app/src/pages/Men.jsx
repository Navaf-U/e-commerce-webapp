import { useContext } from "react";
import { ProductsData } from "../context/ProductsCont";
import Card from "../Components/Shared/Card";
import { NavLink } from "react-router-dom";

function Men() {
  const { products } = useContext(ProductsData);

  return (
    <div className="flex flex-wrap">
      {products.map((item) => {
        if (item.type === "men") {
          return (
            <NavLink key={item.id} to={`/products/${item.id}`}>
              <Card key={item.id} 
              id={item.id}
              image={item.image}
              price={item.price} 
              name={item.name} 
              />
            </NavLink>
          );
        }
      })}
      
    </div>
  );
}

export default Men;
