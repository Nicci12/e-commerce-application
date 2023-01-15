import React, {useContext} from "react";
import styled from "styled-components";
// import { popularProducts } from  "../utils/data"
import Product from "./Product";
// import axios from "axios";
// import AppContext from "../context/appContext";
import { popularProducts } from "../utils/data";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = () => {
  // const { productsList } = useContext(AppContext);
  return (
    <Container>
      {popularProducts.map((item) => (
        <Product item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default Products;