import React, { useContext, useState, useEffect } from "react";
import AppContext from "../context/appContext";
import braintree from "braintree-web";
import { Form, Button, Row, Col } from 'react-bootstrap';
import styled from "styled-components";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background: white;

    .braintree-hosted-fields-focused {
      color: #495057;
      background-color: #fff;
      border-color: #80bdff;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
    
    .braintree-hosted-fields-focused.is-invalid {
      border-color: #dc3545;
      box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
`;

const Toast = styled.div`
position: fixed;
top: 15px;
right: 15px;
z-index: 9999;
  `


function Payment() {
  const { baseUrl } = useContext(AppContext);
  const [clientToken, setClientToken] = useState(null);
  const [paymentMethodNonce, setPaymentMethodNonce] = useState(null);

  useEffect(() => {
    // Fetch the client token from your Node.js server
    fetch(`${baseUrl}/users/payment`)
      .then((response) => response.text())
      .then((token) => setClientToken(token))
      .catch((error) => console.error(error));
  }, []);

  const handlePayment = () => {
    braintree.client.create(
      {
        authorization: clientToken,
      },
      (err, clientInstance) => {
        clientInstance.request(
          {
            endpoint: "payment_methods/credit_cards",
            method: "post",
            data: {
              creditCard: {
                number: "4111111111111111",
                expirationDate: "10/2024",
              },
            },
          },
          (err, response) => {
            setPaymentMethodNonce(response.creditCards[0].nonce);
          }
        );
      }
    );
  };

  return (
    <>
      <Container className="bootstrap-basic">
        <Form noValidate>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Label htmlFor="cc-name">Cardholder Name</Form.Label>
              <Form.Control
                type="name"
                id="name"
                placeholder="Name"
                isInvalid={false}
              />
              <Form.Text className="text-muted">
                Full name as displayed on card
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Name on card is required
              </Form.Control.Feedback>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                placeholder="you@example.com"
                isInvalid={false}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address for shipping updates.
              </Form.Control.Feedback>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Label>Credit card number</Form.Label>
              <Form.Control
                type="text"
                id="card"
                placeholder="Credit Card Number"
                isInvalid={false}
              />
              <Form.Control.Feedback type="invalid">
                Credit card number is required
              </Form.Control.Feedback>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Label>Expiration</Form.Label>
              <Form.Control
                type="text"
                id="expiration"
                placeholder="Expiration"
                isInvalid={false}
              />
              <Form.Control.Feedback type="invalid">
                Expiration date required
              </Form.Control.Feedback>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="text"
                id="cvv"
                placeholder="CVV"
                isInvalid={false}
              />
              <Form.Control.Feedback type="invalid">
                Security code required
              </Form.Control.Feedback>
            </Col>
          </Row>

          <hr className="mb-4" />
          <div className="text-center">
            <Button variant="primary" size="lg" type="submit">
              Pay with <span id="card-brand">Card</span>
            </Button>
          </div>
        </Form>
      </Container>
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{ position: 'relative', minHeight: '200px' }}
      >
        <Toast
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-autohide="false"
        >
          <div className="toast-header">
            <strong className="mr-auto">Success!</strong>
            <small>Just now</small>
            <Button
              type="button"
              className="ml-2 mb-1 close"
              data-dismiss="toast"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </Button>
          </div>
          <div className="toast-body">
            Next, submit the payment method nonce to your server.
          </div>
        </Toast>
      </div>
    </>
  );
  }
export default Payment;
