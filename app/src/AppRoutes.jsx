import Navbar from "./Components/Navbar/Navbar";
import { Outlet, Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import "./App.css";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Search from "./pages/Search";
import Layout from "./Layout/Layout";
import Payment from "./pages/Payment";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contact from "./pages/Contact";
import AdmineMainPage from "./Admine/AdminMainPage";
import AdmineActionPage from "./Admine/AdminActionPage";
function AppRoutes() {
  return (
    <>
    <ToastContainer/>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Navbar /> <Outlet />
              </Layout>
              }
            >
              <Route path="/" element={<Shop />} />
              <Route path="/men" element={<Men />} />
              <Route path="/women" element={<Women />} />
              <Route path="/search" element={<Search />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/admin" element={<AdmineMainPage />} />
            <Route path="/adminProducts/:id" element={<AdmineActionPage />} />
          </Routes>
    </>
  );
}

export default AppRoutes;
