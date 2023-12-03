import { useEffect } from "react";
import app from "./firebase.init";
import { getAuth } from "firebase/auth";
import Navbar from "./Pages/Shared/Navbar";
import Login from "./Pages/Login/Login";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/Login/SignUp";
import Products from "./Pages/Products/Products";
import RequireAuth from "./Pages/Login/RequireAuth";
import AddProduct from "./Pages/AddProduct/AddProduct";
import Product from "./Pages/Products/Product";


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
        <Route path="/addProduct" element={
          <RequireAuth>
            <AddProduct />
          </RequireAuth>
        }></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}

export default App;
