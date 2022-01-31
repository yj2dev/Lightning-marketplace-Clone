import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { useState } from "react";

const CertificationPage = ({ history }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function onSubmit(e) {
    /* 가맹점 식별코드 */
    const userCode = "imp10391932";
    /* 결제 데이터 */
    // const { merchant_uid } = values;

    const data = {};

    data.merchant_uid = "feafsdf3123";

    data.name = name;
    data.phone = phoneNumber;
    data.min_age = 20;

    /* 웹 환경일때 */
    const { IMP } = window;
    IMP.init(userCode);
    IMP.certification(data, callback);
  }

  /* 본인인증 후 콜백함수 */
  function callback(response) {
    const query = queryString.stringify(response);

    console.log("response >> ", response);
    console.log("query >> ", query);

    // history.push(`/certification/result?${query}`);
  }

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />{" "}
      <br />
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />{" "}
      <br />
      <button onClick={onSubmit}>휴대폰 본인인증</button>
      CertificationPage
    </>
  );
};

export default withRouter(CertificationPage);
