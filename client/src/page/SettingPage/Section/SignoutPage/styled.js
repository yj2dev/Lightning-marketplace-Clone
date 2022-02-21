import styled from "styled-components";

export const User = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & span {
    font-size: 32px;
    font-weight: 800;
  }
  & img {
    //border: 1px solid #eeeeee;
    border-right: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 16px;
  }
`;
