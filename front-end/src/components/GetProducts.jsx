import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import GetAllProducts from "./GetAllProducts";
import AppContext from "../context/appContext";
import Filter from "./Filter";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const GetProducts = () => {
  const { loading, filteredProducts } = useContext(AppContext);

  return (
    <div>
      <Filter />
      <Container>
        {loading ? (
          <h1>Loading</h1>
        ) : (
          filteredProducts.map((product) => (
            <GetAllProducts product={product} key={product._id} />
          ))
        )}
      </Container>
    </div>
  );
};
export default GetProducts;
