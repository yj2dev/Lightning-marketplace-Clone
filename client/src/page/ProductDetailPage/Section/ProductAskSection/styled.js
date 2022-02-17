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
