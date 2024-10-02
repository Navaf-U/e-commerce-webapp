import Navbar from "./Components/Navbar/Navbar";
import { Outlet, Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import "./App.css";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import NotFound from "./pages/NotFound";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Search from "./pages/Search";
import Layout from "./Layout/Layout";
function App() {
  return (
    <>
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar /> <Outlet />
            </>
          }
        >
          <Route path="/" element={<Shop />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/search" element={<Search />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Layout>
    </>
  );
}

export default App;
