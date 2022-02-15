import {
  Container,
  ProductContainer,
  ProductImgs,
  ProductInfo,
} from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { daysFormat } from "../../utils/Time";
import { intOfKr } from "../../utils/Currency";

// 새로운 페이지 생성시 기본 구조
export const ProductDetailPage = () => {
  const location = useLocation();
  const [product, setProduct] = useState({});
  const [user, setUser] = useState({});

  function getProductId() {
    const path = location.pathname.split("/");
    return path[2] ? path[2] : null;
  }

  useEffect(() => {
    const productId = getProductId();

    console.log(productId);
    axios
      .get(`/product/detail/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setUser(res.data.userInfo[0]);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function onTest() {
    console.log(product.userInfo[0].profileURL);
    console.log(product.userInfo[0].storeName);
  }

  return (
    <Container>
      <button onClick={onTest}>test</button>
      <ProductContainer>
        <ProductImgs>
          {user && user.storeName}
          {user && user.profileURL}

          {/*{product &&*/}
          {/*  product.productImgURLs.map((product) => (*/}
          {/*    <div className="test">*/}
          {/*      <div className="img_wrapper">*/}
          {/*        <img src={product.productImgURL} />*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  ))}*/}
        </ProductImgs>
        <ProductInfo>
          <h3>{product.title}</h3>
          <div className="price">
            {intOfKr(product.price)} <span>원</span>
          </div>
          {daysFormat(product.createdAt)}

          <div className="newProduct">
            <tr>
              <td>
                <strong>·</strong> 상품상태
              </td>
              <td>{product.newProduct ? "중고" : "새상품"}</td>
            </tr>
          </div>
          <div className="enableExchange">
            <tr>
              <td>
                <strong>·</strong>교환여부
              </td>
              <td>{product.enableExchange ? "교환불가능" : "교환가능"}</td>
            </tr>
          </div>
          <div className="containDeliveryCharge">
            <tr>
              <td>
                <strong>·</strong>배송비
              </td>
              <td>
                {product.containDeliveryCharge ? "배송비 별도" : "배송비 포함"}
              </td>
            </tr>
            <span></span>
          </div>
          <div className="address">
            <tr>
              <td>
                <strong>·</strong>거래지역
              </td>
              <td>
                {product.address === "지역설정안함" ? "전국" : product.address}
              </td>
            </tr>
          </div>
          {product.description}
        </ProductInfo>
      </ProductContainer>
    </Container>
  );
};

export default ProductDetailPage;
