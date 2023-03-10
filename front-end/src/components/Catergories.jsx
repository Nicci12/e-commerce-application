import styled from "styled-components";
import { categories } from "../utils/data"
import { mobile } from "../responsive";
import WomanCategory from "./WomanCatergory"

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <WomanCategory item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;