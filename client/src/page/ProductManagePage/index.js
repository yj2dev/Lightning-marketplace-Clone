import { Container, ProductTable } from "./styled";
import React, { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { timeFormat, timeKrFormat } from "../../utils/Time";
import { intOfKr } from "../../utils/Currency";
import AlertModal from "../../components/AlertModal";
import { logDOM } from "@testing-library/react";

export const ProductManagePage = ({ history }) => {
  const [products, setProducts] = useState();

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetProduct, setTargetProduct] = useState({
    productId: null,
    state: null,
  });

  const onCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const onCloseAlertModal = () => {
    setShowAlertModal(false);
  };

  // 알림 모달창 띄우는 함수
  const onShowAlertModal = (message) => {
    setAlertMessage(message);
    setShowAlertModal(true);
  };

  function getMyProducts() {
    axios
      .get("/user/detail")
      .then((res) => {
        console.log("res >> ", res);
        console.log("data >> ", res.data.data.products);
        setProducts(res.data.data.products);
        history.push("/product/manage");
      })
      .catch((err) => {
        console.log("err >> ", err);
      });
  }

  useEffect(() => {
    // 내 상품목록 전체 가져오기
    getMyProducts();
  }, []);

  function deleteProduct() {
    axios
      .delete(
        `/product?productId=${targetProduct.productId}&state=${targetProduct.state}`
      )
      .then((res) => {
        console.log("res >> ", res);
        history.push("/product/new");
        history.push("/product/manage");
        onCloseDeleteModal();
        onShowAlertModal("상품이 삭제되었습니다.");
      })
      .catch((err) => {
        console.log("err >> ", err);
      });
  }

  // 판매상태 변경시 서버에 변경 요청
  const onChangeSellState = (e) => {
    const [productId, state] = e.target.value.split("/");
    setTargetProduct({
      productId,
      state,
    });

    console.log(productId, state);

    if (state === "delete") {
      setShowDeleteModal(true);
      // deleteProduct(productId, state);
      return;
    }

    axios
      .patch("/product/state", { productId, state })
      .then((res) => {
        console.log("res >> ", res);
        history.push("/product/manage");

        onShowAlertModal("판매상태가 변경되었습니다.");
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
            <th>찜/문의</th>
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
                      onClick={() => console.log("sf")}
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
                <td>{timeKrFormat(product.updatedAt)}</td>
              </tr>
            ))}
        </tbody>
      </ProductTable>
      {/* 변경 또는 삭제 결과 알림 모달창 */}
      <AlertModal
        show={showAlertModal}
        close={onCloseAlertModal}
        useCloseButton={false}
        useCancelButton={false}
        confirm={onCloseAlertModal}
      >
        {alertMessage}
      </AlertModal>

      {/* 삭제 확인 모달창 */}
      <AlertModal
        show={showDeleteModal}
        close={onCloseDeleteModal}
        title={"상품삭제"}
        useCloseButton={false}
        confirm={deleteProduct}
      >
        해당 상품을 삭제하시겠습니까?
      </AlertModal>
    </Container>
  );
};

export default withRouter(ProductManagePage);
