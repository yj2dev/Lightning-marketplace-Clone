import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const SettingCommonSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 32px 0;

  & label {
    font-size: 16px;
    font-weight: 800;
    margin-bottom: 8px;
  }
  & input {
    width: 365px;
    border-radius: 4px;
    padding: 10px 16px;
    font-size: 16px;
    font-weight: 400;
    border: 1px solid #a4a4a4;
    margin-bottom: 16px;
  }
  & button {
    width: 400px;
    margin-top: 16px;
    font-size: 16px;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    height: 50px;
    background-color: #ff5058;
  }
  & button:hover {
    cursor: pointer;
    background-color: #ff3039;
  }
  & .input_wrapper {
    position: relative;
  }
  & .toggle_hidden_and_show {
    cursor: pointer;
    font-size: 28px;
    color: #999999;
    position: absolute;
    top: 5px;
    right: 10px;
  }
`;
