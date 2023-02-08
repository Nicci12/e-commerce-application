import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
@media only screen and (max-width: 750px){
  height:25vh;
  margin-bottom: 60px;
 }
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
@media only screen and (max-width: 750px){
 height:35vh;
 object-fit: cover;

}
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
@media only screen and (max-width: 750px){
   position: absolute;
  font-size: 10px;
 }
 position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
@media only screen and (max-width: 750px){
  font-size:15px;
  align-text: center;

 }
    color:white;
    margin-bottom: 20px;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;
function MenCatergory({ item }) {
  const navigate=useNavigate()
  function ProductsPage(){
    navigate("/products")
   }
  return (
    <div>
      <Container>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button onClick={ProductsPage}>SHOP NOW</Button>
        </Info>
      </Container>
    </div>
  );
}

export default MenCatergory;
