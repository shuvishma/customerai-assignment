import LoginPage from "./component/LoginPage";
import ProductList from "./component/ProductList";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/products" element={<ProductList />} />
    </Routes>
  );
};

export default App;