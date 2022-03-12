import { Container, FavoritesContainer, Favorites } from "./styled.js";
import { useEffect, useState } from "react";
import axios from "axios";
import * as PropTypes from "prop-types";
import { intOfKr } from "../../../../utils/Currency";
import { daysFormat } from "../../../../utils/Time";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ShopFavoritesPage = () => {
  const [favorite, setFavorite] = useState([]);

  function getFavorite() {
    // 쿠키에 저장된 토큰값으로 유저를 조회
    axios
      .get("/product/favorite")
      .then((res) => {
        console.log("res favorite >> ", res);
        const favoriteList = [];
        res.data.map((product) => {
          favoriteList.push(product._fromProductId[0]);
        });
        setFavorite(favoriteList);
      })
      .catch((err) => {
        console.log("err favorite >> ", err);
      });
  }

  useEffect(() => {
    getFavorite();
  }, []);
  return (
    <Container>
      <h3>
        찜&nbsp;<span style={{ color: "red" }}>{favorite.length}</span>
      </h3>
      <hr />
      <FavoritesContainer>
        {favorite &&
          favorite.map((product) => (
            <Link
              value={product._id}
              to={`/product/${product._id}`}
              onClick={(e) => {
                console.log(e.target.value);
              }}
            >
              <Favorites className="cursor_pointer">
                <div className="img_wrapper">
                  <img src={product.thumbnailImgURL} />
                </div>
                <div className="content_wrapper">
                  <div className="content">
                    <div className="content_title">{product.title}</div>
                    <div className="content_price">
                      {intOfKr(product.price)} <span>원</span>
                    </div>

                    <div className="content_time">
                      {daysFormat(product.createdAt)}
                    </div>
                  </div>
                  <hr />
                  <div className="content_address">
                    <FaMapMarkerAlt size={14} style={{ color: "#999999" }} />
                    &nbsp;
                    {product.address}
                  </div>
                </div>
              </Favorites>
            </Link>
          ))}
      </FavoritesContainer>
    </Container>
  );
};

export default ShopFavoritesPage;
