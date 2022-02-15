import { useEffect, useState } from "react";
import axios from "axios";
import Banner from "./Section/Banner";
import {
  SectionTitle,
  ProductSection,
  ProductContents,
  Product,
} from "./styled";
import { Link } from "react-router-dom";
import { intOfKr } from "../../utils/Currency";
import { daysFormat } from "../../utils/Time";

const LandingPage = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios
      .get("/product/all")
      .then((res) => {
        console.log(res);
        setProductList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Banner></Banner>
      <SectionTitle>오늘의 상품 추천</SectionTitle>
      <ProductSection>
        {productList &&
          productList.map((product) => (
            <>
              <Link to={`/product/${product._id}`}>
                <Product>
                  <div className="img_wrapper">
                    <img
                      width={190}
                      src={product.thumbnailImgURL}
                      alt={product.title}
                    />
                  </div>
                  <ProductContents>
                    <div className="title">{product.title}</div>
                    <div className="price">
                      {intOfKr(product.price)} <span>원</span>
                    </div>
                    <div className="time">{daysFormat(product.createdAt)}</div>
                  </ProductContents>
                </Product>
              </Link>
            </>
          ))}
      </ProductSection>
    </>
  );
};

export default LandingPage;
