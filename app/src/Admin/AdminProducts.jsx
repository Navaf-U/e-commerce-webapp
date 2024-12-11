import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axiosErrorManager from "../util/axiosErrorManage";
import axiosInstance from "../util/axiosInstance";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [men, setMen] = useState(false);
  const [women, setWomen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    if (name === "men") {
      setMen(checked);
    } else if (name === "women") {
      setWomen(checked);
    }
  };

  // did for the products resetting if deleted
  const fetchProducts = async () => {
    try {
      const { data } = await axiosInstance.get("user/products");
      setProducts(data.data);
    } catch (error) {
      console.error(axiosErrorManager(error));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((item) => {
    if (men && item.type === "men") return true;
    if (women && item.type === "women") return true;
    if (!men && !women) return true;
    return false;
  });

  // pagination checkings

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="h-screen w-full overflow-y-auto p-4 bg-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex gap-4 mb-4 md:mb-0">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="men"
              checked={men}
              onChange={handleCheckbox}
              className="mr-2"
            />
            Men
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="women"
              checked={women}
              onChange={handleCheckbox}
              className="mr-2"
            />
            Women
          </label>
        </div>
        <NavLink to="/admin/product/add">
          <button
            type="button"
            className="px-6 py-2 bg-green-500 text-white text-lg rounded-md hover:bg-green-600 transition"
          >
            Add Product
          </button>
        </NavLink>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-center table-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-xs md:text-sm">ID</th>
              <th className="p-2 text-xs md:text-sm hidden sm:table-cell">
                IMAGE
              </th>
              <th className="p-2 text-xs md:text-sm">NAME</th>
              <th className="p-2 text-xs md:text-sm hidden sm:table-cell">
                TYPE
              </th>
              <th className="p-2 text-xs md:text-sm">PRICE</th>
              <th className="p-2 text-xs md:text-sm hidden sm:table-cell">
                BRAND
              </th>
              <th className="p-2 text-xs md:text-sm hidden md:table-cell">
                RATING
              </th>
              <th className="p-2 text-xs md:text-sm hidden md:table-cell">
                REVIEWS
              </th>
              <th className="p-2 text-xs md:text-sm">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="py-2 font-semibold text-xs md:text-sm">
                    {item.id}
                  </td>
                  <td className="py-2 hidden sm:table-cell">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  </td>
                  <td className="py-2 text-xs md:text-sm">{item.name}</td>
                  <td className="py-2 hidden sm:table-cell text-xs md:text-sm">
                    {item.type}
                  </td>
                  <td className="py-2 text-xs md:text-sm">{item.price}</td>
                  <td className="py-2 hidden sm:table-cell text-xs md:text-sm">
                    {item.brand}
                  </td>
                  <td className="py-2 hidden md:table-cell text-xs md:text-sm">
                    {item.rating}
                  </td>
                  <td className="py-2 hidden md:table-cell text-xs md:text-sm">
                    {item.reviews}
                  </td>
                  <td className="py-2">
                    <NavLink to={`/admin/product/${item._id}`}>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs md:text-sm">
                        Action
                      </button>
                    </NavLink>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-4 text-red-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* this is  pagination Controls */}

      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-[#BF3131] text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;
