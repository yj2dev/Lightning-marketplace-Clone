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
        close();
        history.push("/");
      })
      .catch((err) => {
        console.error("err >> ", err);
      });
  }

  return (
    <Container>
      <AlertModal
        show={show}
        close={close}
        title="로그아웃"
        useCloseButton={false}
        confirm={signout}
      >
        계정을 로그아웃 하시겠습니까?
      </AlertModal>
    </Container>
  );
}

export default withRouter(SignoutModal);
