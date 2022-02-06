import { Route, Switch, withRouter, useLocation } from "react-router-dom";
import React from "react";
import { Container } from "./styled";
import TopNav from "./Header/TopNav";
import SearchNav from "./Header/SearchNav";
import ProductNewPage from "../page/ProductNewPage";
import MyShopPage from "../page/MyShopPage";
import TalkPage from "../page/TalkPage";
import Footer from "./Footer";
import SignupPage from "../page/SignupPage";
import KakaoOAuthPage from "../page/KakaoOAuthPage";
import FacebookOAuthPage from "../page/FacebookOAuthPage";
import NaverOAuthPage from "../page/NaverOAuthPage";

function MainPage({ history }) {
  const { pathname } = useLocation();

  if (pathname.includes("/oauth") || pathname.includes("/signup")) {
    return (
      <>
        <Route exact path="/oauth/kakao" component={KakaoOAuthPage} />
        <Route exact path="/oauth/facebook" component={FacebookOAuthPage} />
        <Route exact path="/oauth/naver" component={NaverOAuthPage} />
        <Route exact path="/signup" component={SignupPage} />
      </>
    );
  } else {
    return (
      <Container>
        <Switch></Switch>

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
