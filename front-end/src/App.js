import React, { useState, useEffect } from "react";
import Home from "./page/Home";
import Login from "./page/Login";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import Signup from "./page/Signup";
import AllProducts from "./page/AllProducts";
import Cart from "./page/Cart";
import AppContext from "./context/appContext";
import axios from "axios";
import WishList from "./page/WishList";
import Product from "./page/Product";


function App() {
  const baseUrl = "http://localhost:8080";
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false)
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
  const [cartCount, setCartCount] = useState(0);

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
      setProductsList(response.data);
      setProdId(data.map((product) => product._id));
    } catch (error) {
      console.log(error);
    }
  }

useEffect(() => {
    fetchProducts();
}, []);

const onSearch = async () => {
  setLoading(true);
  try {
    const response = await axios.get(`${baseUrl}/products/filter?item=${item}&color=${color}&gender=${gender}&price=${price}&sizes=${sizes}`);
    const data = response.data;
    setProductsList(data);
    setFilteredProducts(data);
    setLoading(false);
  } catch (error) {
    console.error(error);
    setLoading(false);
  }
};

useEffect(() => {
  setShowFilter(true);
  onSearch();
}, []);

const handleCategorySelection = (category, value) => {
  setSelectedCategory(category);
  if (category === "all") {
    setFilteredProducts(productsList);
  } 
  else if( category === "item" && value === "dress"){
    setFilteredProducts(
    productsList.filter((product) => product.item === "dress")
    );
  }
  else if( category === "item" && value === "Jeans"){
    setFilteredProducts(
    productsList.filter((product) => product.item === "Jeans")
    );
  }
  else if( category === "sizes" && value === "S"){
    setFilteredProducts(
    productsList.filter((product) => product.sizes === "S")
    );
  }
  else if( category === "color" && value === "pink"){
    setFilteredProducts(
    productsList.filter((product) => product.color === "pink")
    );
  }
  else if( category === "color" && value === "green"){
    setFilteredProducts(
    productsList.filter((product) => product.color === "green")
    );
  }
  else if( category === "gender" && value === "female"){
    setFilteredProducts(
    productsList.filter((product) => product.gender === "female")
    );
    }
    else if( category === "gender" && value === "male"){
      setFilteredProducts(
      productsList.filter((product) => product.gender === "male")
      );
    }
    else if( category === "gender" && value === "both"){
      setFilteredProducts(
      productsList.filter((product) => product.gender === "both")
      );
    }
  else {
    setFilteredProducts(productsList);
  }
}

  return (
    <>
      <AppContext.Provider value={{ baseUrl, handleCategorySelection, filteredProducts, token, setProductsList, setToken, logged, setLogged, productsList, setProductsList, user, setUser, prodId, setProdId, fetchProducts,  color,setColor, gender, setGender, price, setPrice, sizes, setSizes,item, setItem, setFilter, filter, cartCount, setCartCount}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
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
