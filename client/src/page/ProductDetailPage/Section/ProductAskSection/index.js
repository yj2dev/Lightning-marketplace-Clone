import { InputContainer, AskTextarea } from "./styled";
import { BsPencil } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ProductAskSection = () => {
  const location = useLocation();
  const [ask, setAsk] = useState("");

  const onChangeAsk = (e) => {
    if (e.target.value.length > 100) return;
    setAsk(e.target.value);
  };

  function getProductId() {
    const path = location.pathname.split("/");
    return path[2] ? path[2] : null;
  }

  const onClickCreateAsk = () => {
    if (ask === "") return;

    const productId = getProductId();

    axios
      .post(`/product/${productId}/contact`, { content: ask })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickDeleteAsk = () => {
    const productId = getProductId();

    axios
      .delete(`/product/${productId}/contact`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickUpdateAsk = () => {
    if (ask === "") return;

    const productId = getProductId();

    axios
      .patch(`/product/${productId}/contact`, { content: ask })
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
      <button onClick={onClickCreateAsk}>
        <BsPencil /> 등록
      </button>
    </InputContainer>
  );
};

export default ProductAskSection;
