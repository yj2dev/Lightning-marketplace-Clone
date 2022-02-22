import { Link, Route, Switch, withRouter } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Container, Form, InputWrapper, Footer } from "./styled";
import axios from "axios";
import { useCookies } from "react-cookie";
import BeatLoader from "react-spinners/BeatLoader";
import { useDispatch } from "react-redux";
import { signupProcessUser } from "../../_actions/user_actions";

// 휴대폰 번호가 존재하면 로그인 페이지로 이동하거나
// 휴대본 번호가 존재하지 않으면 회원가입 페이지로 분기처리하는 페이지입니다.
const PhoneNumberAuthPage = ({ history }) => {
  const dispatch = useDispatch();
  const phoneNumberInput = useRef();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState({ validate: false });

  const [submitButton, setSubmitButton] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 각각의 입력란이 비어있지 않으면 확인(다음) 버튼 활성화
    if (phoneNumber !== "") setSubmitButton(true);
    else setSubmitButton(false);
  }, [phoneNumber]);

  const onChangePhone = (e) => {
    const regex = /[^0-9]/g;
    const value = e.target.value.replace(regex, "");
    // 최대 11자리까지 입력가능
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
  const onSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사를 통과하지 못했을 때
    if (!totalValidate()) return;

    setLoading(true);

    // 리덕스로 현재까지 입력한 정보 저장 (다른페이지에서 사용하기 위함)
    dispatch(signupProcessUser(phoneNumber));

    axios
      .get(`/user/check?phoneNumber=${phoneNumber}`)
      .then(({ data }) => {
        setLoading(false);

        if (data.success && data.data) {
          // 로그인 페이지로 이동
          history.push("/signin");
        } else {
          // 회원가입 페이지로 이동
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
      <Form onSubmit={onSubmit}>
        <h1>
          나만의 상점을 <br /> 사용해 볼까요?
        </h1>
        <h3>로그인 또는 회원가입에 필요합니다.</h3>
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
              "휴대폰번호를 입력해주세요."
            )}
          </label>
        </InputWrapper>

        <button
          type="submit"
          id={submitButton && "active"}
          disabled={!submitButton && true}
        >
          {!loading && "다음"}
          <BeatLoader color="#ffffff" size={10} margin={5} loading={loading} />
        </button>
      </Form>
    </Container>
  );
};

export default withRouter(PhoneNumberAuthPage);
