import styled from "styled-components";

export const AddFavoriteAlert = styled.div`
  color: #000000;
  border: 1px solid black;
  position: absolute;
  top: 50px;
  font-size: 16px;
  background-color: #ffffff;
  width: 180px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  & span {
    color: red;
    margin-left: 4px;
  }

  & ::before {
    content: "";
    width: 10px;
    height: 10px;
    border: 1px solid black;
    border-width: 1px 1px 0 0;
    position: absolute;
    top: -6px;
    left: 48%;
    background-color: #ffffff;
    transform: rotate(-45deg);
  }
`;
