import { AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ProductFavoriteSection = ({ favorite }) => {
  const location = useLocation();

  function getProductId() {
    const path = location.pathname.split("/");
    return path[2] ? path[2] : null;
  }

  const onClickFavoriteProduct = () => {
    const productId = getProductId();
    axios
      .get(`/product/${productId}/favorite`)
      .then((res) => {
        console.log("fa res >> ", res);
        // history.push(`/product/${productId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <button
        style={{ background: "#cccccc" }}
        onClick={onClickFavoriteProduct}
      >
        {favorite.mySelect ? (
          <AiFillHeart style={{ color: "red" }} />
        ) : (
          <AiFillHeart />
        )}
        &nbsp;찜&nbsp;<span>{favorite.cnt}</span>
      </button>
    </>
  );
};

export default ProductFavoriteSection;
