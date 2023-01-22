import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/appContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
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
function WishList() {
  const { user, productsList } = useContext(AppContext);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://localhost:8080/users/${user}/wishlist`
        );
        const wishlistIds = res.data.wishlist;
        const requests = wishlistIds.map(async (id) => {
          const product = await axios.get(
            `http://localhost:8080/products/${id}`
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

  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await axios.get(`http://localhost:8080/users/${user}/wishlist`);
  //    const array=res.data.wishlist
  //    array.forEach(async () => {
  //    const wishlist = await axios.get(`http://localhost:8080/products/wishlist/${array}`)
  //    setWishlist((prev) => [...prev, wishlist.data]);
  //   //  console.log("array", array)
  //   //  console.log("prodcuts", products.data)
  //   }
  // )}
  //   fetchData();
  // }, []);

  // if (!wishlist) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
          <Title>Your Wishlist</Title>
          <Bottom>
            <Info>
              {wishlist.map((item) => (
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
                    <ShoppingCartIcon />
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductName>
                     Remove From Wishlist
                      </ProductName>
                    <ProductAmountContainer>
                      <DeleteIcon />
                    </ProductAmountContainer>
                  </PriceDetail>
                </Product>
              ))}
            </Info>
            {/* <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ 80</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ -5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ 80</SummaryItemPrice>
              </SummaryItem>
              <Button>CHECKOUT NOW</Button>
            </Summary> */}
          </Bottom>
        </Wrapper>
        <Footer />
      </Container>
    </>
  );
}
export default WishList;
