import styled from "styled-components";
import { mencategories } from "../utils/data"
import { mobile } from "../responsive";
import MenCategory from "./MenCatergory"

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}
`;

const MenCategories = () => {
  return (
    <Container>
      {mencategories.map((item) => (
        <MenCategory item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default MenCategories;