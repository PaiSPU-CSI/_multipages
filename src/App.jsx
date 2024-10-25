import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout/Layout";

import Home from "./pages/Home/Home";
import Animation from "./pages/Animation/Animation";
import Todo from "./pages/Todo/Todo";
import Calculator from "./pages/Calculator/Calculator";
import Components from "./pages/Components/Components";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import { fetchProducts } from "./data/product";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

const intTab = "home";
function App() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  
  const [tab, setTab] = useState("");
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    setTab(intTab);
    setProduct(fetchProducts());
  }, []);

  useEffect(() => {
    console.log(product);
  });

  if (token === "") {
    return(
    <Login setToken={setToken} setRole={setRole} />
  );
  } else {
    return (
      <div className="app-container">
        <HashRouter>
          <Routes>
            <Route
              element={
                <Layout
                  tab={tab}
                  setTab={setTab}
                  product={product}
                  setProduct={setProduct}
                  cart={cart}
                  setCart={setCart}
                  setToken={setToken}
                  role={role}
                />
              }
            >
              <Route path="/" element={<Home />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/animation" element={<Animation />}></Route>
              <Route path="/todo" element={<Todo />}></Route>
              <Route path="/components" element={<Components />}></Route>
              <Route path="/calculator" element={<Calculator />}></Route>
              <Route
                path="/product"
                element={
                  <Product product={product} cart={cart} setCart={setCart} />
                }
              ></Route>
              <Route
                path="/cart"
                element={<Cart cart={cart} setCart={setCart} />}
              ></Route>
            </Route>
          </Routes>
        </HashRouter>
      </div>
    );
  }
}

export default App;
