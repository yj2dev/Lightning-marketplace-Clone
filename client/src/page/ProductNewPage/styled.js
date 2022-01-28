import styled from "styled-components";

export const Container = styled.div`
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

  & .bold_hr {
    margin: 30px 0;
    border-bottom: 1px solid black;
  }

  & hr {
  }

  & h1 {
    font-size: 24px;
    font-weight: 400;
  }

  & h1 span {
    font-size: 16px;
    color: red;
  }

  & h2 {
    font-size: 18px;
    font-weight: 400;
  }

  & h2 span {
    color: red;
  }

  & h2 .img_cnt {
    font-size: 14px;
    color: gray;
  }
`;
