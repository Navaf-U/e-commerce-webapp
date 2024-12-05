import logo from "../Components/assets/shoe-navaf.svg";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useContext, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ProductsData } from "../context/ProductsCont";
import { userData } from "../context/UserContext";

function Product() {
  const { id } = useParams();
  const { products, currency } = useContext(ProductsData);
  const { isLogged, addToCart } = useContext(userData);
  const [quantity, setQuantity] = useState(1);

console.log(products)
  const findProduct = products.find((item) => item.id === id);


  const menFiltered = products.filter((item) => item.type === "men");
  const womenFiltered = products.filter((item) => item.type === "women");

  const FinalRating = Number(findProduct?.rating || 0);

  const Stars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
      </>
    );
  };

  return (
    <div>
      {!products.length ? (
        <p>Loading...</p>
      ) : !findProduct ? (
        <p>Product not found</p>
      ) : (
        <div>
          <div className="flex flex-col md:flex-row justify-around px-4 py-6">
            <div className="left-section md:w-[40%] flex flex-col items-center">
              <img
                src={findProduct.image}
                className="w-[100%] max-w-[300px] mb-4"
                alt=""
              />
              <h4 className="text-[24px] text-center font-bold">
                {findProduct.name}
              </h4>
              <h3 className="text-[20px] text-center font-normal">{`Type: ${findProduct.type}`}</h3>
              <h3 className="text-[24px] text-center font-bold">{`Price: ${findProduct.price}${currency}`}</h3>
              <div className="flex items-center justify-center mt-2">
                <h3 className="text-[24px] font-bold">{`${FinalRating}`}</h3>
                <p className="mt-1 flex ml-2">{Stars(FinalRating)}</p>
              </div>
              <h2 className="font-bold text-[17px] mt-5 text-red-500">
                It has {findProduct.reviews} reviews
              </h2>
            </div>
            <div className="right-section md:w-[50%] mt-4 md:mt-0 flex flex-col items-center justify-center">
              <img src={logo} className="h-[200px] w-[40%] mt-[-20px]" alt="" />
              <p className="text-[50px] font-bold text-center text-sm md:text-base px-2 mt-[-20px]">
                Brand: {findProduct.brand}
              </p>
              <p className="text-[50px] font-light text-center text-sm md:text-base px-2">
                {findProduct.description}
              </p>
              <h1 className="text-[20px] font-semibold">Quantity:</h1>
              <div className="flex gap-5 border-[4px] w-[30%] justify-between border-[#BF3131] my-5 ">
                <button
                  className="text-[30px] bg-[#BF3131] hover:bg-[#800000] text-white w-[30%]"
                  onClick={() =>
                    setQuantity((prevQuantity) =>
                      prevQuantity > 1 ? prevQuantity - 1 : 1
                    )
                  }
                >
                  -
                </button>
                <button className="text-[30px] font-semibold">{quantity}</button>
                <button
                  className="text-[22px] bg-[#BF3131] hover:bg-[#800000] text-white w-[30%]"
                  onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}
                >
                  +
                </button>
              </div>
              {isLogged === true ? (
                <NavLink to="/cart" onClick={() => addToCart(id, quantity)}>
                  <button className="mt-8 w-[350px] h-[70px] rounded-md bg-[#BF3131] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#7D0A0A] focus:outline-none focus:ring-4 focus:ring-blue-300">
                    Add to Cart
                  </button>
                </NavLink>
              ) : (
                <NavLink to="/login">
                  <button className="mt-8 w-[200px] h-[50px] rounded-md bg-[#333] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#7D0A0A] focus:outline-none focus:ring-4 focus:ring-blue-300">
                    Login
                  </button>
                </NavLink>
              )}
            </div>
          </div>
          <div className="mt-32">
            <h1 className="text-[25px] font-semibold text-center">
              Trending Now - You&apos;ll Love These
            </h1>
            <div>
              {findProduct.type === "men" ? (
                <div className="flex flex-wrap gap-7 mt-28 ms-14">
                  {menFiltered.map((item) => {
                    return (
                      <h1 className="font-semibold" key={item.id}>
                        <img src={item.image} className="w-36" alt="" /> {item.name}
                      </h1>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-wrap gap-7 mt-28 ms-16">
                  {womenFiltered.map((item) => {
                    return (
                      <h1 className="font-semibold" key={item.id}>
                        <img src={item.image} className="w-36" alt="" /> {item.name}
                      </h1>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
