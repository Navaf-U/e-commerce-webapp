import { useContext } from "react"
import { ProductsData } from "../context/ProductsCont"
import Card from "../Components/Shared/Card"

function Women() {
    const {products} = useContext(ProductsData)

  return (
    <div className="flex flex-wrap">
        {products.map((item)=>{
            if(item.type==="women"){
                return <Card key={item.id} image={item.image} price={item.price}/>
            }
        })}
    </div>
  )
}

export default Women
