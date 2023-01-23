import React,{useState, useEffect, useContext} from 'react'
import AppContext from "../context/appContext";
import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
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
  justify-content: center;
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
`

const Cart = () => {
  const { user} = useContext(AppContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  let total = 0; 


  useEffect(() => {
    async function fetchData() {
        try {
            const res = await axios.get(`http://localhost:8080/users/${user}/cart`);
            const cartIds = res.data;
            const requests = cartIds.map(async (id) => {
              const productId = id.product;
              const product = await axios.get(`http://localhost:8080/products/cart/${productId}`);
              return product.data;
          });
            const items = await Promise.all(requests);
            setCartItems(items.map(item => ({...item, stock: 1})));
        } catch (error) {
            console.error(error);
        }
    }
    fetchData();
}, [user]);

const calculateTotalPrice = () => {
  cartItems.forEach((item) => {
    item.price = parseFloat(item.price.replace("$", ""));
    item.quantity = parseFloat(item.stock);
});

  // const total = cartItems.reduce((acc, item) => acc + (parseFloat(item.price.toString()) * (parseFloat(item.stock))),2);
  const total = cartItems.reduce((acc, item) => acc + (parseFloat(item.price.toString()) * (isNaN(item.stock.toString()) ? 1 : item.stock)), 2);
  // const total = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) * parseFloat(item.quantity)), 2);
  console.log("total", total)
  setTotalPrice(total);
};

useEffect(() => {
  calculateTotalPrice();
}, [cartItems])

const changeQuantity = (index, newQuantity) => {
  const newCartItems = [...cartItems];
  newCartItems[index].stock = newQuantity;
  setCartItems(newCartItems);
}

const handleAdd = (index) => {
  changeQuantity(index, cartItems[index].stock + 1);
  calculateTotalPrice();
}
const handleRemove = (index) => {
  changeQuantity(index, cartItems[index].stock - 1);
  calculateTotalPrice();
}

// const handleOnChange = (position) => {
//   const updatedCheckedState = [...checkedState];
//   updatedCheckedState[position] = !updatedCheckedState[position];
//   setCheckedState(updatedCheckedState);
//   let totalPrice = 0;
//   for (let i = 0; i < cartItems.length; i++) {
//       if (updatedCheckedState[i]) {
//           totalPrice += cartItems[i].price;
//       }
//   }
//   setTotal(totalPrice);
// };

// const handleOnClick = (position) => {
//   const updatedCheckedState = [...checkedState];
//   updatedCheckedState[position] = !updatedCheckedState[position];
//   setCheckedState(updatedCheckedState);
//   let totalPrice = 0;
//   for (let i = 0; i < cartItems.length; i++) {
//       if (updatedCheckedState[i]) {
//           totalPrice += cartItems[i].price;
//       }
//   }
//   setTotal(totalPrice);
//   console.log("total", total)
// };

function Return() {
  navigate("/products");
}
  return (
    <>
    <Container>
        <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
          {cartItems.map((item, index) => (
    <Product key={index}>
        <ProductDetail>
            <Image src={item.images} />
            <Details>
                <ProductName>
                    <b>Product:</b> {item.item}
                </ProductName>
                <ProductId>
                </ProductId>
                <ProductColor color={item.color} />
                <ProductSize>
                    <b>Size:</b> {item.sizes}
                </ProductSize>
            </Details>
        </ProductDetail>
        <PriceDetail>
            <ProductAmountContainer>
                <Add onClick={() => handleAdd(index)}/>
                <ProductAmount>{item.stock}</ProductAmount>
                <Remove onClick={() => handleRemove(index)} />
            </ProductAmountContainer>
            <ProductPrice>{item.price}</ProductPrice>
            {/* <input
                    type="checkbox"
                    data-testid="ch1"
                    id={`custom-checkbox-${index}`}
                    name={item.price}
                    value={item.price}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  /> */}
        </PriceDetail>
    </Product>
))}
          </Info>
          <Summary>
         {/* <button onClick={handleOnClick}>Button</button> */}
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
              <SummaryItemPrice>$</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
            <SummaryItemText>Total </SummaryItemText>
         <SummaryItemPrice>Total: {totalPrice}</SummaryItemPrice>
       </SummaryItem>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
          <TopButton onClick={Return}>CONTINUE SHOPPING</TopButton>
      </Wrapper>
      <Footer />
    </Container>
    </>
  );
};

export default Cart;
