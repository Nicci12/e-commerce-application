import styled from "styled-components";
import React, { useState, useContext } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import Header from "../components/Header";
import logos from "../img/logo.png";
import Social from "../components/Socials";
import AppContext from "../context/appContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;
const Image = styled.img`
  width: 15%;
  height: 15%;
  padding-right: 5%;
`;

const Signup = () => {
  const { baseUrl } = useContext(AppContext);
  const [userInfo, setUserInfo] = useState({});
  let navigate = useNavigate();

  const handleTextChange = (e) => {
    e.preventDefault();
    setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://${baseUrl}/users/signup`, userInfo);
      if (res.data.userId) {
        navigate("/login");
      }
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <MDBContainer className="my-5">
        <Header />
        <MDBCard>
          <MDBRow className="g-0 mx-2 mt-5">
            <MDBCol md="6">
              <MDBCardImage
                src="https://img.freepik.com/premium-photo/man-surprised-face-pointing-shopping-bags-shopping-concept-guy-holds-bunch-colorful-shopping-bags-man-shopping-black-friday-guy-bought-lot-items-with-discount_474717-14798.jpg?w=2000"
                alt="register form"
                className="rounded-start w-100 h-90"
              />
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  <MDBIcon
                    fas
                    icon="cubes fa-3x me-3"
                    style={{ color: "#ff6219" }}
                  />
                  <Image src={logos}></Image>
                </div>

                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}>
                  Sign into your account
                </h5>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Name"
                  id="form1"
                  type="text"
                  onChange={handleTextChange}
                />
                <MDBCol col="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Last name"
                    id="surname"
                    type="text"
                    onChange={handleTextChange}
                  />
                </MDBCol>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  id="email"
                  type="email"
                  onChange={handleTextChange}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="password"
                  type="password"
                  onChange={handleTextChange}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="repassword"
                  type="password"
                  onChange={handleTextChange}
                />
                <Button onClick={handleSignUp}>Register Here</Button>

                <div className="text-center">
                  <p>or sign up with:</p>

                  <Social />
                </div>
                <div className="d-flex justify-content-center mb-4">
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Subscribe to our newsletter"
                  />
                </div>

                <div className="d-flex flex-row justify-content-start">
                  <a href="#!" className="small text-muted me-1">
                    Terms of use.
                  </a>
                  <a href="#!" className="small text-muted">
                    Privacy policy
                  </a>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default Signup;
