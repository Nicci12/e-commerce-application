import React, {useContext} from "react";
import styled from "styled-components";
import GetAllProducts from "./GetAllProducts";
import AppContext from "../context/appContext";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const GetProducts = () => {
    const {productsList} = useContext(AppContext);
  return (
    <Container>
      {productsList.map((product) => (
        <GetAllProducts product={product} key={product._id} />
      ))}
    </Container>
  );
};

export default GetProducts;