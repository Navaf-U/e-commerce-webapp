import { useContext } from "react"
import { ProductsData } from "../context/ProductsCont"

const Cart = () => {
  const {cart,setCart} = useContext(ProductsData)
  console.log(cart);
  
  return (
    <div>
      
    </div>
  )
}

export default Cart
