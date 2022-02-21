import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid black;
`;
export const SettingTabMenu = styled.div`
  color: #000000;
  & .active {
    color: red;
    font-weight: 800;
  }
  & ul {
    height: 60px;
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 30px;
  }
  & li {
    float: left;
    margin: 20px 0;
    padding: 0px 30px;
    font-size: 13px;
    border-right: 1px solid #eeeeee;
    cursor: pointer;
  }
  & li:last-child {
    border: none;
  }
`;
