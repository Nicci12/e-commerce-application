import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import appContext from "../context/appContext";
import logos from "../img/logo.png"

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
   display: flex; 
   flex-direction: row-reverse;
   justify-content: center;
  flex: 1;
  align-items: center
  text-align: center;
`;

const Logo = styled.h1`
@media only screen and (max-width: 750px){
font-size: 18px;
margin: 5px 0px 5px 10px;
}
font-weight: bold;
text-align: center;
padding-top:4px;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
@media only screen and (max-width: 750px){
  display:none
}
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const Image = styled.img`
  width: 13%;
  height:13%;

`;
const MenuItem = styled.div`
@media only screen and (max-width: 750px){
  font-size: 18px;
  padding: 10px 10px 10px 10px
  font-weight:bold
}
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;


const HamburgerMenu = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
position: fixed;
bottom: 10px;
z-index: 100;
background-color: white;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
border-radius: 50%;
cursor: pointer;
height: 50px;
width: 50px;
> div {
  border: 2px solid black;
  border-radius: 10px;
  margin: 3px;
  width: 50%;
}
`
const BlocTocWrapper = styled.div`
@media only screen and (max-width: 750px){
background-color: teal;
color: black;
height: 100%;
width: 200px;
position: fixed;
text-align: left;
z-index: 1;
top: 0;
left: 0;
overflow-x: hidden;
padding-top: 50px;
}
`

const Header = () => {
  const { logged, setLogged} = useContext(appContext);
  const navigate=useNavigate()
  
  const [windowWidth, setWindowWidth] = useState();
  const [showBlogToc, setShowBlogToc] = useState(true);


  const toggleBlogToc = () => {
    setShowBlogToc(!showBlogToc);
  };
  useEffect(() => {
    setWindowWidth(window.outerWidth);

    function handleResize() {
      setWindowWidth(window.outerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth <= 750) {
      if (!showBlogToc) {
        setShowBlogToc(true);
      }
    } else {
      if (showBlogToc) {
        setShowBlogToc(false);
      }
    }
  }, [windowWidth]);



  function Logging() {
    setLogged(true);
    navigate("/login");
    setLogged(false);
  }

  function Logout() {
    setLogged(false);
    navigate("/");
    localStorage.clear();
  }

  function Register() {
    navigate("/register");
  }

  function Home() {
    navigate("/");
  }

  function Cart() {
    navigate("/users/cart");
  }

  function Wishlist() {
    navigate("/users/:id/wishlist");
  }
  
  return (
    <>
    {windowWidth < 750 && (
      <HamburgerMenu onClick={toggleBlogToc}>
        <div></div>
        <div></div>
        <div></div>
      </HamburgerMenu>
    )}
  {showBlogToc && (
  <BlocTocWrapper>
   {logged ? (
              <MenuItem onClick={Wishlist}>WishList</MenuItem>
            ) : (
              <MenuItem onClick={Register}>Register</MenuItem>
            )}
            {logged ? (
              <MenuItem onClick={Logout}>Sign Out</MenuItem>
            ) : (
              <MenuItem onClick={Logging}>Sign In</MenuItem>
            )}

  </BlocTocWrapper>
  )}
      
      <Container>
        <Wrapper>
          <Left>
            <Language>EN</Language>
            <SearchContainer>
              <Input placeholder="Search" />
              <Search style={{ color: "gray", fontSize: 16 }} />
            </SearchContainer>
          </Left>
          <Center>
            <Logo onClick={Home}>E-SHOP</Logo>
            <Image src={logos}></Image>
          </Center>
          <Right>
            {logged ? (
              <MenuItem onClick={Wishlist}>WishList</MenuItem>
            ) : (
              <MenuItem onClick={Register}>Register</MenuItem>
            )}
            {logged ? (
              <MenuItem onClick={Logout}>Log Out</MenuItem>
            ) : (
              <MenuItem onClick={Logging}>Sign In</MenuItem>
            )}
            <MenuItem>
              <Badge badgeContent={4} color="primary">
                <ShoppingCartOutlined onClick={Cart} />
              </Badge>
            </MenuItem>
          </Right>
        </Wrapper>
      </Container>  

   </>
 );

};

export default Header;
