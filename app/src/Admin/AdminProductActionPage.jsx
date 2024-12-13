import Loading from "../Components/Loading/Loading";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userData } from "../context/UserContext";
import { toast } from "react-toastify";
import { IoCloseOutline } from "react-icons/io5";
import axiosInstance from "../util/axiosInstance";
import axiosErrorManager from "../util/axiosErrorManage";

function AdminProductActionPage() {
  const { id } = useParams();
  const { setLoading, loading } = useContext(userData);
  const [products,setProducts] = useState([])
  const navigate = useNavigate();

  const [values, setValues] = useState({
    id: "",
    name: "",
    type: "",
    price: "",
    qty: "",
    image:null,
    description: "",
    brand: "",
    rating: "",
    reviews: "",
  });

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get(`/admin/product/${id}`);
      setProducts(res.data);
      setValues({
        id: res.data?._id || "",
        name: res.data?.name || "",
        type: res.data?.type || "",
        price: res.data?.price || "",
        qty: res.data?.qty || "",
        image: null,
        description: res.data?.description || "",
        brand: res.data?.brand || "",
        rating: res.data?.rating || "",
        reviews: res.data?.reviews || "",
      })
    } catch (error) {
      toast.error(axiosErrorManager(error));
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileChange = (e) =>{
    setValues((prev)=>({
      ...prev,
      image : e.target.files[0]
    }))
  }

  const updateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("type", values.type);
    formData.append("price", values.price);
    formData.append("qty", values.qty);
    formData.append("description", values.description);
    formData.append("brand", values.brand);
    if (values.image) {
      formData.append("image", values.image);
    }
  
    try {
      const res = await axiosInstance.put(`/admin/product/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message);
      fetchProducts();
    } catch (error) {
      toast.error(axiosErrorManager(error));
    } finally {
      setLoading(false);
    }
  };
  

  const DeleteProduct = async (ID) => {
    setLoading(true);
    try {
      const res = await axiosInstance.patch(`admin/product/delete/${ID}`);
      navigate("/admin");
      toast.success(res.data.message);
    } catch (err) {
      toast.error(axiosErrorManager(err));
    } finally {
      setLoading(false);
    }
  };

  const handlerForMain = () => {
    navigate("/admin");
  };

  return (
    <>
      <IoCloseOutline
        onClick={handlerForMain}
        className="cursor-pointer bg-[#80808069] rounded-full hover:text-[#BA3131] position fixed left-4 top-2"
        size={40}
      />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col lg:flex-row lg:space-x-10 space-y-10 lg:space-y-0 p-6 lg:p-10">
          {!products.length === 0 ? (
            <p className="text-center">Loading...</p>
          ) : !products? (
            <h1 className="text-center text-2xl font-bold">
              Product Not Found
            </h1>
          ) : (
            <>
              <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
                <div
                  key={products._id}
                  className="text-center lg:text-left"
                >
                  <div className="flex justify-center">
                    <img
                      src={products.image}
                      alt={products.name}
                      className="w-[70%] h-auto mx-auto lg:mx-0 mb-4 rounded-lg shadow-md"
                    />
                  </div>
                  <h2 className="text-2xl text-center text-[#800000] font-bold mb-2">
                    {products.name}
                  </h2>
                  <div className="flex justify-between ">
                    <div>
                      <p className="text-lg text-gray-600 mb-2">
                        Current Price: ${products.price}
                      </p>
                      <p className="text-lg text-gray-600 mb-4">
                        Current Type: {products.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-lg text-gray-600 mb-4">
                        Current Rating: {products.rating}
                      </p>
                      <p className="text-lg text-gray-600 mb-4">
                        Current Reviews: {products.reviews}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="bg-[#BF3131] text-white w-full lg:w-48 py-2 rounded-full hover:bg-[#a82626] transition-all duration-300 shadow-lg"
                      onClick={() => DeleteProduct(products._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
                <form
                  className="flex flex-col space-y-4"
                  onSubmit={updateProduct}
                >
                  <input
                    type="text"
                    name="id"
                    placeholder="ID"
                    readOnly
                    value={values.id}
                    onChange={handleInputChange}
                    className="p-3 border border-red-200 rounded-lg shadow-sm focus-within:ring-[1px] focus-within:ring-[#BF3131] outline-none"
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={values.name}
                    onChange={handleInputChange}
                    className="p-3 border border-red-200 rounded-lg shadow-sm focus-within:ring-[1px] focus-within:ring-[#BF3131] outline-none"
                  />
                  <select
                    value={values.type}
                    name="type"
                    className="p-3 border border-red-200 rounded-lg shadow-sm focus-within:ring-[1px] focus-within:ring-[#BF3131] outline-none"
                    onChange={handleInputChange}
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                  </select>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    placeholder="Image URL"
                    onChange={handleFileChange}
                    className="p-3 border border-red-200 rounded-lg shadow-sm focus-within:ring-[1px] focus-within:ring-[#BF3131] outline-none"
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={values.price}
                    onChange={handleInputChange}
                    className="p-3 border border-red-200 rounded-lg shadow-sm focus-within:ring-[1px] focus-within:ring-[#BF3131] outline-none"
                  />
                  <input
                    type="number"
                    name="qty"
                    placeholder="Quantity"
                    value={values.qty}
                    onChange={handleInputChange}
                    className="p-3 border border-red-200 rounded-lg shadow-sm focus-within:ring-[1px] focus-within:ring-[#BF3131] outline-none"
                  />
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={values.description}
                    onChange={handleInputChange}
                    className="p-3 border border-red-200 rounded-lg shadow-sm focus-within:ring-[1px] focus-within:ring-[#BF3131] outline-none"
                  />
                  <input
                    type="text"
                    name="brand" 
                    placeholder="Brand"
                    value={values.brand}
                    onChange={handleInputChange}
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
      )}
    </>
  );
}

export default AdminProductActionPage;
