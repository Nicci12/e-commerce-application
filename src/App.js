import React from "react";
import Home from "./page/Home";
import Login from "./page/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Signup from "./page/Signup";
import Welcome from "./page/Welcome";

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup/>} />
      <Route path="/e-shop" element={<Welcome/>} />
     </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
