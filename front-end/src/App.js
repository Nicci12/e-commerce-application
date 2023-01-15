import React, { useState, useEffect } from "react";
import Home from "./page/Home";
import Login from "./page/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./page/Signup";
import Welcome from "./page/Welcome";
import AppContext from "./context/appContext";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("")
  const [logged, setLogged]= useState(false)

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      setToken(token);
      setLogged(true)
    }
  }, []);
  return (
    <>
      <AppContext.Provider value={{ token, setToken, user, setUser, logged, setLogged }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/e-shop" element={<Welcome />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;
