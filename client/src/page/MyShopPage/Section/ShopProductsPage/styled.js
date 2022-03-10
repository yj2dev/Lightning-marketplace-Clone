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

export const ProductSection = styled.div`
  width: 1020px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

export const Product = styled.div`
  height: 270px;
  width: 190px;
  border: 1px solid #eeeeee;

  & .img_wrapper {
    width: 190px;
    height: 190px;
    overflow: hidden;
    margin: 0 auto;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProductContents = styled.div`
  position: relative;
  margin: 6px;
  color: #000000;
  & .title {
    overflow: hidden;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 12px;
  }
  & .price {
    float: left;
    font-size: 15px;
    font-weight: 800;
    width: 102px;
  }
  & .time {
    color: #8c8a88;
    float: right;
    font-size: 12px;
    font-weight: 400;
    width: 70px;
    text-align: right;
  }
`;
