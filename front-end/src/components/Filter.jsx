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
  width: 50%;
  border: none;
  padding: 10px 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 20px 10px 10px 10px;
`;

const Conatiner = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
`;

const StyledDropdownButton = styled(DropdownButton).attrs(() => ({
  bsPrefix: "dropdown",
}))`
    .dropdown {
      width: 50%;
      border: none;
      padding: 10px 10px;
      background-color: teal;
      color: white;
      cursor: pointer;
      margin: 20px 10px 10px 10px;
      }
    }
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
                <StyledDropdownButton id="dropdown-item-button" title="Items">
                  <Dropdown.Item
                    className="my-dropdown-item"
                    as="button"
                    onClick={() => handleCategorySelection("item", "dress")}>
                    Dress
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="my-dropdown-item"
                    as="button"
                    onClick={() => handleCategorySelection("item", "Jeans")}>
                    Jeans
                  </Dropdown.Item>
                </StyledDropdownButton>
                <StyledDropdownButton id="dropdown-item-button" title="Sizes">
                  <Dropdown.Item
                    as="button"
                    onClick={() => handleCategorySelection("sizes", "small")}>
                    Small
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="button"
                    onClick={() => handleCategorySelection("sizes", "medium")}>
                    Medium
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="button"
                    onClick={() => handleCategorySelection("sizes", "large")}>
                    Large
                  </Dropdown.Item>
                </StyledDropdownButton>
                <StyledDropdownButton id="dropdown-item-button" title="Colors">
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
                </StyledDropdownButton>
                <StyledDropdownButton id="dropdown-item-button" title="Gender">
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
                </StyledDropdownButton>
              </Conatiner>
            </OffcanvasBody>
          </Offcanvas>
        </div>
      </div>
    </>
  );
}

export default Filter;
