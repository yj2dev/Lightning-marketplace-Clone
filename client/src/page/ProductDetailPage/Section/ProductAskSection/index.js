import { InputContainer, AskTextarea } from "./styled";
import { BsPencil } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";

const ProductAskSection = () => {
  const [ask, setAsk] = useState("");

  const onChangeAsk = (e) => {
    if (e.target.value.length > 100) return;
    setAsk(e.target.value);
  };

  const onSubmit = () => {
    if (ask === "") return;

    axios
      .post("문의 경로")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <InputContainer>
      <AskTextarea
        value={ask}
        onChange={onChangeAsk}
        type="text"
        placeholder="상품문의 입력"
      />

      <hr />
      <span>{ask.length} / 100</span>
      <button onClick={onSubmit}>
        <BsPencil /> 등록
      </button>
    </InputContainer>
  );
};

export default ProductAskSection;
