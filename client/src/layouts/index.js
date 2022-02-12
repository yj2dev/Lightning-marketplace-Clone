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
        <Route exact path="/oauth/kakao" component={KakaoOAuthPage} />
        <Route exact path="/oauth/facebook" component={FacebookOAuthPage} />
        <Route exact path="/oauth/naver" component={NaverOAuthPage} />
        <Route exact path="/auth" component={PhoneNumberAuthPage} />
        <Route exact path="/signin" component={SigninPage} />
        <Route exact path="/signup" component={SignupPage} />
      </>
    );
  } else {
    return (
      <Container>
        <TopNav></TopNav>
        <SearchNav></SearchNav>
        <Switch>
          <Route path="/product/new" component={ProductNewPage} />
          <Route path="/shop" component={MyShopPage} />
          <Route path="/talk" component={TalkPage} />
        </Switch>
        <Footer></Footer>
      </Container>
    );
  }
}

export default withRouter(MainPage);
