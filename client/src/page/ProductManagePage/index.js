import { Container, ProductTable } from "./styled";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { timeFormat } from "../../utils/Time";
import { intOfKr } from "../../utils/Currency";
import { logDOM } from "@testing-library/react";

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

  function deleteProduct(productId, state) {
    // if (confirm("해당 상품을 정말 삭제하시겠습니까?")) {
    //   console.log("Yes");
    // } else {
    //   console.log("noooo..");
    // }
    console.log("삭제 시도");

    axios
      .delete(`/product?productId=${productId}&state=${state}`)
      .then((res) => {
        console.log("res >> ", res);
        history.push("/product/new");
        history.push("/product/manage");
        alert("상품이 제거되었습니다.");
      })
      .catch((err) => {
        console.log("err >> ", err);
      });
  }

  // 판매상태 변경시 서버에 변경 요청
  const onChangeSellState = (e) => {
    const [productId, state] = e.target.value.split("/");

    console.log(productId, state);

    if (state === "delete") {
      deleteProduct(productId, state);
      return;
    }

    axios
      .patch("/product/state", { productId, state })
      .then((res) => {
        console.log("res >> ", res);
        alert("판매상태가 변경되었습니다.");
      })
      .catch((err) => {
        console.log("err >> ", err);
      });
  };

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
              <tr key={product._id}>
                <td>
                  <img width="200px" src={product.thumbnailImgURL} />
                </td>
                <td>
                  {product.state}
                  <select name="sell_state" onChange={onChangeSellState}>
                    <option
                      value={`${product._id}/selling`}
                      selected={product.state === "selling" ? true : false}
                    >
                      판매중
                    </option>
                    <option
                      value={`${product._id}/reserving`}
                      selected={product.state === "reserving" ? true : false}
                    >
                      예약중
                    </option>
                    <option
                      value={`${product._id}/soldout`}
                      selected={product.state === "soldout" ? true : false}
                    >
                      판매완료
                    </option>
                    <option
                      value={`${product._id}/delete`}
                      selected={product.state === "delete" ? true : false}
                    >
                      삭제
                    </option>
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
