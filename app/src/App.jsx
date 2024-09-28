import Navbar from "./Components/Navbar/Navbar";
import { Outlet, Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import './App.css';
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<><Navbar /> <Outlet/></>}>
          <Route path="/" element={<Shop />} />
          <Route path="/cats" element={<ShopCategory catergory="cats" />} />
          <Route path="/dogs" element={<ShopCategory catergory="dogs" />} />
          <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
