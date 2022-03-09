import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const ModalContainer = styled.div`
  position: absolute;
  display: inline-block;
  color: #000;
  border-radius: 4px;
  background-color: #fbfbfb;
  box-shadow: 0px 0px 5px 1px #a1a6ab;
  padding: 16px;
  min-width: 260px;
  max-width: 400px;
`;

export const CloseButton = styled.div`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  top: 4px;
  right: 4px;
  padding: 0 8px;
  color: #9b9c9c;
  height: 32px;
  overflow: hidden;
`;

export const TitleContainer = styled.div`
  font-size: 20px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 16px;
`;

export const ContentContainer = styled.div`
  font-size: 16px;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  & button {
    border: none;
    border-radius: 4px;
    //width: 120px;
    width: 100%;
    height: 50px;
    font-size: 16px;
    cursor: pointer;
  }
`;

export const SubmitButton = styled.button`
  background-color: #ff5058;
  color: #ffffff;
  font-weight: 800;

  &:hover {
    background-color: #ff3039;
  }
`;

export const CancelButton = styled.button`
  background-color: #f4f4fa;
  color: #72707f;

  &:hover {
    background-color: #eeeeee;
    color: #000000;
  }
`;
