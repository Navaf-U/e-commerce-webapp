import { useContext } from "react";
import { ProductsData } from "../context/ProductsCont";
import { NavLink } from "react-router-dom";

function AdminProducts() {
  const { products } = useContext(ProductsData);

  return (
    <div className="h-[100vh] w-full overflow-y-auto">
      <div className="overflow-x-auto">
        <table className="min-w-full text-center table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-xs md:text-sm">ID</th>
              <th className="p-2 text-xs md:text-sm hidden sm:table-cell">IMAGE</th>
              <th className="p-2 text-xs md:text-sm">NAME</th>
              <th className="p-2 text-xs md:text-sm hidden sm:table-cell">TYPE</th>
              <th className="p-2 text-xs md:text-sm">PRICE</th>
              <th className="p-2 text-xs md:text-sm hidden sm:table-cell">BRAND</th>
              <th className="p-2 text-xs md:text-sm hidden md:table-cell">RATING</th>
              <th className="p-2 text-xs md:text-sm hidden md:table-cell">REVIEWS</th>
              <th className="p-2 text-xs md:text-sm">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2 font-semibold text-xs md:text-sm">{item.id}</td>
                <td className="py-2 hidden sm:table-cell">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover mx-auto"
                  />
                </td>
                <td className="py-2 text-xs md:text-sm">{item.name}</td>
                <td className="py-2 hidden sm:table-cell text-xs md:text-sm">{item.type}</td>
                <td className="py-2 text-xs md:text-sm">{item.price}</td>
                <td className="py-2 hidden sm:table-cell text-xs md:text-sm">{item.brand}</td>
                <td className="py-2 hidden md:table-cell text-xs md:text-sm">{item.rating}</td>
                <td className="py-2 hidden md:table-cell text-xs md:text-sm">{item.reviews}</td>
                <td className="py-2">
                  <NavLink to={`/adminProducts/${item.id}`}>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs md:text-sm">
                      Action
                    </button>
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProducts;
