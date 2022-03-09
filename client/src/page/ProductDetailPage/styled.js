import styled from "styled-components";

export const Container = styled.div`
  width: 1020px;
`;

export const ProductContainer = styled.div`
  border: none;
  border-top: 2px solid black;
  padding: 32px 0 0 0;
  height: 500px;
  display: flex;
  flex-wrap: nowrap;
`;
export const ProductImgs = styled.div`
  border: 2px solid #eeeeee;
  width: 400px;
  height: 400px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;

  & img {
    width: 100%;
    object-fit: cover;
  }

  & button {
    background-color: rgba(0, 0, 0, 0.1);
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

  & .next-btn::after {
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
`;

export const ProductContent = styled.div`
  position: relative;
  margin-left: 36px;
  width: 578px;
  height: 400px;
  color: #cccccc;
  & h3 {
    color: #000000;
    font-size: 24px;
    margin: 0px;
    padding: 0px;
  }
  & .price {
    color: #000000;
    font-size: 36px;
    font-weight: 800;
  }
  & hr {
    //border: none;
    border: 1px solid #eeeeee;
    background-color: #eeeeee;
  }
  & .icons {
    display: flex;
    align-items: center;
    margin: 16px 0;
  }
  & .icons span {
    margin: 0 16px 0 4px;
  }
  & .price span {
    font-size: 26px;
    font-weight: 400;
  }
  & .product_table {
    color: #999999;
    font-size: 14px;
  }
  & td:first-child {
    width: 80px;
    //padding-right: 20px;
    padding: 10px 0;
  }
  & td:nth-child(2) {
    color: #000000;
  }
  & .product_btn {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }
  & .product_btn button {
    //width: 185px;
    width: 100%;
    height: 58px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    color: #ffffff;
    font-size: 20px;
    font-weight: 800;
    cursor: pointer;
  }
`;
export const ProductDescriptionContainer = styled.div`
  width: 1020px;
  position: relative;
  font-size: 14px;
`;

export const ProductInfoContainer = styled.div`
  position: relative;
  width: 1020px;

  & ul {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  & li {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    width: 100%;
    height: 100%;
    font-weight: 800;
    border: 1px solid #eeeeee;
    border-width: 2px 1px 1px 1px;
    border-bottom: 1px solid black;
    color: #999999;
    cursor: pointer;
  }
  & .active {
    color: #000000;
    border: 1px solid black;
    border-width: 1px 1px 0 1px;
    border-bottom: 1px solid #ffffff;
  }
`;
export const ProductInfoContent = styled.div`
  border-right: 2px solid #eeeeee;
  width: 679px;

  & h3 {
    margin: 0px;
    padding: 50px 0 10px 0;
  }

  & hr {
    border: none;
    border-bottom: 2px solid #eeeeee;
    margin-bottom: 32px;
  }
`;
