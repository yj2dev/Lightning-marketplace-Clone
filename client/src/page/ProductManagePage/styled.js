import styled from "styled-components";

export const Container = styled.div`
  & .active_menu {
    color: red;
    font-weight: 800;
  }
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
`;

export const ProductTable = styled.table`
  //border: 1px solid orange;
  width: 100%;

  & thead tr th {
    border: 1px solid black;
    border-width: 1px 0;
    height: 36px;
    font-size: 16px;
  }

  & thead tr th:nth-child(1) {
    width: 150px;
  }

  & thead tr th:nth-child(2) {
    width: 120px;
  }

  & thead tr th:nth-child(3) {
    width: 300px;
  }

  & thead tr th:nth-child(4) {
    width: 100px;
  }

  & thead tr th:nth-child(5) {
    width: 50px;
  }

  & thead tr th:nth-child(6) {
    width: 100px;
  }

  & tbody td {
    text-align: center;
    border-bottom: 1px solid #bbbbbb;
  }

  & tbody tr td:nth-child(2) select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    font-size: 16px;
    padding: 8px 30px 8px 12px;
    width: 110px;
    border-radius: 4px;
    background: url("/img/arrow.png") no-repeat 95% 50%;
  }

  & tbody tr td:nth-child(2) option {
    padding: 12px;
  }

  //& tbody tr td:nth-child(2) select::-ms-expand {
  //  display: none;
  //}
  & tbody tr td:nth-child(3) {
    color: #0074e8;
  }

  & td:nth-child(1) img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    padding: 8px;
  }
`;
