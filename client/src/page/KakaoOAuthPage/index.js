import { Container } from "./styled";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, withRouter } from "react-router-dom";

const KakaoOAuthPage = ({ history }) => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_AUTH_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_AUTH_REDIRECT_URI;

  const [userName, setUserName] = useState("");
  const [userProfileURI, setUserProfileURI] = useState("");
  const [cookie, setCookie, removeCookie] = useCookies(["using-cookie"]);

  const getUserInfo = () => {
    const code = new URL(window.location.href).searchParams.get("code");

    console.log("code >> ", code);
    if (!code) history.push("/");

    axios
      .get(`/oauth/kakao/?code=${code}`, {
        withCredentials: false,
      })
      .then((res) => {
        console.log("succeed");
        console.log("res >> ", res);

        setUserName(res.data.properties.nickname);
        setUserProfileURI(res.data.properties.thumbnail_image);
      })
      .catch((err) => {
        console.log("failed");
        console.log("err > ", err);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Container>
      <Link to="/">HOME</Link>
      <h1>KAKAO LOGIN TEST</h1>
      {/*<a*/}
      {/*  href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`}*/}
      {/*>*/}
      {/*  카카오로 이용하기*/}
      {/*</a>*/}
      <button onClick={getUserInfo}>TEST</button>
      KakaoOAuthPage
      <h2>{userName}</h2>
      <img src={userProfileURI} />
    </Container>
  );
};

export default withRouter(KakaoOAuthPage);
