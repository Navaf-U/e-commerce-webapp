import Navbar from "./Components/Navbar/Navbar";
import { Route,Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCategory from './pages/ShopCategory'
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
function App() { 
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop/>}/>
        <Route path="/cats" element={<ShopCategory catergory="cats"/>}/>
        <Route path="/dogs" element={<ShopCategory catergory="dogs"/>}/>
        <Route path="/product" element={<Product/>}>
        <Route path=":productId" element={<Product/>}/>
        </Route>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/login" element={<LoginSignup/>} />
      </Routes>
    </>
  );
}

export default App;
