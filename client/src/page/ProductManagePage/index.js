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
        <li onClick={() => history.push("/product/manage")}>상품관리</li>
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
                <td>null</td>
                <td>{product.title}</td>
                <td>{intOfKr(product.price)}원</td>
                <td>null</td>
                <td>{timeFormat(product.updatedAt)}</td>
              </tr>
            ))}
        </tbody>
      </ProductTable>
    </Container>
  );
};

export default withRouter(ProductManagePage);
