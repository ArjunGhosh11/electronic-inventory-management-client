import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Pages/Shared/Navbar";
import Login from "./Pages/Login/Login";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/Login/SignUp";
import Products from "./Pages/Products/Products";
import RequireAuth from "./Pages/Login/RequireAuth";
import AddProduct from "./Pages/AddProduct/AddProduct";
import Product from "./Pages/Products/Product";
import Inventory from "./Pages/Products/Inventory";
import MyDashboard from "./Pages/MyDashboard/MyDashboard";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import Cart from "./Pages/Cart/Cart";


function App() {
  useEffect(() => {

  })
  return (
    <div className="text-2xl text-center">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={
          <RequireAuth>
            <Products />
          </RequireAuth>
        }></Route>
        <Route path="/products" element={
          <RequireAuth>
            <Products />
          </RequireAuth>
        }></Route>
        <Route path="/products/:id" element={
          <RequireAuth>
            <Product />
          </RequireAuth>
        }></Route>
        <Route path="/products/inventory/:id" element={
          <RequireAuth>
            <Inventory />
          </RequireAuth>
        }></Route>
        <Route path="/addProduct" element={
          <RequireAuth>
            <AddProduct />
          </RequireAuth>
        }></Route>
        <Route path="/myDashboard/:user_id" element={
          <RequireAuth>
            <MyDashboard />
          </RequireAuth>
        }></Route>
        <Route path="/myCart/:user_id" element={
          <RequireAuth>
            <Cart />
          </RequireAuth>
        }></Route>
        <Route path="/adminDashboard" element={
          <RequireAuth>
            <AdminDashboard />
          </RequireAuth>
        }></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
