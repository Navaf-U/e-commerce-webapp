import { useContext, useEffect, useState } from "react";
import { ProductsData } from "../context/ProductsCont";
import { NavLink } from "react-router-dom";
function Search() {
  const { products, search } = useContext(ProductsData);
  const [data, setData] = useState([]);

  useEffect(() => {
    const filteredDatas = products.length !== 0 ? products.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ):null

    setData(filteredDatas.length > 0 ? filteredDatas : null);
  }, [search, products]);
  return (
    <div className="pt-20">
      {data != null ? (
        <ul className="flex flex-wrap justify-center items-center gap-8">
          {data.map((item,i) => (
            <li
              className="border-[1px] border-[#BF3131] text-center w-full md:w-[40%] text-[20px] p-5"
              key={i}
            >
              <NavLink
                to={`/products/${item._id}`}
                className="flex justify-center"
              >
                <img src={item.image} className="w-52" alt={item.name} />
              </NavLink>
              <p className="mt-2">{item.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center mb-20">
        <h1 className="text-[30px] font-[600] ">Not&nbsp;</h1>
        <h1 className="text-[30px] font-[600] text-[red]">Found!!</h1>
        </div>
      )}
    </div>
  );
}

export default Search;
