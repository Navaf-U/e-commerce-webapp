import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar/Navbar";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Search from "./pages/Search";
import Layout from "./Layout/Layout";
import Payment from "./pages/Payment";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Contact from "./pages/Contact";
import AdminMainPage from "./Admin/AdminMainPage";
import AdminUserActionPage from "./Admin/AdminUserActionPage";
import ProductAddPage from "./Admin/ProductAddPage";
import Orders from "./pages/Orders";
import UserProfile from "./pages/UserProfile";
import AdminProductActionPage from "./Admin/AdminProductActionPage";
import { Outlet, Route, Routes} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import  { userData } from "./context/UserContext";
import { useContext } from "react";
import StripeSuccessComp from "./pages/StripeSuccessComp.jsx";

function AppRoutes() {
  const { isAdmin ,cart,currUser} = useContext(userData);
  const cartLength = cart ? cart.length : 0;
  return (
    <>
      <ToastContainer draggable />
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
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/payment" element={ cartLength && currUser ? <Payment />  : <NotFound/> }/>
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={ currUser === null ? <LoginPage /> :<NotFound/>} />
          <Route path="/signup" element={currUser === null ? <SignupPage /> : <NotFound/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/success/:sessionID" element={<StripeSuccessComp/>} />
          <Route path="*" element={<NotFound />} />
        </Route>
        
      <Route
            path="/admin"
            element={ isAdmin ? <AdminMainPage /> : <NotFound />}
          />
      <Route
            path="/adminProducts/:id"
            element={ isAdmin ? <AdminProductActionPage /> : <NotFound />}
          />
          <Route
            path="/adminUsers/:ID"
            element={ isAdmin ? <AdminUserActionPage /> : <NotFound />}
          />
          <Route
            path="/addproducts"
            element={ isAdmin ? <ProductAddPage /> : <NotFound />}
          />
      </Routes>
    </>
  );
}


export default AppRoutes;
