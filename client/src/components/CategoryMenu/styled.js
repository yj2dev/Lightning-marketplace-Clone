import styled from "styled-components";

//Select Color: #f64448

export const Container = styled.div`
  border: none;
  position: relative;
  & .product_category {
    font-size: 14px;
    width: 190px;
  }
`;

export const SideMenu = styled.div`
  position: absolute;
  font-size: 28px;
  color: #212121;
  bottom: 10px;
  left: 0px;
  //margin: 10px;

  &:hover {
    color: #d80c18;
  }

  &:hover .product_category {
    display: inline;
  }
`;

export const Content1 = styled.div`
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  z-index: 10;
  position: absolute;
  top: 148px;
  & li {
    padding: 4px 20px;
  }
  & li:first-child {
    padding: 10px 20px;
    border-bottom: 1px solid #eeeeee;
    font-weight: bold;
  }
  & li:first-child:hover {
    background-color: #ffffff;
    color: #000000;
  }
  & li:nth-child(2) {
    margin-top: 16px;
  }
  & li:last-child {
    margin-bottom: 16px;
  }

  & li:hover {
    background-color: #f64448;
    color: #ffffff;
  }
`;
export const Content2 = styled.div`
  border: 1px solid black; ;
`;
export const Content3 = styled.div`
  border: 1px solid black; ;
`;
