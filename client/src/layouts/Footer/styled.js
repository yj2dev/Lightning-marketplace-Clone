import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid black;
  //border-top: 1px solid black;
  height: 200px;

  & a {
    color: #ffffff;
    background-color: red;
    padding: 16px;
    display: flex;
    justify-content: center;
  }
`;
