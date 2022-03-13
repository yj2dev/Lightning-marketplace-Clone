import styled from "styled-components";

export const Container = styled.div``;
export const MessageWithoutResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 24px;
  font-size: 14px;

  & h3 {
    font-size: 32px;
    color: #ff5058;
    padding: 0px;
    margin: 16px 0;
  }
  & span {
    font-weight: 800;
    padding-bottom: 28px;
    border-bottom: 1px solid #eeeeee;
    width: 500px;
    text-align: center;
  }
`;
