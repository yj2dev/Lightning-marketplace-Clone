import styled from "styled-components";

export const Container = styled.div`
  & .active {
    left: 0;
  }
`;

export const Timer = styled.div`
  color: #d80c18;
  position: absolute;
  font-size: 14px;
  font-weight: bold;
  right: 10px;
  top: 10px;
`;

export const ResendMessage = styled.div`
  background-color: #3f4146;
  color: #ffffff;
  font-size: 16px;
  position: absolute;
  bottom: 0px;
  left: -4096px;
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s ease-in-out;
`;
