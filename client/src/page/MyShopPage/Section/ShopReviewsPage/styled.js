import styled from "styled-components";

export const Container = styled.div`
  & h3 {
    font-weight: 400;
    padding: 0;
  }
  & hr {
    border: 1px solid #eeeeee;
    margin: 24px 0 24px 0;
  }
`;

export const InputContainer = styled.div`
  border: 2px solid #eeeeee;
  height: 148px;
  position: relative;
  & hr {
    padding: 0px;
    margin: 0px;
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
export const ReviewTextarea = styled.textarea`
  font-size: 13px;
  width: 940px;
  height: 50px;
  margin: 20px;
  resize: none;
  border: none;
  outline: none;
`;
export const ReviewSection = styled.div`
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
  & .content span {
    background-color: #fff3d3;
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
  & .create_review {
    color: #ab8a88;
    background-color: transparent;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    padding: 0px;
    margin-bottom: 20px;
    float: left;
  }
  & .delete_ask {
    border: none;
    border-left: 1px solid #eeeeee;
    padding: 0px 0px 0px 12px;
    float: left;
    color: #ab8a88;
    background-color: transparent;
    outline: none;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
`;
