import styled from "styled-components";

export const Container = styled.div`
  margin: 30px 0 50px 0;
`;
export const UserStore = styled.div`
  border: 1px solid black;
  margin-bottom: 30px;

  & .imgWrapper {
    border: 1px solid black;
    width: 305px;
    height: 305px;
  }
`;
export const TabMenu = styled.div`
  //border: 1px solid black;
  width: 1020px;

  & ul {
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  & li {
    display: flex;
    font-size: 14px;
    color: #999999;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 100%;
    height: 100%;
    border: 1px solid #eeeeee;
    border-bottom: 1px solid black;
  }
  & .active {
    color: #000000;
    font-weight: 800;
    border: 1px solid black;
    border-width: 1px 1px 0 1px;
    border-bottom: 1px solid #ffffff;
  }
`;
export const TabContent = styled.div`
  //border: 1px solid black;
`;
