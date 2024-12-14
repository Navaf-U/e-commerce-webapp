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
import StripeSuccessPage from "./pages/StripeSuccessPage.jsx";
import AdminLogin from "./Admin/AdminLoginPage.jsx";
import StripeCancelPage from "./pages/stripeCancelPage.jsx";
import AdminOrderStatus from "./Admin/AdminOrderStatus.jsx";

function AppRoutes() {
  const { isAdmin ,cartLengthCheck,currUser} = useContext(userData);
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
          <Route path="/cart" element={ currUser !== null ? <Cart /> : <NotFound/>} />
          <Route path="/wishlist" element={ currUser !== null ? <Wishlist/> : <NotFound/> } />
          <Route path="/payment" element={ cartLengthCheck && currUser ? <Payment />  : <NotFound/> }/>
          <Route path="/orders" element={currUser !== null ? <Orders /> : <NotFound/>} />
          <Route path="/login" element={ currUser === null ? <LoginPage /> :<NotFound/>} />
          <Route path="/signup" element={currUser === null ? <SignupPage /> : <NotFound/>} />
          <Route path="/contact" element={ <Contact />} />
          <Route path="/profile" element={ currUser !== null ? <UserProfile /> : <NotFound/>} />
          <Route path="/success/:sessionID" element={currUser !== null ? <StripeSuccessPage/> : <NotFound/>} />
          <Route path="/cancel" element={currUser !== null ? <StripeCancelPage/> : <NotFound/>} />
          <Route path="*" element={<NotFound />} />
        </Route>
        
        <Route
              path="/admin/login"
              element={currUser === null ? <AdminLogin /> : <NotFound/>}
            />
      <Route
            path="/admin"
            element={ isAdmin ? <AdminMainPage /> : <NotFound />}
          />
      <Route
            path="/admin/product/:id"
            element={ isAdmin ? <AdminProductActionPage /> : <NotFound />}
          />
          <Route
            path="/admin/user/:ID"
            element={ isAdmin ? <AdminUserActionPage /> : <NotFound />}
          />
          <Route
            path="/admin/product/add"
            element={ isAdmin ? <ProductAddPage /> : <NotFound />}
          />
          <Route
            path="/admin/order/:userID/:orderID"
            element={ isAdmin ? <AdminOrderStatus /> : <NotFound />}
          />
      </Routes>
    </>
  );
}


export default AppRoutes;
