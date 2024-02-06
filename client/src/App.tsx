

import { Routes, Route } from "react-router-dom";
import Login from "./views/Login"
import Home from "./views/Home";
import ProductCategory from "./views/ProductCategory";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product-categories" element={<ProductCategory />} />
      </Routes>

    </>
  )
}

export default App
