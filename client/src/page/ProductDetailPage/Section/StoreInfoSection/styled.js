import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 88px;
  right: 10px;
  height: 300px;
  width: 300px;
  //border: 1px solid black;
  font-size: 13px;

  & img {
    margin: 0px 16px 0 16px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    float: left;
  }

  & span {
    color: #999999;
    display: block;
    margin-top: 4px;
  }

  & hr {
    border: none;
    border-bottom: 2px solid #eeeeee;
    margin-bottom: 32px;
  }
`;
