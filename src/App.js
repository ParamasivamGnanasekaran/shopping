import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-custom-alert";
import "react-custom-alert/dist/index.css";

import Navbar from "./component/NavBar/Navbar";
import Cart from "./component/Cart/Cart";
import Checkout from "./component/Checkout/Checkout";
import Home from "./component/Home/Home";

import "./App.css";

export const CartContext = createContext();

function App() {
  const [cartProducts, setCartProducts] = useState([]);

  const value = { cartProducts, setCartProducts };
  return (
    <BrowserRouter>
      <CartContext.Provider value={value}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </CartContext.Provider>
      <ToastContainer floatingTime={2000} />
    </BrowserRouter>
  );
}

export default App;
