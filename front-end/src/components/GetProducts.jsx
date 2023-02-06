import React, {useContext, useState} from "react";
import styled from "styled-components";
import GetAllProducts from "./GetAllProducts";
import AppContext from "../context/appContext";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const GetProducts = () => {
  const {
    item,
    setItem,
    color,
    setColor,
    sizes,
    setSizes,
    price,
    setPrice,
    gender,
    setGender,
    productsList
  } = useContext(AppContext);
  const [filter, setFilter]=useState([]);
  const [showFilter, setShowFilter]=useState(false)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [productArray, setProductArray] = useState({
    item: "",
    color: "",
    gender: "",
    price: "",
    sizes: "",
  });


  const onSearch= async (e) => {
    e.preventDefault();
    try {
      const response = await 
      axios
        .get(`http://localhost:8080/products/filter?item=${item}&color=${color}&gender=${gender}&price=${price}&sizes=${sizes}`)
      const data = response.data;
      setFilter(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {showFilter ? (
        <Container>
          {productsList.map((product) => (
            <GetAllProducts setShowFilter={true} product={product} key={product._id} />
          ))}
        </Container>
      ) : (
        <>
          <Form onSubmit={onSearch}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Item</Form.Label>
              <Form.Control
                placeholder="Item Type"
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Color</Form.Label>
              <Form.Control
                placeholder="color"
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Catrgory</Form.Label>
              <Form.Select className="mb-3 form-select" onChange={(e) => setGender(e.target.value)}>
                <option>Type</option>
                <option className="form-select" value="male">Male</option>
                <option className="form-select" value="female">Female</option>
                <option className="form-select" value="both">Both</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="text"
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
                placeholder="Sizes"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                autoFocus
              />
            </Form.Group>
          </Form>
          <Button onClick={onSearch} type="submit">
            Search
          </Button>
          <Container>
            {filter.map((product) => (
              <GetAllProducts product={product} key={product._id} />
            ))}
          </Container>
        </>
      )}
    </>
  );
  }
  export default GetProducts;