import { withRouter } from "react-router-dom";
import React from "react";

import { Container } from "./styled";
import TopNav from "./Header/TopNav";

function MainPage() {
  return (
    <Container>
      <TopNav></TopNav>
    </Container>
  );
}

export default withRouter(MainPage);
