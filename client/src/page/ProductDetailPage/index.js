import { Container } from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

// 새로운 페이지 생성시 기본 구조
export const ProductDetailPage = () => {
  const location = useLocation();
  const [product, setProduct] = useState({});

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
        console.log(res);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <Container>ProductDetail</Container>;
};

export default ProductDetailPage;
