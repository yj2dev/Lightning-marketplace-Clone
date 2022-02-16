import styled from "styled-components";

export const SlideContainer = styled.div`
  width: 1020px;
  position: relative;
  height: 290px;
  overflow: hidden;
  margin-bottom: 16px;

  & .slidebox {
    display: flex;
  }
  & img {
    margin: auto;
    width: 100%;
    //transform: translateX(0);
    //width: 200px;
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
