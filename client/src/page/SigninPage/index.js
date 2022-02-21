import { Link, Route, Switch, withRouter } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Container, Form, InputWrapper, PasswordBadge } from "./styled";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import { useSelector } from "react-redux";
import { BiHide, BiShow } from "react-icons/bi";

const SigninPage = ({ history }) => {
  const user = useSelector((state) => state.user);

  const passwordInput = useRef();
  const phoneNumberInput = useRef();

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState({ validate: false });
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [phoneNumberError, setPhoneNumberError] = useState({ validate: false });
  const [showPassword, setShowPassword] = useState(false);

  const [submitButton, setSubmitButton] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 각각의 입력란이 비어있지 않으면 확인(다음) 버튼 활성화
    if (password !== "" && phoneNumber !== "") setSubmitButton(true);
    else setSubmitButton(false);
  }, [password, phoneNumber]);

  const onChangePassword = (e) => {
    // 최대 24글자 길이 제한
    if (e.target.value.length < 24) setPassword(e.target.value);
  };

  const onShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // 변경사항으로 유저가 해당 페이지에서 직접 핸드폰 번호를 입력하게 될까봐 남겨둠
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

  // 로그인 확인
  const onSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사를 통과하지 못했을 때
    if (!totalValidate()) return;

    const payload = {
      phoneNumber,
      password,
    };

    setLoading(true);

    axios
      .post("/user/signin", payload, {
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);

        if (res.data.success) {
          history.push("/");
        }
      })
      .catch((err) => {
        setLoading(false);
        setPasswordError({ validate: true });
        console.error("err >> ", err);
      });
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <h1>
          벼락장터 회원님 <br /> 반갑습니다 :D
        </h1>
        <h3>비밀번호를 입력해주세요.</h3>
        <InputWrapper>
          <input
            type="text"
            value={phoneNumber}
            // onChange={onChangePhone}
            required={true}
            ref={phoneNumberInput}
            style={{ color: "#adadad" }}
            autoFocus={true}
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
        <InputWrapper>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={onChangePassword}
            required={true}
            autoFocus={true}
            ref={passwordInput}
          />
          <span></span>
          <label onClick={() => passwordInput.current.focus()}>
            {passwordError.validate ? (
              <div className="error">비밀번호를 다시 확인해주세요</div>
            ) : (
              "비밀번호를 입력해주세요"
            )}
          </label>
          <PasswordBadge onClick={onShowPassword} className="cursor_pointer">
            {showPassword ? <BiHide /> : <BiShow />}
          </PasswordBadge>
        </InputWrapper>

        <button
          type="submit"
          id={submitButton && "active"}
          disabled={!submitButton && true}
        >
          {!loading && "로그인"}
          <BeatLoader color="#ffffff" size={10} margin={5} loading={loading} />
        </button>
      </Form>
    </Container>
  );
};

export default withRouter(SigninPage);
