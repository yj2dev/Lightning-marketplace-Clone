import { InputContainer, AskTextarea } from "./styled";
import { BsPencil } from "react-icons/bs";

const ProductAskSection = () => {
  const onSubmit = () => {
    console.log("submit");

    // axios.post('문의 경로')
  };
  return (
    <InputContainer>
      <AskTextarea type="text" placeholder="상품문의 입력" />

      <hr />
      <span>0 / 100</span>
      <button onClick={onSubmit}>
        <BsPencil /> 등록
      </button>
    </InputContainer>
  );
};

export default ProductAskSection;
