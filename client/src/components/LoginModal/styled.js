import styled from "styled-components";

export const Container = styled.div``;

export const MarketIcon = styled.div`
  margin-top: 30px;
  border-radius: 10px;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: #d80c18;
  color: #ffffff;
`;

export const ModalContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-top: 0px;

  & h1 {
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 4px;
  }

  & h2 {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 30px;
  }

  & h3 {
    font-size: 12px;
    font-weight: 400;
    color: gray;
    position: absolute;
    bottom: 0px;
  }

  & button {
    width: 270px;
    height: 35px;
    margin: 5px;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 0px 5px #dadada;
    background-color: #ffffff;
  }

  & button:hover {
    cursor: pointer;
    color: #ffffff;
  }

  & hr {
    position: absolute;
    color: gray;
    bottom: 50px;
    width: 340px;
  }
`;
export const KakaoAuthButton = styled.button`
  &:hover {
    background-color: #fae100;
    color: #000000;
  }
`;
export const FacebookAuthButton = styled.button`
  &:hover {
    background-color: #3a5ca9;
  }
`;
export const NaverAuthButton = styled.button`
  &:hover {
    background-color: #1ec800;
  }
`;
export const OriginAuthButton = styled.button`
  &:hover {
    background-color: #9997a7;
  }
`;
