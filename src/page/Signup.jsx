import styled from "styled-components";
import React from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import Navbar from "../components/Navbar";
import Social from "../components/Socials";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Signup = () => {
  let navigate = useNavigate();
  function Logging() {
    navigate("/login");
  }
  return (
    <MDBContainer fluid className="my-5">
      <Navbar />
      <MDBRow className="g-0 align-items-center">
        <MDBCol col="6">
          <MDBCard
            className="my-5 cascading-right"
            style={{
              background: "hsla(0, 0%, 100%, 0.55)",
              backdropFilter: "blur(30px)",
            }}>
            <MDBCardBody className="p-5 shadow-5 text-center">
              <h2 className="fw-bold mb-5">Sign up now</h2>

              <MDBRow>
                <MDBCol col="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="First name"
                    id="form1"
                    type="text"
                  />
                </MDBCol>

                <MDBCol col="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Last name"
                    id="form2"
                    type="text"
                  />
                </MDBCol>
              </MDBRow>

              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                id="form3"
                type="email"
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form4"
                type="password"
              />

              <div className="d-flex justify-content-center mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="Subscribe to our newsletter"
                />
              </div>

              <Button onClick={Logging}>Register Here</Button>

              <div className="text-center">
                <p>or sign up with:</p>

                <Social />
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol col="6">
          <img
            src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
            class="w-100 rounded-4 shadow-4"
            alt=""
            fluid
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Signup;
