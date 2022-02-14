import { Route, Switch, withRouter, useLocation } from "react-router-dom";
import React from "react";
import { Container } from "./styled";
import TopNav from "./Header/TopNav";
import SearchNav from "./Header/SearchNav";
import ProductNewPage from "../page/ProductNewPage";
import MyShopPage from "../page/MyShopPage";
import TalkPage from "../page/TalkPage";
import Footer from "./Footer";
import KakaoOAuthPage from "../page/KakaoOAuthPage";
import FacebookOAuthPage from "../page/FacebookOAuthPage";
import NaverOAuthPage from "../page/NaverOAuthPage";
import PhoneNumberAuthPage from "../page/PhoneNumberAuthPage";
import SignupPage from "../page/SignupPage";
import SigninPage from "../page/SigninPage";
import Auth from "../hoc/Auth";

// Auth(Component, option)
// - option: (0)로그인 여부 상관없음 - 기본값
//           (1)로그인 한 유저만 허용
//           (2)로그인 안한 유저만 허용
function MainPage({ history }) {
  const { pathname } = useLocation();

  // 기존의 만들어둔 레이아웃을 적용하지 않고 새롭게 구성하기 위해 조건문처리
  if (
    pathname.includes("/oauth") ||
    pathname.includes("/auth") ||
    pathname.includes("/signin") ||
    pathname.includes("/signup")
  ) {
    return (
      <>
        <Route exact path="/oauth/kakao" component={Auth(KakaoOAuthPage, 2)} />
        <Route
          exact
          path="/oauth/facebook"
          component={Auth(FacebookOAuthPage, 2)}
        />
        <Route exact path="/oauth/naver" component={Auth(NaverOAuthPage, 2)} />
        <Route exact path="/auth" component={Auth(PhoneNumberAuthPage, 2)} />
        <Route exact path="/signin" component={Auth(SigninPage, 2)} />
        <Route exact path="/signup" component={Auth(SignupPage, 2)} />
      </>
    );
  } else {
    return (
      <Container>
        <TopNav></TopNav>
        <SearchNav></SearchNav>
        <Switch>
          <Route path="/product/new" component={Auth(ProductNewPage, 1)} />
          <Route path="/shop" component={Auth(MyShopPage, 1)} />
          <Route path="/talk" component={Auth(TalkPage, 1)} />
        </Switch>
        <Footer></Footer>
      </Container>
    );
  }
}

export default withRouter(MainPage);
