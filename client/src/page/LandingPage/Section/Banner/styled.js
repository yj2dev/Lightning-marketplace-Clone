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
`;

export const StaticContainer = styled.div`
  width: 1020px;
  height: 210px;
  overflow: hidden;
  & img {
    width: 100%;
  }
`;
