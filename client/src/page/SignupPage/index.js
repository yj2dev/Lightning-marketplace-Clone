import { Link, Route, Switch, withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Container, Form, InputWrapper } from "./styled";
import axios from "axios";
import { useCookies } from "react-cookie";

const SignupPage = ({ history }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState({ validate: false });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState({ validate: false });
  const [submitButton, setSubmitButton] = useState(true);

  useEffect(() => {
    // 각각의 입력란이 비어있지 않으면 확인(다음) 버튼 활성화
    if (name !== "" && phoneNumber !== "") setSubmitButton(true);
    else setSubmitButton(false);
  }, [name, phoneNumber]);

  const onChangeName = (e) => {
    const regex = /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const value = e.target.value.replace(regex, "");
    setName(value);
  };
  const onChangePhone = (e) => {
    const regex = /[^0-9]/g;
    const value = e.target.value.replace(regex, "");
    if (value.length < 12) setPhoneNumber(value);
  };

  const totalValidate = () => {
    // 모든 유효성 검사에 이상 없으면 true 반환
    let result = true;

    const nameRegex = /[^가-힣]$/g;

    // 온전한 이름이 완성되지 않았을 때
    if (nameRegex.test(name)) {
      setNameError({ validate: true });
      result = false;
    } else {
      // 온전한 이름이 완성되었을 때
      setNameError({ validate: false });
    }

    // 휴대폰번호 길이가 부족할 때
    if (phoneNumber.length < 11) {
      result = false;
      setPhoneNumberError({ validate: true });
    } else {
      // 휴대폰번호 길이가 충분할 때
      setPhoneNumberError({ validate: false });
    }

    return result;
  };
  const onSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사를 통과하지 못했을 때
    if (!totalValidate()) return;

    const payload = {
      // 휴대폰 번호만 넣을지 유저 이름과 같이 보낼지 고려중
      phoneNumber,
    };

    console.log("payload >> ", payload);

    axios
      .post("http://localhost:8000/sms/code/send", payload)
      .then((res) => {
        console.log("succeed >> ", res);
      })
      .catch((err) => {
        console.log("failed >> ", err);
      });
  };

  return (
    <Container>
      {/*<Link to="/">HOME</Link>*/}
      <Form onSubmit={onSubmit}>
        <h1>본인 정보를 입력해주세요</h1>

        <InputWrapper>
          <input
            type="text"
            value={name}
            onChange={onChangeName}
            required={true}
            autoFocus={true}
          />
          <span></span>
          <label>
            {nameError.validate ? "이름을 다시 확인해주세요." : "이름"}
          </label>
        </InputWrapper>

        <InputWrapper>
          <input
            type="text"
            value={phoneNumber}
            onChange={onChangePhone}
            required={true}
          />
          <span></span>
          <label>
            {phoneNumberError.validate
              ? "휴대폰번호를 다시 확인해주세요."
              : "이름"}
          </label>
        </InputWrapper>
        <button
          type="submit"
          id={submitButton && "active"}
          disabled={!submitButton && true}
        >
          다음
        </button>
      </Form>
    </Container>
  );
};

export default withRouter(SignupPage);
