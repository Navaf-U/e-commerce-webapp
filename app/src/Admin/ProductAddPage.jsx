import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import axiosInstance from "../util/axiosInstance";
import axiosErrorManager from "../util/axiosErrorManage";
import { userData } from "../context/UserContext";
import { ProductsData } from "../context/ProductsCont";
function ProductAddPage() {
  const { setLoading } = useContext(userData);
  const {setProducts} = useContext(ProductsData);
  const [formValue, setFormValue ] = useState({
    name: "",
    type: "",
    price: "",
    qty: "",
    reviews: "",
    brand: "",
    description: "",
  });
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const AddProducts = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", formValue.name);
      formData.append("type", formValue.type);
      formData.append("price", formValue.price);
      formData.append("qty", formValue.qty);
      formData.append("brand", formValue.brand);
      formData.append("description", formValue.description);
      formData.append("image", image);
      const res = await axiosInstance.post("/admin/product", formData);
      setLoading(false);
      if (res.status === 201) {
        toast.success(res.data.message);
        setProducts((prev) => [...prev, res.data.data]);
        navigate("/admin");
        resetFunc();
      }
    } catch (err) {
      toast.error(axiosErrorManager(err));
    } finally {
      setLoading(false);
    }
  };
  
  const resetFunc = () =>{
    setFormValue({
      name: "",
      type: "",
      price: "",
      qty: "",
      brand: "",
      description: "",
    })
    setImage("");
  }

  const DefaultFun = (e) => {
    e.preventDefault();
  };

  const handlerForMain = () => {
    navigate("/admin");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <IoCloseOutline
        onClick={handlerForMain}
        className="cursor-pointer bg-[#80808069] rounded-full hover:text-[#BA3131] position fixed left-4 top-2"
        size={40}
      />
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg space-y-4"
        onSubmit={DefaultFun}
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Add Products
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
          onChange={(e) => setFormValue({ ...formValue, name: e.target.value })}
        />

        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
          onChange={(e) => setFormValue({ ...formValue, type: e.target.value })}
        >
          <option value="select type">Select Type</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>

        <input
          type="file"
          placeholder="Image"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
          onChange={(e) =>
            setFormValue({ ...formValue, price: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Quantity"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
          onChange={(e) => setFormValue({ ...formValue, qty: e.target.value })}
        />

        <input
          type="text"
          placeholder="Brand"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
          onChange={(e) =>
            setFormValue({ ...formValue, brand: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Description"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
          onChange={(e) =>
            setFormValue({ ...formValue, description: e.target.value })
          }
        />
        <button
          type="submit"
          onClick={AddProducts}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ProductAddPage;
