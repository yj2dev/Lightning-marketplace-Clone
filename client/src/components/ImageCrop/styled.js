import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const InputHidden = styled.input`
  display: none;
`;

export const InputLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #ff5058;
  color: #ffffff;
  font-weight: 800;

  &:hover {
    background-color: #ff3039;
  }
`;
