import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Slider from "./Components/Slider/Slider";
import Card from "./Components/Cards/Card";
import Footer from "./Components/Footer/Footer";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Cart from "./Components/Cart/Cart";
import Checkout from "./Components/Checkout/Checkout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/products/all")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Slider />
                <Card products={products} />
              </>
            }
          />

          <Route
            path="/cart"
            element={
              <>
                <Cart />
              </>
            }
          />

          <Route
            path="/checkout"
            element={
              <>
                <Checkout />
              </>
            }
          />
        </Routes>
      </BrowserRouter>

      <Footer />

      {/* <Signup /> */}
    </>
  );
};

export default App;
