import styled from "styled-components";

export const Container = styled.div`
  position: sticky;
  top: 0px;
  height: 148px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #eeeeee;
  background-color: #ffffff;
  z-index: 1000;
`;
export const Content = styled.div`
  position: relative;
  width: 1020px;
  display: flex;
  flex-direction: row;
  //border: 1px solid black;
`;
export const Title = styled.div`
  position: absolute;
  top: 36px;
  left: 0px;
  font-size: 34px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #d80c18;
  margin: 0 0 0 28px;
`;
export const SearchInput = styled.input`
  position: absolute;
  top: 36px;
  left: 230px;
  width: 385px;
  height: 36px;
  font-size: 14px;
  border: 2px solid #d80c18;
  padding: 0 54px 0 16px;
  color: #787878;
`;
export const Sell = styled.div`
  & span {
    font-size: 24px;
    position: absolute;
    top: -4px;
    right: 54px;
  }

  font-size: 14px;
  color: #333333;
  position: absolute;
  top: 40px;
  right: 190px;

  &::before {
    content: "|";
    position: absolute;
    top: 2px;
    right: -16px;
    font-size: 2px;
    color: #ababab;
  }
`;
export const MyShop = styled.div`
  & span {
    font-size: 20px;
    position: absolute;
    top: -3px;
    right: 44px;
  }
  font-size: 14px;
  color: #333333;
  position: absolute;
  top: 40px;
  right: 94px;

  &::before {
    content: "|";
    position: absolute;
    top: 2px;
    right: -16px;
    font-size: 2px;
    color: #ababab;
  }
`;
export const LighteningTalk = styled.div`
  & span {
    font-size: 24px;
    position: absolute;
    top: -5px;
    right: 44px;
  }
  font-size: 14px;
  color: #333333;
  position: absolute;
  top: 40px;
  right: 0px;
`;

export const SellerCenter = styled.div`
  position: absolute;
  font-size: 14px;
  font-weight: bold;
  color: #212121;
  bottom: 22px;
  left: 55px;

  &:hover {
    cursor: pointer;
  }
`;
