import styled from "styled-components";

export const Container = styled.div`
  border-bottom: 1px solid #eeeeee;
  padding: 0 48px 0 64px;

  & .left {
    float: left;
  }
  & .right {
    float: right;
  }

  & button {
    margin: 10px 0;
    color: #666666;
    font-size: 13px;
    border: none;
    background-color: transparent;
    position: relative;
  }

  & button:hover {
    cursor: pointer;
  }
`;
export const AppDownloadButton = styled.button`
  border: 1px solid black;
  position: relative;
  //padding-left: 0px;
`;

export const MarketIcon = styled.div`
  top: 3px;
  left: -16px;
  position: absolute;
  border-radius: 4px;
  display: inline-block;
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: #d80c18;
  color: #ffffff;
`;
