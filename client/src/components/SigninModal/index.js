import {
  Container,
  ModalContainer,
  MarketIcon,
  KakaoAuthButton,
  FacebookAuthButton,
  NaverAuthButton,
  OriginAuthButton,
} from "./styled";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { RiKakaoTalkFill } from "react-icons/ri";
import { AiFillFacebook } from "react-icons/ai";
import { SiNaver } from "react-icons/si";
import { FiSmartphone } from "react-icons/fi";

import Modal from "../Modal";
import axios from "axios";

function SigninModal({ children, show, close, history }) {
  // Kakao OAuth
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_AUTH_REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_AUTH_REDIRECT_URI;

  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_AUTH_CLIENT_ID;
  const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_AUTH_REDIRECT_URI;

  // Naver OAuth

  const onSubmitKakaoAuth = () => {
    // axios
    //   .get("/oauth/kakao")
    //   .then((res) => {
    //     console.log("kakao res >> ", res);
    //   })
    //   .catch((err) => {
    //     console.log("kakao err >> ", err);
    //   });

    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;
  };
  const onSubmitFacebookAuth = () => {
    history.push("/oauth/facebook");
  };
  const onSubmitNaverAuth = () => {
    const state = "404";
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${state}`;

    //
    // axios
    //   .get("/oauth/naver")
    //   .then((res) => {
    //     console.log("naver res >> ", res);
    //   })
    //   .catch((err) => {
    //     console.log("naver err >> ", err);
    //   });

    //history.push("/oauth/naver");
  };
  const onSubmitPhoneCertification = () => {
    history.push("/auth");
  };

  return (
    <Container>
      <Modal
        show={show}
        close={close}
        style={{
          padding: "10px 30px",
          width: "340px",
          height: "480px",
          backgroundColor: "#f7f7f7",
        }}
      >
        <ModalContainer>
          <MarketIcon>
            <BsFillLightningChargeFill
              size={20}
              style={{ transform: "rotate(-5deg)" }}
            />
          </MarketIcon>
          <h1>벼락장터로 중고거래 시작하기</h1>
          <h2>간편하게 가입하고 상품을 확인하세요</h2>

          <KakaoAuthButton onClick={onSubmitKakaoAuth}>
            <span>
              <RiKakaoTalkFill
                size={18}
                style={{ position: "absolute", left: "40px", top: "8px" }}
              />
            </span>
            카카오로 이용하기
          </KakaoAuthButton>
          <FacebookAuthButton onClick={onSubmitFacebookAuth}>
            <span>
              <AiFillFacebook
                size={17}
                style={{
                  position: "absolute",
                  left: "41px",
                  top: "9px",
                }}
              />
            </span>
            페이스북으로 이용하기
          </FacebookAuthButton>
          <NaverAuthButton onClick={onSubmitNaverAuth}>
            <span>
              <SiNaver
                size={15}
                style={{
                  position: "absolute",
                  left: "42px",
                  top: "10px",
                }}
              />
            </span>
            네이버로 이용하기
          </NaverAuthButton>

          <OriginAuthButton onClick={onSubmitPhoneCertification}>
            <span>
              <FiSmartphone
                size={18}
                style={{ position: "absolute", left: "40px", top: "9px" }}
              />
            </span>
            휴대전화로 이용하기
          </OriginAuthButton>

          <hr />
          <h3 className="notice">
            도움이 필요하면 <strong>이메일</strong>또는
            <strong>고객센터</strong>로 문의 부탁드립니다. <br /> 고객센터
            운영시간: 00시~24시 (주말/공휴일 제외)
          </h3>
        </ModalContainer>
      </Modal>
    </Container>
  );
}

export default withRouter(SigninModal);
