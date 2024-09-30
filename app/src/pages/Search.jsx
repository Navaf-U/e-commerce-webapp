import { useContext } from "react"
import {ProductsData} from "../context/ProductsCont"
import { useEffect } from "react"
import { useState } from "react"
function Search() {
    const {products,search,setSearch} = useContext(ProductsData)
    const [data,setData]=useState("")
    
  useEffect(()=>{
    {products.filter((item)=>{
     {item.type.includes(search)?setSearch(search):setData("not found")}
    })}
  },[search])
  {console.log(data)}
    return (
    <div>
      <h1>{data}</h1>
    </div>
  )
}

export default Search
