import React, { useContext, useState } from "react";
import styled from "styled-components";
import AppContext from "../context/appContext";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
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
  width: 350px;
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
                <DropdownButton id="dropdown-item-button" title="Items">
                  <Dropdown.Item
                    as="button"
                    onClick={() => handleCategorySelection("item", "dress")}>
                    Dress
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="button"
                    onClick={() => handleCategorySelection("item", "jeans")}>
                    Jeans
                  </Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-item-button" title="Colors">
                  <Dropdown.Item
                    as="button"
                    onClick={() => handleCategorySelection("color", "pink")}>
                    Pink
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="button"
                    onClick={() => handleCategorySelection("color", "green")}>
                    Green
                  </Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-item-button" title="Colors">
                  <Dropdown.Item
                    as="button"
                    onClick={() => handleCategorySelection("gender", "male")}>
                    Male
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="button"
                    onClick={() => handleCategorySelection("gender", "female")}>
                    Female
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="button"
                    onClick={() => handleCategorySelection("gender", "both")}>
                    Both
                  </Dropdown.Item>
                </DropdownButton>
              </Conatiner>
            </OffcanvasBody>
          </Offcanvas>
        </div>
      </div>
    </>
  );
}

export default Filter;
