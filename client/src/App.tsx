import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Home from "./views/Home";
import ProductCategory from "./views/ProductCategory";
import Product from "./views/Product";
import Transaction from "./views/Transaction";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product-categories" element={<ProductCategory />} />
        <Route path="/product" element={<Product />} />
        <Route path="/transaction" element={<Transaction />} />
      </Routes>
    </>
  );
}

export default App;
