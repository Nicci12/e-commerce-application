import React, { useState, useContext } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import {
  MDBContainer,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AppContext from "../context/appContext";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setLogged } = useContext(AppContext);
  let navigate = useNavigate();

  const handleLogIn = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:8080/users/login", {
        email,
        password,
      });
      console.log(res);
      if (res.data.token) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        setToken(res.data.token);
      }
      setLogged(true);
      navigate("/e-shop");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <MDBContainer className="my-5">
        <Navbar />
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form"
                className="rounded-start w-100"
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
                  <span className="h1 fw-bold mb-0">Logo</span>
                </div>

                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}>
                  Sign into your account
                </h5>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  size="lg"
                />

                <Button onClick={handleLogIn}>Login</Button>
                <a className="small text-muted" href="#!">
                  Forgot password?
                </a>
                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                  Don't have an account?{" "}
                  <Link to="/register" style={{ color: "#393f81" }}>
                    Register here
                  </Link>
                </p>

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

export default Login;
