import styled from "styled-components";

export const NullContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  flex-direction: column;

  & .icon {
    width: 50px;
    height: 50px;
    background-color: #e0464d;
    border-radius: 50%;
    position: relative;
    margin-bottom: 16px;
  }

  & .content span {
    background-color: #ffcccf;
    color: #000000;
    padding: 2px 10px;
  }
`;
export const Container = styled.div`
  width: 100%;
  position: relative;
  & .title {
    font-size: 20px;
    text-align: center;
    padding: 12px 0;
    background-color: #ffffff;
    cursor: pointer;
  }

  & .sub_title {
    background-color: #ffffff;
    border-bottom: 2px solid #ff5058;
    height: 70px;
    cursor: pointer;

    & img {
      width: 40px;
      height: 40px;
      float: left;
      margin: 16px 8px 0 8px;
    }
    & .price {
      padding-top: 14px;
      float: left;
      font-size: 15px;
      font-weight: 400;
    }
    & span {
      font-size: 13px;
      font-weight: 400;
    }
    & .product_title {
      font-size: 13px;
      color: #999999;
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 16px;
      white-space: nowrap;
      width: 400px;
    }
  }
`;

export const TalkRoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  height: 530px;
  overflow: scroll;
  overflow-x: hidden;

  & .profile_img {
    float: left;
    & img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 12px;
    }
  }
  & .receiver {
    margin: 4px 0;
    border: none;
    background-color: #ffffff;
    color: #5e5e5e;
    padding: 4px 12px;
    border-radius: 0px 14px 14px 14px;
    float: left;
    max-width: 350px;
    position: relative;

    & .time {
      font-size: 8px;
      position: absolute;
      bottom: 0;
      right: -32px;
    }
  }

  & .sender {
    margin: 4px 0;
    max-width: 350px;
    border: none;
    background-color: #e0464d;
    color: #ffffff;
    padding: 4px 12px;
    border-radius: 14px 0 14px 14px;
    float: right;
    position: relative;
    & .time {
      color: #5e5e5e;
      font-size: 8px;
      position: absolute;
      bottom: 0;
      left: -32px;
    }
  }
`;
export const TalkForm = styled.form`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 54px;
  background-color: #ffffff;
  & input {
    background-color: #f4f4fa;
    border: none;
    border-radius: 20px;
    margin: 5px 10px;
    padding: 12px 80px 12px 12px;
    position: relative;
    width: 400px;
  }
  & button[type="submit"] {
    cursor: pointer;
    width: 56px;
    height: 30px;
    position: absolute;
    top: 11px;
    right: 16px;
    background-color: #e0464d;
    color: #ffffff;
    border: none;
    border-radius: 20px;
  }
`;
