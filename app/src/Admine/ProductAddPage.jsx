import { useContext, useState } from "react";
import { ProductsData } from "../context/ProductsCont";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
function ProductAddPage() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState("");
//   const navigate = useNavigate();

  const { PostProducts } = useContext(ProductsData);
  const navigate = useNavigate()
  const DefaultFun = (e) => {
    e.preventDefault();
    PostProducts(name, type, image, price, rating, reviews, brand, description);
    toast.success("Product Added")
  };

  const handlerForMain = ()=>{
    navigate('/admin')
  }
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
           <IoCloseOutline onClick={handlerForMain} className="cursor-pointer bg-[#80808069] rounded-full hover:text-[#BA3131] position fixed left-4 top-2" size={40}/>
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg space-y-4"
        onSubmit={DefaultFun}
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Add Products</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
          value={name} onChange={(e) => setName(e.target.value)}
        />

        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="select type">Select Type</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>

        <input
          type="text"
          placeholder="Image"
          value={image}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
          onChange={(e) => setImage(e.target.value)}
        />

        <input
          type="text"
          placeholder="Price"
          value={price}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Rating"
          value={rating}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
          onChange={(e) => setRating(e.target.value)}
        />

        <input
          type="text"
          placeholder="Reviews"
          value={reviews}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
          onChange={(e) => setReviews(e.target.value)}
        />

        <input
          type="text"
          placeholder="Brand"
          value={brand}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
          onChange={(e) => setBrand(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF3131]"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ProductAddPage;
