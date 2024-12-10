import Loading from "../Components/Loading/Loading";
import Card from "../Components/Shared/Card";
import { useContext, useEffect, useState } from "react";
import { userData } from "../context/UserContext";
import axiosErrorManager from "../util/axiosErrorManage";
import axiosInstance from "../util/axiosInstance";
function Women() {
  const [women, setWomen] = useState([]);
  const { loading } = useContext(userData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(
          "user/products/category/women"
        );
        setWomen(data.data);
      } catch (error) {
        console.error(axiosErrorManager( error))
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="flex w-full  justify-center items-center">
        {loading && <Loading />}
      </div>
      <div className="flex flex-wrap justify-center">
        {women.map((item) => {
          return (
            <Card
              key={item._id}
              id={item._id}
              image={item.image}
              rating={item.rating}
              name={item.name}
              price={item.price}
            />
          );
        })}
      </div>
    </>
  );
}

export default Women;
