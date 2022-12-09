import React, { useEffect, useState, createContext  } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar';
import Cart from './features/cart/Cart';
import Checkout from './features/checkout/Checkout';
import Home from './features/home/Home';
import {getUser} from './services/user';
import { ToastContainer } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';

export const UserContext = createContext()

function App() {
  const [user, setUser] = useState({})
  const value = { user, setUser };
  useEffect(()=>{
    getUser().then((user) => setUser(user));
    },[])
  return (
    <BrowserRouter>
      <UserContext.Provider value={value}>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
      </Routes>
      </UserContext.Provider>
      <ToastContainer floatingTime={2000} />
    </BrowserRouter>
  );
}

export default App;
