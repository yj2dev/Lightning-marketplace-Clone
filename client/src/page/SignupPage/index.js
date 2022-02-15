import { Link, Route, Switch, withRouter } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Container, Form, InputWrapper, AgreeMyPhoneSection } from "./styled";
import axios from "axios";
import { useCookies } from "react-cookie";
import BeatLoader from "react-spinners/BeatLoader";
import AuthNumberPage from "./Sections/AuthNumberPage";
import { useSelector } from "react-redux";

const SignupPage = ({ history }) => {
  const user = useSelector((state) => state.user);

  const phoneNumberInput = useRef();

  const [authNumberPage, setAuthNumberPage] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [phoneNumberError, setPhoneNumberError] = useState({ validate: false });

  const [agreeMyPhone, setAgreeMyPhone] = useState(false);

  const [submitButton, setSubmitButton] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 각각의 입력란이 비어있지 않으면 확인(다음) 버튼 활성화
    if (phoneNumber !== "" && agreeMyPhone) setSubmitButton(true);
    else setSubmitButton(false);
  }, [phoneNumber, agreeMyPhone]);

  const onChangePhone = (e) => {
    const regex = /[^0-9]/g;
    const value = e.target.value.replace(regex, "");
    if (value.length < 12) setPhoneNumber(value);
  };

  const totalValidate = () => {
    // 모든 유효성 검사에 이상 없으면 true 반환
    let result = true;

    const phoneNumberRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

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

    setLoading(true);

    axios
      .post("/sms/code/send", { phoneNumber })
      .then((res) => {
        setLoading(false);
        console.log("res >> ", res);
        if (res.data.success) {
          setAuthNumberPage(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("err >> ", err);
      });
  };

  return (
    <Container>
      {!authNumberPage ? (
        <Form onSubmit={onSubmitSendCode}>
          <h1>
            나만의 상점을 <br /> 만들어 볼까요?
          </h1>
          <h3>본인의 휴대번호가 맞는지 확인해주세요.</h3>
          <InputWrapper>
            <input
              type="text"
              value={phoneNumber}
              // onChange={onChangePhone}
              required={true}
              ref={phoneNumberInput}
              style={{ color: "#adadad" }}
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
          <AgreeMyPhoneSection>
            <input
              type="checkbox"
              id="AgreeMyPhone"
              checked={agreeMyPhone}
              onClick={() => setAgreeMyPhone((prev) => !prev)}
            />
            <label for="AgreeMyPhone">내 휴대번호가 맞습니다.</label>
          </AgreeMyPhoneSection>
          <button
            type="submit"
            id={submitButton && "active"}
            disabled={!submitButton && true}
          >
            {!loading && "인증번호 전송"}
            <BeatLoader
              color="#ffffff"
              size={10}
              margin={5}
              loading={loading}
            />
          </button>
        </Form>
      ) : (
        <AuthNumberPage phoneNumber={phoneNumber} />
      )}
    </Container>
  );
};

export default withRouter(SignupPage);
