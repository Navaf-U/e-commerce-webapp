import Loading from "../Components/Loading/Loading";
import Card from "../Components/Shared/Card";
import { useContext } from "react";
import { ProductsData } from "../context/ProductsCont";
import { userData } from "../context/UserContext";
import { productsJs } from "../Components/Shared/DataJson";
function Women() {
  const { products } = useContext(ProductsData);
  const {loading} = useContext(userData);
  const showProduct = products.length != 0 ? products : productsJs

  return (
    <>  
    <div className="flex w-full  justify-center items-center">
      {loading && <Loading />}
    </div>
    <div className="flex flex-wrap justify-center">
      {showProduct.map((item) => {
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
    </>
  );
}

export default Women;
