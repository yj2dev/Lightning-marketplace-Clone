import styled from "styled-components";

export const Container = styled.div`
  //border: 1px solid black;
`;

export const ProductContainer = styled.div`
  border-top: 1px solid black;
  padding: 32px 0 0 0;
  height: 500px;
`;
export const ProductImgs = styled.div`
  border: 1px solid #eeeeee;
  width: 400px;
  height: 400px;
  position: relative;
  overflow: hidden;

  & button {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    margin: 0 16px;
    border: none;
    width: 44px;
    height: 44px;
    color: #ffffff;
    cursor: pointer;
  }

  & .prev-btn {
    position: absolute;
    top: 50%;
    left: 0px;
  }

  & .prev-btn::before {
    content: "";
    width: 15px;
    height: 15px;
    position: absolute;
    top: 13px;
    left: 15px;
    border: 1px solid #ffffff;
    border-width: 3px 3px 0 0;
    transform: rotate(225deg);
  }

  & .next-btn {
    position: absolute;
    top: 50%;
    right: 0px;
  }

  & .next-btn::before {
    content: "";
    width: 15px;
    height: 15px;
    position: absolute;
    top: 13px;
    right: 15px;
    border: 1px solid #ffffff;
    border-width: 3px 3px 0 0;
    transform: rotate(45deg);
  }

  & .slidebox {
    display: flex;
  }

  & img {
    width: 100%;
  }
`;

export const ProductInfo = styled.div`
  position: relative;
  border: 3px solid green;
  width: 400px;

  & td:first-child {
    width: 80px;
    //padding-right: 20px;
    border: 1px solid red;
  }
`;
