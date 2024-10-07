import AppRoutes from "./AppRoutes";
import ProductsCont from "./context/ProductsCont";
import UserContext from "./context/UserContext";


function App() {
  return (
    <div>
      <UserContext>
        <ProductsCont>
          <AppRoutes />
        </ProductsCont>
      </UserContext>
    </div>
  );
}

export default App;
