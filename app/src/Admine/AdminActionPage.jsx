import { useContext} from "react";
import { ProductsData } from "../context/ProductsCont";
import { useParams } from "react-router-dom";
import axios from "axios";
import { userData } from "../context/UserContext";

function AdminActionPage() {
  const { id } = useParams();
  const {currUser , setLoading}= useContext(userData)


  const { products} = useContext(ProductsData);
  const productFound = products.find((item) => item.id === id);

  const DeleteProduct = async (ID)=>{
    setLoading(true)
    try{
      await axios.delete(`http://localhost:3000/newProducts/${ID}`)
    currUser(false);

    }catch(err){
      console.log(err);
      
    }finally{
      setLoading(false)
    }
  }
 

  return (
    <div>
      {!products.length ? <p>loading....</p> : !productFound ? <h1>not found</h1> :
        <><div key={productFound.id}>

          <img src={productFound.image} className="w-[130px]" alt="" />

          {productFound.name}
        </div><button className="bg-[#BF3131] w-28" onClick={()=>DeleteProduct(productFound.id)} >Delete</button></>
       }
    </div>
  );
}

export default AdminActionPage;
