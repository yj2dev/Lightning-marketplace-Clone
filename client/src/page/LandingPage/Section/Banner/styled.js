import styled from "styled-components";

export const SlideContainer = styled.div`
  width: 1020px;
  position: relative;
  height: 290px;
  margin-bottom: 16px;
  overflow: hidden;

  & .slidebox {
    display: flex;
  }

  & img {
    width: 100%;
  }

  & button {
    background-color: transparent;
    margin: 0 16px;
    border: none;
    width: 44px;
    height: 44px;
    color: #ffffff;
    cursor: pointer;
    opacity: 0.5;
  }

  & .prev-btn {
    position: absolute;
    top: 120px;
    left: 0px;
  }

  & .prev-btn::before {
    content: "";
    width: 15px;
    height: 15px;
    position: absolute;
    top: 13px;
    left: 15px;
    border: 1px solid #ffffff;
    border-width: 3px 3px 0 0;
    transform: rotate(225deg);
  }

  & .next-btn {
    position: absolute;
    top: 120px;
    right: 0px;
  }

  & .next-btn::before {
    content: "";
    width: 15px;
    height: 15px;
    position: absolute;
    top: 13px;
    right: 15px;
    border: 1px solid #ffffff;
    border-width: 3px 3px 0 0;
    transform: rotate(45deg);
  }
`;

export const StaticContainer = styled.div`
  width: 1020px;
  height: 210px;
  overflow: hidden;
  & img {
    width: 100%;
  }
`;
