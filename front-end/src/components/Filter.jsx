import React, {useState} from 'react';
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: teal;
  padding: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  background-color: white;
  color: teal;
  border: 2px solid teal;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const ProductList = styled.ul`
  list-style: none;
  width: 80%;
`;

const ProductItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid teal;
`;

function Filter(props) {
    const [item, setItem] = useState("");
    const [color, setColor] = useState("");
    const [gender, setGender] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");
    const [searchProduct, setSearchProduct] = useState([]);
  
    function handleSearch(e) {
      e.preventDefault();
  
      axios
        .get(
          `http://localhost:8080/products/search?item=${item}&color=${color}&gender=${gender}&price=${price}&size=${size}`
        )
        .then((response) => {
          setSearchProduct(response.data);
          console.log("response in nav", response.data)
        })
        .catch((error) => {
          console.log("Error getting data: " + error);
        });
    }
    return (
        <Container onSubmit={handleSearch}>
        <FilterContainer>
        <FilterButton onClick={() => setGender('male')}>Male</FilterButton>
        <FilterButton onClick={() => setGender('female')}>Female</FilterButton>
        <FilterButton onClick={() => setColor('red')}>Red</FilterButton>
        <FilterButton onClick={() => setColor('blue')}>Blue</FilterButton>
        <FilterButton onClick={() => setPrice('low')}>Low</FilterButton>
        <FilterButton onClick={() => setPrice('high')}>High</FilterButton>
        <FilterButton onClick={() => setSize('small')}>Small</FilterButton>
        <FilterButton onClick={() => setSize('large')}>Large</FilterButton>
        <FilterButton onClick={() => setItem('shirt')}>Shirt</FilterButton>
        <FilterButton onClick={() => setItem('pant')}>Pant</FilterButton>
      </FilterContainer>
      </Container>
    );
}

export default Filter;