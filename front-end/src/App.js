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
  const baseUrl = "e-commerce-application-pi.vercel.app";
  const [token, setToken] = useState("");
  const [productsList, setProductsList] = useState([])
  const [prodId, setProdId]= useState([])
  const [user, setUser] = useState([])
  const [logged, setLogged]= useState(false)
  const [item, setItem] = useState("");
  const [color, setColor] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState("");
  const [filter, setFilter] = useState([]);

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
      const response = await axios.get(`http://${baseUrl}/products`);
      const data = response.data;
      setProductsList(response.data);
      setProdId(data.map((product) => product._id));
    } catch (error) {
      console.log(error);
    }
  }

useEffect(() => {
    fetchProducts();
}, []);

  return (
    <>
      <AppContext.Provider value={{ baseUrl, token, setToken, logged, setLogged, productsList, setProductsList, user, setUser, prodId, setProdId, fetchProducts,  color,setColor, gender, setGender, price, setPrice, sizes, setSizes,item, setItem, setFilter, filter}}>
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
