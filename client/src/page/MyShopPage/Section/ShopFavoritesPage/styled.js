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
export const FavoritesContainer = styled.div`
  width: 1020px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
export const Favorites = styled.div`
  display: flex;
  width: 496px;
  height: 140px;
  border: 1px solid #dcdcdc;
  color: #000000;
  & hr {
    width: 100%;
    padding: 0px;
    margin: 0px;
    color: #dcdcdc;
  }
  & .img_wrapper {
    height: 140px;
  }

  & img {
    width: 140px;
    height: 140px;
  }

  & .content_wrapper {
    width: 350px;
    height: 140px;
  }

  & .content {
    padding: 16px;
  }

  & .content_title {
    overflow: hidden;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 4px;
  }

  & .content_price {
    margin-bottom: 6px;
    font-weight: 800;
    font-size: 15px;
  }

  & .content_time {
    margin-bottom: 4px;
    font-size: 12px;
    color: #6c6c6c;
  }

  & .content_address {
    padding: 8px 16px;
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #6c6c6c;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
