import styled from "styled-components";

export const Container = styled.div`
  & h3 {
    font-weight: 400;
    padding: 0;
  }
  & hr {
    border: 1px solid #eeeeee;
    margin: 24px 0 24px 0;
  }
`;
export const UserContainer = styled.div`
  width: 1020px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;
export const User = styled.button`
  border: 2px solid #ffffff;
  padding: 25px;
  transition: 0.2s;
  & img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  & .name {
    font-size: 24px;
    margin-bottom: 16px;
  }

  &:hover {
    border: 2px solid black;
  }
`;
