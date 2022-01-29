import styled from "styled-components";

export const Container = styled.div`
  & ul {
    height: 60px;
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 30px;
  }

  & li:hover {
    cursor: pointer;
  }

  & li:first-child {
    //padding: 0px 30px 0px 0px;
  }

  & li {
    border-right: 1px solid #eeeeee;
    font-size: 13px;
    float: left;
    padding: 0px 30px;
    margin: 20px 0;
  }

  & li:last-child {
    float: left;
    border: none;
  }

  & .bold_hr {
    height: 1px;
    background-color: #000000;
    margin-top: 28px;
  }

  & h1 {
    font-size: 24px;
    font-weight: 400;
  }

  & h1 span {
    font-size: 16px;
    color: red;
  }

  & h2 {
    margin: 0px;
    padding: 0px;
    font-size: 18px;
    font-weight: 400;
    //border: 1px solid black;
  }

  & h2 span {
    color: red;
  }

  & h2 .img_cnt {
    font-size: 14px;
    color: gray;
  }
`;

export const ImgUploadLabel = styled.label`
  color: #8a8a8a;
  border: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
  height: 200px;
`;

export const InputSection = styled.table`
  padding: 0;
  margin: 0;

  tr {
    border-bottom: 1px solid #d7d7d7;
  }

  td {
    padding: 32px 0;
  }

  td:first-child {
    width: 170px;
    text-align: left;
    vertical-align: top;
  }

  td:nth-child(2) {
    width: 846px;
  }

  .img_description {
    color: #4aa4ff;
    font-size: 14px;
  }

  input {
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 400;
    border: 1px solid #a4a4a4;
  }
`;
export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  color: orange;
`;

export const Title = styled.td`
  position: relative;
  input {
    width: 750px;
    margin-bottom: 12px;
  }

  .error {
    border: 1px solid orange;
  }
`;
export const ProductImgSection = styled.td`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;

  .title_image::before {
    content: "대표이미지";
    position: absolute;
    background-color: black;
    color: white;
    border-radius: 20px;
    padding: 2px 10px;
    font-size: 12px;
    //top: 40px;
    top: 10px;
    left: 10px;
    opacity: 0.4;
  }

  .img_wrapper {
    position: relative;
    width: 200px;
    height: 200px;
    overflow: hidden;
  }

  img {
    width: 200px;
    height: auto;
  }
`;
export const Category = styled.td`
  color: #000000;

  li {
    float: none;
    padding: 12px 24px;
    margin: 0;
  }

  li:last-child {
    float: none;
    padding: 12px 24px;
    margin: 0;
  }

  li:hover {
    background-color: #fdebeb;
  }

  .category_scroll {
    height: 250px;
    border: 1px solid red;
    overflow-y: scroll;
    //padding: 12px;
  }

  td {
    border: 1px solid #a4a4a4;
    height: 250px;
    padding: 0;
    margin: 0;
    //padding: 24px;
  }
  tr {
    padding: 0;
    margin: 0;
  }

  td:nth-child(1) {
    width: 250px;
  }

  td:nth-child(2) {
    width: 250px;
  }

  td:nth-child(3) {
    width: 250px;
  }
  .selected_category {
    color: red;
    margin-top: 16px;
  }
`;
export const TrandingArea = styled.td`
  color: blue;
`;
export const Status = styled.td`
  color: blue;
`;
export const Exchange = styled.td`
  color: blue;
`;
export const Price = styled.td`
  color: blue;
`;
export const ProductDescription = styled.td`
  color: blue;
`;
export const Tag = styled.td`
  color: blue;
`;
export const ProductQuantity = styled.td``;
