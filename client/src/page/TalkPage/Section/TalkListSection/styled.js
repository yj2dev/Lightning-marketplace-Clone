import styled from "styled-components";

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 680px;
`;
export const Container = styled.div`
  border-right: 1px solid #dddddd;
  width: 100%;

  & .title {
    font-size: 20px;
    text-align: center;
    padding: 12px 0;
    background-color: #ffffff;
  }
`;

export const TalkListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f4f4fa;
  & a {
    color: #000000;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  & li:hover {
    background-color: #fafafd;
    cursor: pointer;
  }

  & li {
    position: relative;
    background-color: #ffffff;
    width: 100%;
    padding: 18px 0;

    & img {
      margin: 0 16px;
      width: 55px;
      height: 55px;
      border-radius: 50%;
      float: left;
    }

    & .name {
      float: left;
      font-size: 16px;
    }

    & .last_message {
      font-size: 15px;
      width: 350px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #646464;
    }

    & .date {
      font-size: 13px;
      color: #999999;
      position: absolute;
      top: 12px;
      right: 16px;
    }
  }
`;
