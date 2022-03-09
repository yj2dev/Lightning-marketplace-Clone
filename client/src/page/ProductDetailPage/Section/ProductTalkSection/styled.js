import styled from "styled-components";

export const StoreProfile = styled.div`
  & img {
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 5px solid #ffffff;
    top: -45px;
    left: 50%;
    transform: translate(-50%);
  }
  & .name {
    margin: 40px 0 20px 0;
    font-size: 20px;
    font-weight: 800;
  }
`;

export const StoreTable = styled.table`
  width: 350px;
  color: #999999;
  font-size: 14px;
  & tr {
    border-top: 1px solid #e5e5e5;
  }
  & td:first-child {
    padding-right: 30px;
  }
  & td {
    text-align: left;
    white-space: nowrap;
  }
`;
export const TalkButton = styled.button`
  margin-top: 20px;
  background-color: #f9a827;
  display: flex;
  align-items: center;
  justify-content: center;
`;
