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
export const ProductImgSection = styled.div`
  padding: 12px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;

  .product_image_index {
    position: absolute;
    top: 8px;
    right: 8px;
    background-color: black;
    border: none;
    color: #ffffff;
    border-radius: 25px;
    font-size: 10px;
    width: 22px;
    height: 22px;
    opacity: 0.4;
  }

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

  .active {
    color: red;
    font-weight: 800;
  }

  li:first-child {
    float: none;
    margin-top: 5px;
  }

  li {
    float: none;
    padding: 10px 20px;
    margin: 0;
    font-size: 16px;
  }

  li:last-child {
    float: none;
    margin-bottom: 5px;
  }

  li:hover {
    background-color: #fdebeb;
  }

  .category_scroll {
    height: 250px;
    //border: 1px solid red;
    overflow-y: scroll;
    //padding: 12px;
  }

  td {
    border: 1px solid #c4c4c4;
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
  button {
    font-size: 16px;
    width: 110px;
    height: 50px;
    padding: 0;
    margin: 0 16px 16px 0;
    background-color: #ffffff;
    border: 1px solid #c4c4c4;
    border-radius: 2px;
  }

  input {
    font-size: 16px;
    width: 810px;
    border: 1px solid #c4c4c4;
    background-color: #f4f4fa;
  }
`;

export const Status = styled.td`
  //color: blue;
  font-size: 16px;
  input[type="radio"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 100%;
    border: 3px solid #c3c2cc;
    margin: 0px;
    padding: 0px;
    background-color: white;
    position: relative;
  }

  input[type="radio"]:hover::before {
    content: "";
    width: 30px;
    height: 30px;
    background-color: black;
    position: absolute;
    border-radius: 100%;
    opacity: 0.1;
    top: -8px;
    left: -8px;
  }

  input[type="radio"]:checked {
    border: 3px solid #ff5058;
  }

  input[type="radio"]:checked::after {
    background-color: #ff5058;
    border-radius: 100%;
    top: 2px;
    left: 2px;
    position: absolute;
    content: "";
    width: 10px;
    height: 10px;
  }

  label {
    margin: 0px 40px 0 6px;
  }

  display: flex;
  align-items: center;
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
