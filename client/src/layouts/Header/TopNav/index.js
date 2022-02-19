import React, { useState, useEffect } from "react";

import SigninModal from "../../../components/SigninModal";
import { Container, MarketIcon, AppDownloadButton } from "./styled";
import { AiFillStar } from "react-icons/ai";
import { BsFillLightningChargeFill } from "react-icons/bs";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../../../_actions/store_actions";

function TopNav({ history }) {
  const [showSigninModal, setShowSigninModal] = useState(false);
  const store = useSelector((state) => state.store);
  const dispatch = useDispatch();

  // 로그아웃
  const onClickSignout = () => {
    axios
      .get("/store/signout", { withCredentials: true })
      .then(({ data }) => {
        if (data.success) {
          dispatch(authUser());
        }
        history.push("/");
      })
      .catch((err) => {
        console.error("err >> ", err);
      });
  };

  const onCloseSigninModal = () => {
    setShowSigninModal(false);
  };

  const onToggleSignin = () => {
    //로그인이 되어 있지 않으면 로그인 모달 띄우기
    if (!store.isSignin) setShowSigninModal((prev) => !prev);
    else history.push(`/shop/${store.isSignin.data._id}`);
  };

  const onClickAppDownload = () => {
    alert("벼락장터는 앱으로 출시하지 않았습니다.");
  };
  const onClickAddFavorite = () => {
    alert("Ctrl + D 키를 누르면 즐겨찾기에 추가하실 수 있습니다.");
  };

  return (
    <>
      <Container>
        <div className="left">
          <AppDownloadButton onClick={onClickAppDownload}>
            <MarketIcon>
              <BsFillLightningChargeFill
                size={10}
                style={{ transform: "rotate(-5deg)" }}
              />
            </MarketIcon>
            <div>앱다운로드</div>
          </AppDownloadButton>
          <button onClick={onClickAddFavorite} style={{ paddingLeft: "48px" }}>
            <AiFillStar
              size={18}
              style={{
                color: "#e9b457",
                position: "absolute",
                left: "26px",
                top: "2px",
              }}
            />
            즐겨찾기
          </button>
        </div>
        <div className="right">
          {store.isSignin ? (
            <button onClick={onClickSignout} style={{ marginRight: "16px" }}>
              로그아웃
            </button>
          ) : (
            <button onClick={onToggleSignin} style={{ marginRight: "16px" }}>
              로그인/회원가입
            </button>
          )}
          <button onClick={onToggleSignin}>내상점</button>
        </div>
      </Container>
      <SigninModal
        show={showSigninModal}
        close={onCloseSigninModal}
      ></SigninModal>
    </>
  );
}

export default withRouter(TopNav);
