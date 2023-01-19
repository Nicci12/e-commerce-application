import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppContext from "../context/appContext";
import styled from "styled-components";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const GetAllProducts = ({ product}) => {
  const {user, token } = useContext(AppContext);
  const [prodId, setProdId] = useState(product._id);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  function navigateToProduct(product) {
    navigate(`/products/${product._id}`);
  }

  const handleAddToWishlist = async () => {
    try {
      setWishlist([...wishlist, prodId]);
      if (wishlist.includes(prodId)) {
        alert("Item already in wishlist");
    } else {
      await axios.post(`http://localhost:8080/users/${user}/wishlist`, { prodId: prodId });
      alert("added to cart")
    }
    } catch (err) {
      console.error(err);
    }
  }



  return (
    <Container>
      <Circle />
      <Image src={product.images} />
      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon
          onClick={() => {
            navigateToProduct(product);
          }}>
          <SearchOutlined />
        </Icon>
        <Icon onClick={handleAddToWishlist}>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default GetAllProducts;
