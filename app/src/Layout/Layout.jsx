import Footer from "../Components/Footer/Footer";
// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  return (
    <div>
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
