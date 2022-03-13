import { Container, MessageWithoutResult } from "./styled";
import { useEffect, useState } from "react";
import { Link, useLocation, withRouter } from "react-router-dom";
import axios from "axios";
import {
  Product,
  ProductContents,
  ProductSection,
} from "../LandingPage/styled";
import { intOfKr } from "../../utils/Currency";
import { daysFormat } from "../../utils/Time";
import * as PropTypes from "prop-types";

MessageWithoutResult.propTypes = { children: PropTypes.node };
export const SearchPage = ({ history }) => {
  const location = useLocation();

  const [productList, setProductList] = useState([]);
  const [keyword, setKeyword] = useState([]);

  function getTitleSearch(keyword) {
    axios
      .get(`/product/${keyword}/search`)
      .then((res) => {
        console.log("res >> ", res);

        setProductList(res.data);
      })
      .catch((err) => {
        console.log("err >> ", err);
      });
  }

  useEffect(() => {
    // 검색 파라미터 분석
    const [type, keyword] = location.search.replace("?", "").split("=");

    setKeyword(keyword);

    if (type === "q") {
      getTitleSearch(keyword);
    }
  }, []);

  return (
    <Container>
      <h4 style={{ fontWeight: "400" }}>
        <span style={{ color: "#ff5058" }}>{keyword}</span>
        의&nbsp;검색결과&nbsp;
        <span style={{ color: "#999999" }}>{productList.length}</span>개
      </h4>
      {productList.length === 0 && (
        <MessageWithoutResult>
          <h3>{keyword}</h3>
          <span>에 대한 검색결과가 없습니다.</span>
          <br />
          - 단어의 철자가 정확한지 확인해 보세요 <br />
          - 보다 일반적인 검색어로 다시 검색해 보세요 <br />
          - 검색어의 띄어쓰기를 다르게 해보세요 <br />
          - 유해/금지어가 아닌지 확인해주세요 <br />
        </MessageWithoutResult>
      )}

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
    </Container>
  );
};

export default withRouter(SearchPage);
