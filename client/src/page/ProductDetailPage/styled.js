import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid black;
`;

export const ProductContainer = styled.div`
  border: 1px solid black;
  height: 500px;
`;
export const ProductImgs = styled.div`
  border: 1px solid black;
  width: 400px;

  & .test {
    width: 400vw;
  }
  & .img_wrapper {
    float: left;
    width: 400px;
    height: 400px;
    overflow: hidden;
    margin: 0 auto;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
