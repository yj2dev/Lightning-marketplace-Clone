import { withRouter } from "react-router-dom";
import React from "react";

import { Container } from "./styled";
import TopNav from "./Header/TopNav";
import SearchNav from "./Header/SearchNav";

function MainPage() {
  return (
    <Container>
      <TopNav></TopNav>
      <SearchNav></SearchNav>
    </Container>
  );
}

export default withRouter(MainPage);
