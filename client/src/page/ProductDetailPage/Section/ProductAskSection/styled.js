import styled from "styled-components";

export const InputContainer = styled.div`
  border: 1px solid #eeeeee;
  border-width: 2px 0px 2px 2px;
  height: 155px;
  position: relative;
  & hr {
  }

  & span {
    font-size: 12px;
    color: #999999;
    margin-left: 20px;
    position: absolute;
    left: 0px;
    bottom: 16px;
  }
  & button {
    float: right;
    background-color: transparent;
    padding: 5px 18px;
    color: #999999;
    border: 1px solid #eeeeee;
    margin-right: 7px;
    position: absolute;
    right: 0px;
    bottom: 8px;
    cursor: pointer;
  }
`;
export const AskTextarea = styled.textarea`
  font-size: 13px;
  width: 630px;
  height: 50px;
  margin: 20px;
  resize: none;
  border: none;
  outline: none;
`;
export const AskSection = styled.div`
  margin: 24px 0;
  border-bottom: 2px solid #eeeeee;
  display: flex;
  position: relative;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 12px;
  }
  & .content {
    margin-bottom: 10px;
    font-size: 14px;
  }
  & .name {
    color: #ab8a88;
    margin-bottom: 10px;
  }
  & .time {
    position: absolute;
    color: #999999;
    font-size: 13px;
    top: 0;
    right: 12px;
  }
  & .create_ask {
    color: #ab8a88;
    background-color: transparent;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    padding: 0px;
    margin-bottom: 20px;
  }
`;
