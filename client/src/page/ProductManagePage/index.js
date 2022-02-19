import { Container, ProductTable } from "./styled";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { timeFormat } from "../../utils/Time";
import { intOfKr } from "../../utils/Currency";

export const ProductManagePage = ({ history }) => {
  const [products, setProducts] = useState();

  useEffect(() => {
    axios
      .get("/user/detail")
      .then((res) => {
        console.log("res >> ", res);
        console.log("data >> ", res.data.data.products);
        setProducts(res.data.data.products);
      })
      .catch((err) => {
        console.log("err >> ", err);
      });
  }, []);

  return (
    <Container>
      <ul>
        <li onClick={() => history.push("/product/new")}>상품등록</li>
        <li
          onClick={() => history.push("/product/manage")}
          className="active_menu"
        >
          상품관리
        </li>
        {/*<li>구매/판매 내역</li>*/}
      </ul>

      <ProductTable>
        <thead>
          <tr>
            <th>사진</th>
            <th>판매상태</th>
            <th>상품명</th>
            <th>가격</th>
            <th>찜/댓글</th>
            <th>최근수정일</th>
          </tr>
        </thead>

        <tbody>
          {products &&
            products.map((product) => (
              <tr>
                <td>
                  <img width="200px" src={product.thumbnailImgURL} />
                </td>
                <td>
                  <select name="sell_state" id="">
                    <option value="selling">판매중</option>
                    <option value="reserving">예약중</option>
                    <option value="soldout">판매완료</option>
                    <option value="delete">삭제</option>
                  </select>
                </td>
                <td>{product.title}</td>
                <td>{intOfKr(product.price)}원</td>
                <td>
                  {0}/{0}
                </td>
                <td>{timeFormat(product.updatedAt)}</td>
              </tr>
            ))}
        </tbody>
      </ProductTable>
    </Container>
  );
};

export default withRouter(ProductManagePage);
