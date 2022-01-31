import { withRouter } from "react-router-dom";
import { useState } from "react";
import { Container, Form } from "./styled";

const CertificationPage = ({ history }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    /* 가맹점 식별코드 */
    const userCode = "imp67421659";
    /* 결제 데이터 */
    // const { merchant_uid } = values;

    const data = {};

    data.merchant_uid = "dummyUid";

    data.name = name;
    data.phone = phoneNumber;
    data.min_age = 20;

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
      console.log(name, phoneNumber);
      //    회원가입 로직 작성예정
    } else {
      console.log("본인인증 실패 ", merchant_uid);
    }
  }

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <input
          type="text"
          value={name}
          placeholder="이름"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="전화번호"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button type="submit">휴대폰 본인인증</button>
      </Form>
    </Container>
  );
};

export default withRouter(CertificationPage);
