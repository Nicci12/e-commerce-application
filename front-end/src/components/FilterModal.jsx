
import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import AppContext from "../context/appContext";

function FilterModal() {
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
  } = useContext(AppContext);
  const [filter, setFilter]=useState([]);
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
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <div>
          <Modal.Body>
            <Form onSubmit={onSearch}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1">
                <Form.Label>Item</Form.Label>
                <Form.Control
                  placeholder="Item Type"
                  type="text"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  placeholder="color"
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1">
                <Form.Label>Catrgory</Form.Label>
                <Form.Select
                  className="mb-3 form-select"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option>Type</option>
                  <option className="form-select" value="male">
                    Male
                  </option>
                  <option className="form-select" value="female">
                    Female
                  </option>
                  <option className="form-select" value="both">
                    Both
                  </option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1">
                <Form.Label>Size</Form.Label>
                <Form.Control
                  type="text"
                  value={sizes}
                  onChange={(e) => setSizes(e.target.value)}
                  placeholder="Sizes"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1">
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
          </Modal.Body>
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
                onClick={onSearch}
                type="submit"
              >
                Search
              </Button>
              <Row xs={1} md={2} lg={3} xl={4} className="petCard">
                {filter.map((product) => (
              <div key={product._id} className="card member-box shadow-lg">
                <span className="shape">{product.item}</span>
               
                <div className="card-body">
                  <strong>
                    {" "}
                    <h4 className="member-title">{product.sizes}</h4>
                    <h4 className="member-title">{product.gender}</h4>
                    <h4 className="member-title">{product.color}</h4>
                  </strong>
                </div>
                <div className="card-footer">
                </div>
              </div>
            ))}
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FilterModal;
