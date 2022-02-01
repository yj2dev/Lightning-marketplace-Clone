import { Link, withRouter } from "react-router-dom";
import { useState } from "react";
import { Container, Form } from "./styled";
import axios from "axios";
import * as queryString from "querystring";

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

  // Kakao OAuth
  const REST_API_KEY = process.env.REACT_APP_KAKAO_AUTH_REST_API_KEY;
  const JAVASCRIPT_KEY = process.env.REACT_APP_KAKAO_AUTH_JAVASCRIPT_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_AUTH_REDIRECT_URI;
  const CLIENT_SECRET = process.env.REACT_APP_KAKAO_AUTH_CLIENT_SECRET;
  axios.defaults.withCredentials = true;

  const onClickKakaoAuth = () => {
    console.log("[ OAuth Info ]");
    console.log(REST_API_KEY);
    console.log(REDIRECT_URI);
    console.log(CLIENT_SECRET);
  };

  const getKakaoToken = () => {
    console.log("[ getKakaoToken ]");
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code);

    const payload = {
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code,
      client_secret: CLIENT_SECRET,
    };

    const queryStringPayload = queryString.stringify(payload);

    console.log(payload);
    console.log(queryStringPayload);

    axios
      .post("https://kauth.kakao.com/oauth/token", payload, {
        withCredentials: false,
      })
      .then((res) => {
        console.log("succeed");
        // access token 설정

        window.Kakao.init(REST_API_KEY);
        window.Kakao.Auth.setAccessToken(res.data.access_token);
        console.log("res >> ", res);
      })
      .catch((err) => {
        console.log("failed");
        console.log("err > ", err);
      });
    // console.log(window.Kakao);
  };

  return (
    <Container>
      <button onClick={onClickKakaoAuth}>Kakao OAuth Info</button>
      <br />
      <a
        href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`}
      >
        카카오 로그인(Anchor)
      </a>

      <br />
      <button onClick={getKakaoToken}>getToken</button>

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
