import { Route, Switch, withRouter } from "react-router-dom";
import React from "react";

import { Container } from "./styled";
import TopNav from "./Header/TopNav";
import SearchNav from "./Header/SearchNav";
import ProductNewPage from "../page/ProductNewPage";

function MainPage() {
  return (
    <Container>
      <TopNav></TopNav>
      <SearchNav></SearchNav>
      <Switch>
        <Route path="/product/new" component={ProductNewPage} />
        {/*<Route path="/shop" component={null} />*/}
        {/*<Route path="/talk" component={null} />*/}
      </Switch>
    </Container>
  );
}

export default withRouter(MainPage);
