import { useContext } from "react";
import { ProductsData } from "../context/ProductsCont";

const Cart = () => {
  const { cart, products, currency } = useContext(ProductsData);
console.log(cart);

  return (
    <div className="">
      <h3>Your Cart</h3>
      {products.length === 0 ? (
        <p>No Products </p>
      ) : (
        products.map((item) => {
          const quantity = cart[item.id];
          return (
            quantity > 0 && (
              <div key={item.id}>
                <p>{item.name}</p>
                <p>Quantity : {quantity}</p>
                <p>
                  Price : {currency} {item.price * quantity}
                </p>
              </div>
            )
          );
        })
      )}
    </div>
  );
};

export default Cart;
