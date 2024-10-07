import { useContext } from "react";
import { ProductsData } from "../context/ProductsCont";
import { NavLink } from "react-router-dom";

function AdminProducts() {
  const { products } = useContext(ProductsData);

  return (
    <div className="h-[100vh] w-[145%] overflow-y-auto">
      <table className="w-full text-center table-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>TYPE</th>
            <th>PRICE</th>
            <th>BRAND</th>
            <th>RATING</th>
            <th>REVIEWS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-2 font-[700]">{item.id}</td>
              <td className="py-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 py-2 ms-3"
                />
              </td>
              <td className="py-2">{item.name}</td>
              <td className="py-2">{item.type}</td>
              <td className="py-2">{item.price}</td>
              <td className="py-2">{item.brand}</td>
              <td className="py-2">{item.rating}</td>
              <td className="py-2">{item.reviews}</td>
              <td className="py-2">
                
                <NavLink to={`/adminProducts/${item.id}`}>
                <button className="bg-blue-500 text-white px-4 py-1 rounded">
                  Action
                </button>
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;
