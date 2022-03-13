import { AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { useLocation, withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { AddFavoriteAlert } from "./styled";
import { BiCheck } from "react-icons/bi";
import { useSelector } from "react-redux";
import SigninModal from "../../../../components/SigninModal";

const ProductFavoriteSection = ({ favoriteList, store, history }) => {
  const location = useLocation();

  const [showSigninModal, setShowSigninModal] = useState(false);
  const [showAddFavoriteAlert, setShowAddFavoriteAlert] = useState(false);

  // 찜
  const [favorite, setFavorite] = useState({
    // cnt: 찜 개수, mySelect: 내 선택 여부
    cnt: 0,
    mySelect: false,
  });

  function getProductId() {
    const path = location.pathname.split("/");
    return path[2] ? path[2] : null;
  }

  useEffect(() => {
    // undefined 를 무조건 먼저 사용해야 한다.
    // 처음엔 비어있는 값이 들어와 길이를 체크하지 못해 오류를 일으키기 때문
    if (favoriteList === undefined || favoriteList.length === 0) return;

    let mySelect = false;
    favoriteList.forEach((favorite) => {
      mySelect =
        store.isSignin && favorite.toStoreId === store.isSignin.data._id
          ? true
          : false;
    });

    setFavorite({
      cnt: favoriteList.length,
      mySelect,
    });
  }, [favoriteList]);

  const onClickFavoriteProduct = () => {
    if (store && !store.isSignin) {
      setShowSigninModal(true);
      return;
    }

    const productId = getProductId();

    axios
      .get(`/product/${productId}/favorite`)
      .then((res) => {
        if (res.data) {
          //    증감
          setFavorite({
            cnt: favorite.cnt + 1,
            mySelect: true,
          });
          setShowAddFavoriteAlert(true);
          setTimeout(() => {
            setShowAddFavoriteAlert(false);
          }, 2000);
        } else {
          //    감소
          setFavorite({
            cnt: favorite.cnt - 1,
            mySelect: false,
          });
          setShowAddFavoriteAlert(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const activeFavoriteBtn = {
    background: "#333333",
  };
  const defaultFavoriteBtn = {
    background: "#cccccc",
  };

  return (
    <>
      <button
        id="btn-product"
        onClick={onClickFavoriteProduct}
        style={favorite.mySelect ? activeFavoriteBtn : defaultFavoriteBtn}
      >
        {favorite.mySelect ? (
          <AiFillHeart style={{ color: "red" }} />
        ) : (
          <AiFillHeart />
        )}
        &nbsp;찜&nbsp;<span>{favorite.cnt}</span>
        {showAddFavoriteAlert && (
          <AddFavoriteAlert>
            <BiCheck size={20} style={{ color: "#a4a4a4" }} />
            <span>상품을 찜</span> 했습니다
          </AddFavoriteAlert>
        )}
      </button>
      <SigninModal
        show={showSigninModal}
        close={() => setShowSigninModal(false)}
      ></SigninModal>
    </>
  );
};

export default withRouter(ProductFavoriteSection);
