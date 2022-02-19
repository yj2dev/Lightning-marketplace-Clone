import styled from "styled-components";

export const Container = styled.div`
  //width: 1020px;
  & ul {
    height: 60px;
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 30px;
  }

  & li:hover {
    cursor: pointer;
  }

  & li:first-child {
    //padding: 0px 30px 0px 0px;
  }

  & li {
    border-right: 1px solid #eeeeee;
    font-size: 13px;
    float: left;
    padding: 0px 30px;
    margin: 20px 0;
  }

  & li:last-child {
    float: left;
    border: none;
  }
`;

export const ProductTable = styled.table`
  border: 1px solid orange;
  width: 100%;

  & tr,
  td {
    border: 1px solid orange;
  }
`;
