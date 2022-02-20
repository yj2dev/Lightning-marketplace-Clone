import { Container } from "./styled";
import React, { useState, useEffect } from "react";

import AlertModal from "../AlertModal";
import axios from "axios";
import { authUser } from "../../_actions/user_actions";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

function SignoutModal({ show, close, history }) {
  const dispatch = useDispatch();

  // 로그아웃
  function signout() {
    axios
      .get("/user/signout", { withCredentials: true })
      .then(({ data }) => {
        if (data.success) {
          dispatch(authUser());
        }
        history.push("/");
      })
      .catch((err) => {
        console.error("err >> ", err);
      });
  }

  return (
    <Container>
      <AlertModal show={show} close={close}>
        asdasd
      </AlertModal>
    </Container>
  );
}

export default withRouter(SignoutModal);
