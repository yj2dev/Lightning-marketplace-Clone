import React, { useState, useEffect } from "react";

import SigninModal from "../../../components/SigninModal";
import { Container, MarketIcon, AppDownloadButton } from "./styled";
import { AiFillStar } from "react-icons/ai";
import { BsFillLightningChargeFill } from "react-icons/bs";
import axios from "axios";
import { withRouter } from "react-router-dom";

function TopNav({ history }) {
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    axios
      .post("/user/auth", {}, { withCredentials: true })
      .then(({ data }) => {
        console.log("data >> ", data);
        if (data.success && data.data) {
          console.log("로그인 상태: 성공");
          setIsUser(true);
        }
      })
      .catch((err) => {
        console.error("err >> ", err);
      });
  }, []);
  const [showSigninModal, setShowSigninModal] = useState(false);

  // 로그아웃
  const onClickSignout = () => {
    axios
      .get("/user/signout", { withCredentials: true })
      .then(({ data }) => {
        if (data.success) {
          history.push("/");
        }
      })
      .catch((err) => {
        console.error("err >> ", err);
      });
  };

  const onCloseSigninModal = () => {
    setShowSigninModal(false);
  };

  const onToggleSignin = () => {
    setShowSigninModal((prev) => !prev);
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
          {isUser ? (
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
