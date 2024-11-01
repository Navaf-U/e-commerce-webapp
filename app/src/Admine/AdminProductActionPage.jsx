import { useContext, useEffect, useState } from "react";
import { ProductsData } from "../context/ProductsCont";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { userData } from "../context/UserContext";
import { toast } from "react-toastify";
import Loading from "../Components/Loading/Loading";
import { IoCloseOutline } from "react-icons/io5";

function AdminProductActionPage() {
  const { id } = useParams();
  const { setLoading,loading } = useContext(userData);
  const { products } = useContext(ProductsData);
  const navigate = useNavigate()
  const [productEdit, setProductEdit] = useState({
    id: "",
    name: "",
    type: "",
    image: "",
    price: "",
    qty: "",
    description: "",
    brand: "",
    rating: "",
    reviews: "",
  });
  const productFound = products.find((item) => item.id === id);

  useEffect(() => {
    if (productFound) {
      setProductEdit({
        id: productFound.id,
        name: productFound.name,
        type: productFound.type,
        image: productFound.image,
        price: productFound.price,
        qty: productFound.qty,
        description: productFound.description,
        brand: productFound.brand,
        rating: productFound.rating,
        reviews: productFound.reviews,
      });
    }
  }, [productFound]);

  const inputValidationCheck = () => {
    if (
      !productEdit.name ||
      !productEdit.type ||
      productEdit.price < 0 ||
      productEdit.qty < 0 ||
      !productEdit.id ||
      !productEdit.qty
    ) {
      toast.error("correct the input fields");
      return false;
    }
    return true;
  };

  const handlerEvent = async (e) => {
    e.preventDefault();
    if (!inputValidationCheck()) {
      return;
    }
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:3000/newProducts/${productEdit.id}`,
        productEdit
      );

      toast.success("Product Edited");
    } catch (err) {
      toast.error("Error updating product. Please try again.")
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const DeleteProduct = async (ID) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/newProducts/${ID}`);
      navigate("/admin")
    } catch (err) {
      toast.error("Error deleting product. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handlerForMain = ()=>{
    navigate('/admin')
  }

  return (
    <>
    <IoCloseOutline onClick={handlerForMain} className="cursor-pointer bg-[#80808069] rounded-full hover:text-[#BA3131] position fixed left-4 top-2" size={40}/>
    {loading ? <Loading/> :(
      <div className="flex flex-col lg:flex-row lg:space-x-10 space-y-10 lg:space-y-0 p-6 lg:p-10">
      {!products.length ? (
        <p className="text-center">Loading...</p>
      ) : !productFound ? (
        <h1 className="text-center text-2xl font-bold">Product Not Found</h1>
      ) : (
        <>
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
            <div key={productFound.id} className="text-center lg:text-left">
              <div className="flex justify-center">
                <img
                  src={productFound.image}
                  alt={productFound.name}
                  className="w-[70%] h-auto mx-auto lg:mx-0 mb-4 rounded-lg shadow-md"
                />
              </div>
              <h2 className="text-2xl text-center text-[#800000] font-bold mb-2">
                {productFound.name}
              </h2>
              <div className="flex justify-between ">
                <div>
                  <p className="text-lg text-gray-600 mb-2">
                    Current Price: ${productFound.price}
                  </p>
                  <p className="text-lg text-gray-600 mb-4">
                    Current Type: {productFound.type}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-gray-600 mb-4">
                    Current Rating: {productFound.rating}
                  </p>
                  <p className="text-lg text-gray-600 mb-4">
                    Current Reviews: {productFound.reviews}
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-[#BF3131] text-white w-full lg:w-48 py-2 rounded-full hover:bg-[#a82626] transition-all duration-300 shadow-lg"
                  onClick={() => DeleteProduct(productFound.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
            <form className="flex flex-col space-y-4" onSubmit={handlerEvent}>
              <input
                type="text"
                placeholder="ID"
                readOnly
                value={productEdit.id}
                onChange={(e) =>
                  setProductEdit({ ...productEdit, id: e.target.value })
                }
                className="p-3 border border-red-200 rounded-lg shadow-sm focus-within:ring-[1px] focus-within:ring-[#BF3131] outline-none"
              />
              <input
                type="text"
                placeholder="Name"
                value={productEdit.name}
                onChange={(e) =>
                  setProductEdit({ ...productEdit, name: e.target.value })
                }
                className="p-3 border border-red-200 rounded-lg shadow-sm focus-within:ring-[1px] focus-within:ring-[#BF3131] outline-none"
              />
              <select
                value={productEdit.type}
                className="p-3 border border-red-200 rounded-lg shadow-sm focus-within:ring-[1px] focus-within:ring-[#BF3131] outline-none"
                onChange={(e) =>
                  setProductEdit({ ...productEdit, type: e.target.value })
                }
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
              <input
                type="text"
                placeholder="Image URL"
                value={productEdit.image}
                onChange={(e) =>
                  setProductEdit({ ...productEdit, image: e.target.value })
                }
                className="p-3 border border-red-200 rounded-lg shadow-sm focus-within:ring-[1px] focus-within:ring-[#BF3131] outline-none"
              />
              <input
                type="number"
                placeholder="Price"
                value={productEdit.price}
                onChange={(e) =>
                  setProductEdit({ ...productEdit, price: e.target.value })
                }
                className="p-3 border border-red-200 rounded-lg shadow-sm focus-within:ring-[1px] focus-within:ring-[#BF3131] outline-none"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={productEdit.qty}
                onChange={(e) =>
                  setProductEdit({ ...productEdit, qty: e.target.value })
                }
                className="p-3 border border-red-200 rounded-lg shadow-sm focus-within:ring-[1px] focus-within:ring-[#BF3131] outline-none"
              />
              <input
                type="text"
                placeholder="Description"
                value={productEdit.description}
                onChange={(e) =>
                  setProductEdit({
                    ...productEdit,
                    description: e.target.value,
                  })
                }
                className="p-3 border border-red-200 rounded-lg shadow-sm focus-within:ring-[1px] focus-within:ring-[#BF3131] outline-none"
              />
              <input
                type="text"
                placeholder="Brand"
                value={productEdit.brand}
                onChange={(e) =>
                  setProductEdit({ ...productEdit, brand: e.target.value })
                }
                className="p-3 border border-red-200 rounded-lg shadow-sm focus-within:ring-[1px] focus-within:ring-[#BF3131] outline-none"
              />
              <input
                type="text"
                placeholder="Rating"
                value={productEdit.rating}
                onChange={(e) =>
                  setProductEdit({ ...productEdit, rating: e.target.value })
                }
                className="p-3 border border-red-200 rounded-lg shadow-sm focus-within:ring-[1px] focus-within:ring-[#BF3131] outline-none"
              />
              <input
                type="text"
                placeholder="Reviews"
                value={productEdit.reviews}
                onChange={(e) =>
                  setProductEdit({ ...productEdit, reviews: e.target.value })
                }
                className="p-3 border border-red-200 rounded-lg shadow-sm focus-within:ring-[1px] focus-within:ring-[#BF3131] outline-none"
              />
              <button
                type="submit"
                className="bg-[#BF3131] text-white py-3 rounded-full hover:bg-[#a82626] transition-all duration-300 shadow-lg"
              >
                Update Product
              </button>
            </form>
          </div>
        </>
      )}
    </div>
    ) }
    
    </>
  );
}

export default AdminProductActionPage;
