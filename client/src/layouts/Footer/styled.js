import styled from "styled-components";

export const Container = styled.div`
  margin-top: 32px;
`;
export const ItemSection = styled.div`
  color: #999999;
  font-weight: 400;
  font-size: 13px;
  border: 2px solid #eeeeee;
  border-width: 2px 0;
  padding: 16px 0;
  margin: 24px 0 24px 0;

  & hr {
    border: none;
    border-top: 2px solid #eeeeee;
  }
  & a {
    color: #999999;
  }
  & span:first-child {
    border: none;
    padding-left: 0px;
  }
  & span {
    display: inline-block;
    border-left: 1px solid #cccccc;
    padding: 0 32px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: #8b8d8b;
  font-size: 12px;
  padding: 24px 0;
  line-height: 24px;
  & div {
    height: 100%;
  }
`;
export const ContentTitle = styled.span`
  display: inline-block;
  margin: 4px 0;
  font-size: 14px;
  font-weight: 800;
  color: #666666;
`;
export const Content1 = styled.div`
  width: 450px;
`;
export const Content2 = styled.div`
  width: 270px;

  & .center_number {
    color: #666666;
    display: inline-block;
    font-size: 24px;
    font-weight: 800;
  }
`;
export const Content3 = styled.div`
  width: 295px;
  & #copyright {
    display: inline-block;
    margin: 8px 0;
  }
`;
