import React, { useState, useEffect } from "react";
import Home from "./page/Home";
import Login from "./page/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./page/Signup";
import Welcome from "./page/Welcome";
import AllProducts from "./page/AllProducts";
import AppContext from "./context/appContext";
import axios from "axios";


function App() {
  const baseUrl = "http://localhost:8080";
  const [token, setToken] = useState("");
  const [productsList, setProductsList] = useState([])
  const [logged, setLogged]= useState(false)

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      setToken(token);
      setLogged(true)
    }
  }, []);


  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/products`);
      const data = response.data;
      console.log(data)
      setProductsList(data)
      console.log(productsList)
  } catch (error) {
      console.log(error);
  }
};

useEffect(() => {
    fetchProducts();
}, []);

  return (
    <>
      <AppContext.Provider value={{ token, setToken, logged, setLogged, productsList, setProductsList }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/e-shop" element={<Welcome />} />
            <Route path="/products" element={<AllProducts />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;
