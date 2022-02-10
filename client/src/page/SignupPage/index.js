import { Link, Route, Switch, withRouter } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Container, Form, InputWrapper } from "./styled";
import axios from "axios";
import { useCookies } from "react-cookie";
import BeatLoader from "react-spinners/BeatLoader";
import AuthNumberPage from "./Sections/AuthNumberPage";

const SignupPage = ({ history }) => {
  const nameInput = useRef();
  const phoneNumberInput = useRef();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState({ validate: false });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState({ validate: false });

  const [submitButton, setSubmitButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const [nextPage, setNextPage] = useState(false);

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
    const phoneNumberRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    // 온전한 이름이 완성되지 않았을 때
    if (nameRegex.test(name)) {
      setNameError({ validate: true });
      result = false;
    } else {
      // 온전한 이름이 완성되었을 때
      setNameError({ validate: false });
    }

    // 휴대폰번호 양식에 맞게 작성되었는지 확인(길이도 같이 체크가능)
    if (!phoneNumberRegex.test(phoneNumber)) {
      // 휴대폰번호 양식과 일치하지 않을 때
      result = false;
      setPhoneNumberError({ validate: true });
    } else {
      // 휴대폰번호 양식과 일치할 때
      setPhoneNumberError({ validate: false });
    }

    return result;
  };

  // 휴대폰번호로 인증코드를 보내는 로직
  const onSubmitSendCode = (e) => {
    e.preventDefault();

    // 유효성 검사를 통과하지 못했을 때
    if (!totalValidate()) return;

    const payload = {
      // 휴대폰 번호만 넣을지 유저 이름과 같이 보낼지 고려중
      phoneNumber,
    };

    console.log("payload >> ", payload);
    setLoading(true);

    axios
      .post("http://localhost:8000/sms/code/send", payload)
      .then((res) => {
        if (res.success) {
          setLoading(false);
          setNextPage(true);
          history.push("/signup");
        }
      })
      .catch((err) => {
        console.error("err >> ", err);
        setLoading(false);
      });
  };

  return (
    <Container>
      {!nextPage ? (
        <Form onSubmit={onSubmitSendCode}>
          <h1>본인 정보를 입력해주세요</h1>
          <InputWrapper>
            <input
              type="text"
              value={name}
              onChange={onChangeName}
              required={true}
              autoFocus={true}
              ref={nameInput}
            />
            <span></span>
            <label onClick={() => nameInput.current.focus()}>
              {nameError.validate ? (
                <div className="error">이름을 다시 확인해주세요</div>
              ) : (
                "이름"
              )}
            </label>
          </InputWrapper>

          <InputWrapper>
            <input
              type="text"
              value={phoneNumber}
              onChange={onChangePhone}
              required={true}
              ref={phoneNumberInput}
            />
            <span></span>
            <label onClick={() => phoneNumberInput.current.focus()}>
              {phoneNumberError.validate ? (
                <div className="error">휴대폰번호를 다시 확인해주세요</div>
              ) : (
                "휴대폰번호"
              )}
            </label>
          </InputWrapper>
          <button
            type="submit"
            id={submitButton && "active"}
            disabled={!submitButton && true}
          >
            {!loading && "다음"}
            <BeatLoader
              color="#ffffff"
              size={10}
              margin={5}
              loading={loading}
            />
          </button>
        </Form>
      ) : (
        <AuthNumberPage name={name} phoneNumber={phoneNumber} />
      )}
    </Container>
  );
};

export default withRouter(SignupPage);
