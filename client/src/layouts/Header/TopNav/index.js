import React, { useState, useEffect } from "react";

import SigninModal from "../../../components/SigninModal";
import {
  Container,
  MarketIcon,
  AppDownloadButton,
  AlignCenter,
  ButtonWrapper,
  MyShopMenu,
} from "./styled";
import { AiFillStar, AiFillCaretDown } from "react-icons/ai";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

import SignoutModal from "../../../components/SignoutModal";
import useInterval from "../../../hooks/useInterval";

function TopNav({ history }) {
  const [showSigninModal, setShowSigninModal] = useState(false);
  const user = useSelector((state) => state.user);

  const [showSignoutModal, setShowSignoutModal] = useState(false);

  const [showMyShopMenu, setShowMyShopMenu] = useState(false);

  const onShowSignoutModal = () => {
    setShowSignoutModal((prev) => !prev);
  };
  const onCloseSignoutModal = () => {
    setShowSignoutModal(false);
  };

  const onCloseSigninModal = () => {
    setShowSigninModal(false);
  };

  const onToggleSignin = () => {
    //로그인이 되어 있지 않으면 로그인 모달 띄우기
    if (!user.isSignin) setShowSigninModal((prev) => !prev);
    else history.push(`/shop/${user.isSignin.data._id}`);
  };

  const onClickAppDownload = () => {
    alert("벼락장터는 앱으로 출시하지 않았습니다.");
  };
  const onClickAddFavorite = () => {
    alert("Ctrl + D 키를 누르면 즐겨찾기에 추가하실 수 있습니다.");
  };

  function onShowMyShopMenu() {
    setShowMyShopMenu(true);
    // useInterval(() => {
    //   setShowMyShopMenu(false);
    // }, 2000);
  }

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
          {user.isSignin ? (
            <button
              onClick={onShowSignoutModal}
              style={{ marginRight: "16px" }}
            >
              로그아웃
            </button>
          ) : (
            <button onClick={onToggleSignin} style={{ marginRight: "16px" }}>
              로그인/회원가입
            </button>
          )}
          {user.isSignin ? (
            <button
              onClick={onToggleSignin}
              onMouseEnter={() => console.log("enter...")}
            >
              <AlignCenter>
                내상점&nbsp;
                <AiFillCaretDown />
              </AlignCenter>
            </button>
          ) : (
            <button onClick={onToggleSignin}>내상점 </button>
          )}
        </div>
        <MyShopMenu>
          <ul>
            <li>내상품</li>
            <li>찜한상품</li>
            <li>계정설정</li>
          </ul>
        </MyShopMenu>
      </Container>
      <SignoutModal
        show={showSignoutModal}
        close={onCloseSignoutModal}
      ></SignoutModal>
      <SigninModal
        show={showSigninModal}
        close={onCloseSigninModal}
      ></SigninModal>
    </>
  );
}

export default withRouter(TopNav);
