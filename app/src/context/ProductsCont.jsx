import { useEffect } from "react"
import { useState } from "react"
import { createContext } from "react"
import axios from 'axios'
export const ProductsData = createContext()


function ProductsCont({children}) {
    const [products,setProducts]=useState([])
    const [search,setSearch] = useState("")

    useEffect(()=>{
      const fetchProductsData = async () =>{
        try{
          const resp = await axios.get("http://localhost:3000/newProducts")
          await setProducts(resp.data)
          
          
          
        }catch(err){
          console.log(err);
          
        }
      }
      fetchProductsData()
    },[])
  const currency = "₹"
  const value = {currency,products,search,setSearch}
    return (
    <div>
        <ProductsData.Provider value={value}>
          {children}
        </ProductsData.Provider>
    </div>
  )
}

export default ProductsCont
