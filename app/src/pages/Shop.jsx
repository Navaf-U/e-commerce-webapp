import { useContext } from "react";
import Hero from "../Components/Hero/Hero";
import { ProductsData } from "../context/ProductsCont";
import Card from "../Components/Shared/Card";
function Shop() {
  const { products } = useContext(ProductsData);
  return (
    <div>
      <Hero />
      <h1 className="text-[35px]">Popular Pet Products</h1>
      <div className="flex items-center justify-center flex-wrap">
        {products.map((item) => {
          return <Card key={item.key} keyId={item.key}
            src={item.src}
            price={item.price}
            actualPrice={item.actualPrice}
            title={item.title}
            productName={item.productName}
          />;
        })}
      </div>
    </div>
  );
}

export default Shop;
