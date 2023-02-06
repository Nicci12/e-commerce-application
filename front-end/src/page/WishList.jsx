import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/appContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const EmptyWishlistContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const EmptyWishlistImage = styled.img`
  width: 150px;
  height: 150px;
`;

const EmptyWishlistHeading = styled.h2`
font-size: 2rem;
font-weight: bold;
margin: 30px 0 10px 0;
color: #5e5e5e;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  &:hover {
    background-color: teal;
    color: black;
  }
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;


const EmptyWishListSubHeading = styled.h6`
  text-aling:center
  font-weight: bold;
  margin: 10px 30px 30px 30px;
  color: #5e5e5e;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;


const Button = styled.button`
width: 100%;
padding: 10px;
background-color: black;
color: white;
font-weight: 600;
`;
const EmptyWishlist = () => {
  const navigate = useNavigate();
  function Return() {
    navigate("/products");
  }
  return (
    <EmptyWishlistContainer>
      <EmptyWishlistImage src="https://i.pinimg.com/originals/f6/e4/64/f6e464230662e7fa4c6a4afb92631aed.png" alt="Empty Wishlist" />
      <EmptyWishlistHeading>Your Wishlist Is Empty</EmptyWishlistHeading>
      <EmptyWishListSubHeading>Add Some Of Your Favourite Items for Later</EmptyWishListSubHeading>
      <TopButton onClick={Return}>Continue Shopping</TopButton>
    </EmptyWishlistContainer>
  );
}
function WishList() {
  const { user, prodId, baseUrl } = useContext(AppContext);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://${baseUrl}/users/${user}/wishlist`
        );
        const wishlistIds = res.data.wishlist;
        const requests = wishlistIds.map(async (id) => {
          const product = await axios.get(
            `http://${baseUrl}/products/${id}`
          );
          return product.data;
        });
        const products = await Promise.all(requests);
        setWishlist(products);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [user]);

  const handleDelete = async (user, prodId) => {
    try {
      const res = await axios.put(
        `http://${baseUrl}/users/${user}/remove`,
        { prodId }
      );
      const list = [...wishlist];
      const listfilter = list.filter((item) => item._id !== prodId);
      setWishlist(listfilter);
      console.log("wishlist delete", wishlist);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = async (index) => {
    try {
      const existingItem = cart.find((item) => item._id !== prodId);
      console.log("exisiting item", existingItem);
      if (existingItem) {
        alert("Item already in cart");
      } else {
        setCart([...cart, wishlist[index]]);
        await axios.post(`http://${baseUrl}/users/${user}/cart`, {
          prodId: wishlist[index],
        });
        console.log("added to cart");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
          <Title></Title>
          <Bottom>
            <Info>
            {wishlist.length === 0 ? <EmptyWishlist /> : 
              wishlist.map((item, index) => (
                <Product key={item._id}>
                  <ProductDetail>
                    <Image src={item.images} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {item.item}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> 93813718293
                      </ProductId>
                      <ProductColor color={item.color} />
                      <ProductSize>
                        <b>Size:</b> {item.sizes}
                      </ProductSize>
                      <ShoppingCartIcon
                        onClick={() => handleAddToCart(index, item._id)}
                      />
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductName>Remove From Wishlist</ProductName>
                    <ProductAmountContainer
                      onClick={() => handleDelete(user, item._id)}>
                      <DeleteIcon />
                    </ProductAmountContainer>
                  </PriceDetail>
                </Product>
              ))
}
            </Info>
          </Bottom>
        </Wrapper>
        <Footer />
      </Container>
    </>
  );
}
export default WishList;
