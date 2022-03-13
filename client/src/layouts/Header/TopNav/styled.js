import styled from "styled-components";

export const Container = styled.div`
  // 아래 z-index 수정 시 메뉴가 나타나지 않을 수 있음
  z-index: 12;
  border-bottom: 1px solid #eeeeee;
  padding: 0 10px 0 32px;
  position: relative;

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
`;

export const MyShopMenu = styled.div`
  background-color: #ffffff;
  position: absolute;
  border: 1px solid #eeeeee;
  right: 8px;

  & ul {
  }
  & li {
    text-align: center;
    padding: 6px 16px;
    font-size: 12px;
    color: #999999;
  }
  & li:hover {
    color: #000000;
    cursor: pointer;
  }
  & li:first-child {
    padding-top: 12px;
  }
  & li:last-child {
    padding-bottom: 12px;
  }
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

export const AlignCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
