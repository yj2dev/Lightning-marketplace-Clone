import { Container } from "./styled.js";
import { useEffect, useState } from "react";
import axios from "axios";

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
      <h3></h3>
      <hr />
      {favorite &&
        favorite.map((product) => (
          <>
            <img src={product.thumbnailImgURL} width={100} />
            {product.title}
            {product.price} <br />
          </>
        ))}
    </Container>
  );
};

export default ShopFavoritesPage;
