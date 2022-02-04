import { Link, Route, Switch, withRouter } from "react-router-dom";
import React, { useState } from "react";
import { Container, Form } from "./styled";
import axios from "axios";
import { useCookies } from "react-cookie";

const OAuthPage = ({ history }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [userName, setUserName] = useState("");
  const [userProfileURI, setUserProfileURI] = useState("");

  const [cookie, setCookie, removeCookie] = useCookies(["using-cookie"]);

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangePhone = (e) => {
    const regex = "/^[0-9]/";
    if (regex.test(e.target.value)) {
      console.log("숫자");
    } else {
      console.log("숫자아님");
    }
    setPhone(e.target.value);
  };

  function onSubmit(e) {
    e.preventDefault();
    /* 가맹점 식별코드 */
    const userCode = "imp67421659";
    /* 결제 데이터 */
    // const { merchant_uid } = values;

    const data = {
      merchant_uid: "dummyUid",
      name,
      phone,
      min_age: 14,
    };

    /* 웹 환경일때 */
    const IMP = window.IMP;
    IMP.init(userCode);
    IMP.certification(data, callback);
  }

  /* 본인인증 후 콜백함수 */
  function callback(res) {
    console.log("res >> ", res);
    const { success, merchant_uid } = res;

    if (success) {
      console.log("본인인증 성공 ", merchant_uid);
      console.log(name, phone);
      //    회원가입 로직 작성예정
    } else {
      console.log("본인인증 실패 ", merchant_uid);
    }
  }

  return (
    <Container>
      <Link to="/">HOME</Link>
      <h2>{userName}</h2>
      <img src={userProfileURI} />
      <Form onSubmit={onSubmit}>
        <input
          type="text"
          value={name}
          placeholder="이름"
          onChange={onChangeName}
        />
        <input
          type="text"
          placeholder="전화번호"
          value={phone}
          onChange={onChangePhone}
        />
        <button type="submit">휴대폰 본인인증</button>
      </Form>
    </Container>
  );
};

export default withRouter(OAuthPage);
