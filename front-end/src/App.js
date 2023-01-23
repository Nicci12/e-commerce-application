import React, { useState, useEffect } from "react";
import Home from "./page/Home";
import Login from "./page/Login";
import { BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import "./App.css";
import Signup from "./page/Signup";
import Welcome from "./page/Welcome";
import AllProducts from "./page/AllProducts";
import Cart from "./page/Cart";
import AppContext from "./context/appContext";
import axios from "axios";
import WishList from "./page/WishList";
import Product from "./page/Product";


function App() {
  const baseUrl = "http://localhost:8080";
  const [token, setToken] = useState("");
  const [productsList, setProductsList] = useState([])
  const [prodId, setProdId]= useState([])
  const [user, setUser] = useState([])
  const [logged, setLogged]= useState(false)

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user"));
    
    
    if (user) {
      setUser(user);
      setLogged(true)
    }

    if (token) {
      setToken(token);
      setLogged(true)
    }
  }, []);


  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/products`);
      const data = response.data;
      setProdId(data.map((product) => product._id));
      setProductsList(data);
    } catch (error) {
      console.log(error);
    }
  }
useEffect(() => {
    fetchProducts();
}, []);

useEffect(() => {
    console.log(prodId)
  }, [prodId]);

  return (
    <>
      <AppContext.Provider value={{ token, setToken, logged, setLogged, productsList, setProductsList, user, setUser, prodId, setProdId}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/e-shop" element={<Welcome />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/users/:id/wishlist" element={<WishList />} />
            <Route path="/users/cart" element={<Cart />} />

          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;
