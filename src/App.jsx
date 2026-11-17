import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './component/home/Home'
import Navbar from './component/navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './component/cart/Cart'
import Orders from './component/orders/Orders'
import Signup from './component/signup/Signup'
import Login from './component/login/Login'
import NavbarLog from './component/navbar/NavbarLog'

const App = () => {
  const hasToken = !!localStorage.getItem('token');

  return (
    <div>
      {hasToken ? <NavbarLog /> : <Navbar />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={hasToken ? <Home /> : <Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
