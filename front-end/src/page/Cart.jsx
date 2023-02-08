import React, { useState, useEffect, useContext } from "react";
import AppContext from "../context/appContext";
import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  @media only screen and (max-width: 750px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  padding-bottom: 20px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  margin-right: 200px;
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

const Bottom = styled.div`
  @media only screen and (max-width: 750px) {
    display: flex;
    flex-direction: column;
  }
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  @media only screen and (max-width: 750px) {
    display: flex;
    flex-direction: column;
  }
  display: flex;
  justify-content: space-between;
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
  @media only screen and (max-width: 750px) {
    margin: 5px 15px;
  }
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  @media only screen and (max-width: 750px) {
    margin-bottom: 20px;
  }
  font-size: 30px;
  font-weight: 200;
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
  height: 72vh;
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

const ButtonContainer = styled.div`
@media only screen and (max-width: 750px) {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin:30px 50px;
}
  display: flex;
  justify-content: center;
  align-items: center;
`;
const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const EmptyCartImage = styled.img`
  width: 150px;
  height: 150px;
`;

const EmptyCartlistHeading = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 30px 0 10px 0;
  color: #5e5e5e;
`;

const EmptyCartSubHeading = styled.h6`
  text-aling:center
  font-weight: bold;
  margin: 10px 30px 30px 30px;
  color: #5e5e5e;
`;

const EmptyCartlist = () => {
  const navigate = useNavigate();
  function Return() {
    navigate("/products");
  }
  return (
    <EmptyCartContainer>
      <EmptyCartImage src="../img/bag.png" alt="Empty Wishlist" />
      <EmptyCartlistHeading>Your Shopping Cart Is Empty</EmptyCartlistHeading>
      <EmptyCartSubHeading>
        Please add procuts to your cart in order to check out
      </EmptyCartSubHeading>
      <TopButton onClick={Return}>Continue Shopping</TopButton>
    </EmptyCartContainer>
  );
};

const Cart = () => {
  const { user, baseUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  let total = 0;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${baseUrl}/users/${user}/cart`);
        const cartIds = res.data;
        console.log("cartIds", cartIds);
        const requests = cartIds.map(async (id) => {
          const product = await axios.get(`${baseUrl}/products/${id}`);
          return product.data;
        });
        // const requests = cartIds.map(async (id) => {
        //   const productId = id.product;
        //   const product = await axios.get(
        //     `http://localhost:8080/products/cart/${productId}`
        //   );
        //   return product.data;
        // });
        const items = await Promise.all(requests);
        setCartItems(items.map((item) => ({ ...item, stock: 1 })));
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [user]);

  const calculateTotalPrice = () => {
    const total = cartItems.reduce(
      (acc, item) =>
        acc + item.price * (isNaN(item.stock) ? 1 : parseInt(item.stock)),
      0
    );
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const changeQuantity = (index, newQuantity) => {
    const newCartItems = [...cartItems];
    newCartItems[index].stock = newQuantity;
    setCartItems(newCartItems);
  };

  const handleAdd = (index) => {
    changeQuantity(index, cartItems[index].stock + 1);
    calculateTotalPrice();
  };
  const handleRemove = (index) => {
    changeQuantity(index, cartItems[index].stock - 1);
    calculateTotalPrice();
  };

  const handleDelete = async (user, prodId) => {
    try {
      const res = await axios.put(`${baseUrl}/users/${user}/removecart`, {
        prodId,
      });
      const array = [...cartItems];
      const cartArray = array.filter((item) => item._id !== prodId);
      setCartItems(cartArray);
      console.log("cart delete", cartItems);
    } catch (err) {
      console.log(err);
    }
  };

  function Return() {
    navigate("/products");
  }
  return (
    <>
      <Container>
        <Header />
        <Announcement />
        <Wrapper>
          <Bottom>
            <Info>
              {cartItems.length === 0 ? (
                <EmptyCartlist />
              ) : (
                cartItems.map((item, index) => (
                  <Product key={item._id}>
                    <ProductDetail>
                      <Image src={item.images} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {item.item}
                        </ProductName>
                        <ProductId></ProductId>
                        <ProductColor color={item.color} />
                        <ProductSize>
                          <b>Size:</b> {item.sizes}
                        </ProductSize>
                        <DeleteIcon
                          onClick={() =>
                            handleDelete(user, item._id)
                          }></DeleteIcon>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <Add onClick={() => handleAdd(index)} />
                        <ProductAmount>{item.stock}</ProductAmount>
                        <Remove onClick={() => handleRemove(index)} />
                      </ProductAmountContainer>
                      <ProductPrice>${item.price}.00</ProductPrice>
                    </PriceDetail>
                  </Product>
                ))
              )}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$80.00</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$0.00</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemPrice>Total: ${totalPrice}</SummaryItemPrice>
              </SummaryItem>
              <Button>CHECKOUT NOW</Button>
            </Summary>
          </Bottom>
          {cartItems.length === 0 ? (
            <></>
          ) : (
            <ButtonContainer>
            <TopButton onClick={Return}>CONTINUE SHOPPING</TopButton>
            </ButtonContainer>
          )}
        </Wrapper>
        <Footer />
      </Container>
    </>
  );
};

export default Cart;
