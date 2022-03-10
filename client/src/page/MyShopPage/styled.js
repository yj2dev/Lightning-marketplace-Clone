import styled from "styled-components";

export const Container = styled.div`
  margin: 30px 0 50px 0;
`;
export const UserStore = styled.div`
  border: 1px solid #eeeeee;
  margin-bottom: 30px;
  display: flex;

  & .imgWrapper {
    width: 305px;
    height: 305px;
    position: relative;
  }

  & .edit_profile_img {
    cursor: pointer;
    position: absolute;
    top: 48%;
    left: 50%;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 1px #000000;
    padding: 4px 8px;
    font-size: 12px;
    color: #000000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .background_img {
    //-webkit-filter: blur(1px);
    filter: blur(10px);
    width: 305px;
    height: 305px;
  }
  & .background_img_wrapper {
    width: 305px;
    height: 305px;
    overflow: hidden;
  }

  & .background_img_cover {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #000000;
    opacity: 0.5;
  }

  & .profile_img {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 110px;
    height: 110px;
    border-radius: 50%;
  }

  & .store_name {
    position: absolute;
    top: 62%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
  }

  & .store_management {
    position: absolute;
    top: 82%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-size: 13px;
    border: 1px solid #ffffff;
    padding: 10px 16px;
    cursor: pointer;
  }
  & .store_follow {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 82%;
    left: 31%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-size: 14px;
    border: 1px solid #ffffff;
    cursor: pointer;
    width: 100px;
    height: 40px;
  }
  & .store_talk {
    border: 1px solid #ffffff;
    width: 100px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 82%;
    left: 69%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-size: 14px;
    cursor: pointer;
  }
  & .active_follow {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
export const EditProfileMenu = styled.div`
  position: absolute;
  top: -128px;
  left: -152px;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px 1px #000000;
  border-radius: 5px;
  font-size: 12px;
  color: #000000;
  padding: 4px 0;

  & li {
    padding: 4px 12px;
  }

  & li:hover {
    background-color: #0969da;
    color: #ffffff;
    cursor: pointer;
  }
`;

export const UserStoreContents = styled.div`
  width: 100%;
  padding: 24px 30px;
  color: #000000;
  position: relative;

  & .contents_store_name {
    color: #000000;
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 32px;
  }
  & .contents_store_name input {
    width: 210px;
    padding: 4px 8px;
    border: 1px solid #eeeeee;
    font-size: 14px;
  }
  button {
    font-size: 11px;
    color: #999999;
    border: 1px solid #eeeeee;
    background-color: #ffffff;
    cursor: pointer;
  }
  & .contents_store_name .store_name_submit_btn {
    font-size: 14px;
    padding: 4px 12px;
    border: 1px solid #eeeeee;
    border-width: 1px 1px 1px 0;
  }
  & .badge {
    margin-bottom: 24px;
    font-size: 13px;
    display: flex;
    align-items: center;
    color: #999999;
  }
  & .badge .icon {
    color: #f6995b;
    font-size: 18px;
  }
  & .badge span {
    color: #000000;
  }
  & .contents_store_desc {
    width: 650px;
    height: 120px;
    position: relative;
    font-size: 14px;
    overflow: scroll;
  }
  & .contents_store_desc textarea {
    resize: none;
    width: 540px;
    float: left;
    border: 1px solid #eeeeee;
    outline: none;
    height: 114px;
  }
  & .contents_store_desc .store_desc_submit_btn {
    height: 100%;
    border: 1px solid #eeeeee;
    border-width: 1px 1px 1px 0;
    font-size: 15px;
    float: left;
    display: inline-block;
    width: 100px;
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
  margin-top: 64px;

  & h3 {
    font-weight: 400;
    padding: 0;
  }
  & hr {
    border: 1px solid #eeeeee;
    margin: 24px 0 24px 0;
  }
`;
