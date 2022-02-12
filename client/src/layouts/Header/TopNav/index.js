import React, { useState, useEffect } from "react";

import LoginModal from "../../../components/LoginModal";
import { Container, MarketIcon, AppDownloadButton } from "./styled";
import { AiFillStar } from "react-icons/ai";
import { BsFillLightningChargeFill } from "react-icons/bs";

function TopNav() {
  useEffect(() => {}, []);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const onCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const onToggleLogin = () => {
    setShowLoginModal((prev) => !prev);
  };
  const onSubmitLogin = () => {
    console.log("submit");
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
          <button onClick={onToggleLogin} style={{ marginRight: "16px" }}>
            로그인/회원가입
            {/*로그아웃*/}
          </button>
          <button onClick={onToggleLogin}>내상점</button>
        </div>
      </Container>
      <LoginModal show={showLoginModal} close={onCloseLoginModal}></LoginModal>
    </>
  );
}

export default TopNav;
