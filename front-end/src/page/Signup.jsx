import styled from "styled-components";
import React, { useState, useContext } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import Header from "../components/Header";
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
    <MDBContainer fluid className="my-5">
       <Header />
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
                    label="name"
                    id="form1"
                    type="text"
                    onChange={handleTextChange}
                  />
                </MDBCol>

                <MDBCol col="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Last name"
                    id="surname"
                    type="text"
                    onChange={handleTextChange}
                  />
                </MDBCol>
              </MDBRow>

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

              <div className="d-flex justify-content-center mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="Subscribe to our newsletter"
                />
              </div>

              <Button onClick={handleSignUp}>Register Here</Button>

              <div className="text-center">
                <p>or sign up with:</p>

                <Social />
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol col="6">
          <img
            src="https://www.bloomadvisors.com/wp-content/uploads/2020/11/shopping.jpg"
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
