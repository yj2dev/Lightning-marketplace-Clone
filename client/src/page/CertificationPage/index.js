import { withRouter } from "react-router-dom";
import { useState } from "react";
import { Container, Form } from "./styled";
import axios from "axios";

import dotenv from "dotenv";
dotenv.config();

const CertificationPage = ({ history }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

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
  const REST_API_KEY = process.env.KAKAO_AUTH_REST_API_KEY;
  const REDIRECT_URI = "http://localhost:3000/certification";
  const onClickKakaoAuth = () => {
    // axios.defaults.withCredentials = true;

    console.log(REST_API_KEY);
    console.log(REDIRECT_URI);

    axios
      .get(
        `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`,
        {}
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <button onClick={onClickKakaoAuth}>카카오 로그인 REST API</button>

      <a
        href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`}
      >
        카카오 로그인
      </a>

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

export default withRouter(CertificationPage);
