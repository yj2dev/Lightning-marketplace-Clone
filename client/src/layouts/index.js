import { Route, Switch, withRouter } from "react-router-dom";
import React from "react";
import { Container } from "./styled";
import TopNav from "./Header/TopNav";
import SearchNav from "./Header/SearchNav";
import ProductNewPage from "../page/ProductNewPage";
import MyShopPage from "../page/MyShopPage";
import TalkPage from "../page/TalkPage";
import Footer from "./Footer";

function MainPage() {
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

export default withRouter(MainPage);
