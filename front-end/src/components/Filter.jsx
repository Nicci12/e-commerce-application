import React, { useContext, useState } from "react";

import styled from "styled-components";
import AppContext from "../context/appContext";
import { Offcanvas, OffcanvasHeader, OffcanvasBody } from "reactstrap";

const Button = styled.button`
  width: 20%;
  border: none;
  padding: 10px 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 20px 10px 0 24px;
`;

const FilterButton = styled.button`
  width: 100px
  border: none;
  padding: 10px 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 20px 10px 0 24px;
`;

const Conatiner = styled.div`
  display: flex;
  flex-direction: column;
`;

function Filter() {
  const { handleCategorySelection } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <div>
        <div>
          <Button onClick={toggle}>Find By</Button>
          <Offcanvas placement="left" isOpen={isOpen} toggle={toggle}>
            <OffcanvasHeader toggle={toggle}>Categories:</OffcanvasHeader>
            <OffcanvasBody>
              <strong>Find By:</strong>
              <Conatiner>
                <FilterButton onClick={() => handleCategorySelection("all")}>
                  All
                </FilterButton>
                <FilterButton
                  onClick={() => handleCategorySelection("item", "dress")}>
                  Dress
                </FilterButton>
                <FilterButton
                  onClick={() => handleCategorySelection("item", "jeans")}>
                  Jeans
                </FilterButton>
                <FilterButton
                  onClick={() => handleCategorySelection("color", "pink")}>
                  Pink
                </FilterButton>
                <FilterButton
                  onClick={() => handleCategorySelection("color", "green")}>
                  Green
                </FilterButton>
                <FilterButton
                  onClick={() => handleCategorySelection("gender", "male")}>
                  Male
                </FilterButton>
                <FilterButton
                  onClick={() => handleCategorySelection("gender", "female")}>
                  Female
                </FilterButton>
                <FilterButton
                  onClick={() => handleCategorySelection("gender", "both")}>
                  Both
                </FilterButton>
              </Conatiner>
            </OffcanvasBody>
          </Offcanvas>
        </div>
      </div>
    </>
  );
}

export default Filter;
