import { Form, InputWrapper, PasswordCreateRules } from "../../styled";
import BeatLoader from "react-spinners/BeatLoader";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { BiHide, BiShow } from "react-icons/bi";
import { PasswordBadge } from "./styled";
import { useHistory, withRouter } from "react-router-dom";

const UserPasswordPage = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const passwordInput = useRef();
  const passwordCheckInput = useRef();

  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState({ validate: false });

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState({
    wrong: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const [submitButton, setSubmitButton] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 유저 정보(휴대번호)가 없으면 해당페이지 접근 불가능
    if (!user.phoneNumber) {
      alert("접근 불가능");
      history.push("/");
    }
  }, []);

  useEffect(() => {
    // 각각의 입력란이 비어있지 않으면 확인(다음) 버튼 활성화
    if (password !== "") setSubmitButton(true);
    else setSubmitButton(false);
  }, [password]);

  const onShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onShowPasswordCheck = () => {
    setShowPasswordCheck((prev) => !prev);
  };

  const onChangePasswordCheck = (e) => {
    // 비밀번호가 16자리를 넘어가면 입력 불가능
    if (e.target.value.length > 16) return;
    setPasswordCheck(e.target.value);
  };

  const onChangePassword = (e) => {
    // 영어 알파벳, 숫자, 특수기호 반드시 1개 이상 입력
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/;

    console.log("regex test >> ", regex.test(e.target.value));

    // 비밀번호가 16자리를 넘어가면 입력 불가능
    if (e.target.value.length > 16) return;
    setPassword(e.target.value);
  };

  const totalValidate = () => {
    // 모든 유효성 검사에 이상 없으면 true 반환
    let result = true;

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/;

    // 비밀번호 생성규칙에 맞게 작성되었는지 확인
    if (!passwordRegex.test(password)) {
      // 비밀번호 생성규칙에 일치하지 않을 때
      result = false;
      setPasswordError({ validate: true });
    } else {
      // 비밀번호 생성규칙에 일치할 때
      setPasswordError({ validate: false });
    }

    // 비밀번호와 비밀번호확인이 일치하는지 확인
    if (password !== passwordCheck) {
      // 일치하지 않으면
      result = false;
      setPasswordCheckError({ wrong: true });
    } else {
      // 일치하면
      setPasswordCheckError({ wrong: false });
    }

    return result;
  };

  // 휴대폰번호로 회원가입 시도
  const onSubmitSendCode = (e) => {
    e.preventDefault();

    // 유효성 검사를 통과하지 못했을 때
    if (!totalValidate()) return;

    const payload = {
      phoneNumber: user.phoneNumber,
      password,
    };

    setLoading(true);

    console.log(payload);
    axios
      .post("/user/signup", payload)
      .then((res) => {
        setLoading(false);
        if (res.data.success && res.data.data) {
          // 회원가입 성공
          history.push("/");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("err >> ", err);
      });
  };

  return (
    <>
      <Form onSubmit={onSubmitSendCode}>
        <h1>
          나만의 상점을 <br /> 만들어 볼까요?
        </h1>
        <InputWrapper>
          <input type="text" value={phoneNumber} style={{ color: "#adadad" }} />
          <span></span>
          <label>휴대폰번호</label>
        </InputWrapper>

        <InputWrapper>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={onChangePassword}
            required={true}
            ref={passwordInput}
          />
          <span></span>
          <label onClick={() => passwordInput.current.focus()}>
            {passwordError.validate ? (
              <div className="error">
                비밀번호 생성규칙과 일치하지 않습니다.
              </div>
            ) : (
              "비밀번호"
            )}
          </label>
          <PasswordBadge onClick={onShowPassword} className="cursor_pointer">
            {showPassword ? <BiHide /> : <BiShow />}
          </PasswordBadge>
        </InputWrapper>

        <InputWrapper>
          <input
            type={showPasswordCheck ? "text" : "password"}
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            required={true}
            ref={passwordCheckInput}
          />
          <span></span>
          <label onClick={() => passwordCheckInput.current.focus()}>
            {passwordCheckError.wrong ? (
              <div className="error">비밀번호가 일치하지 않습니다.</div>
            ) : (
              "비밀번호확인"
            )}
          </label>
          <PasswordBadge
            onClick={onShowPasswordCheck}
            className="cursor_pointer"
          >
            {showPasswordCheck ? <BiHide /> : <BiShow />}
          </PasswordBadge>
        </InputWrapper>

        <PasswordCreateRules>
          <span>*</span> 8~16자의 영문, 숫자, 특수문자 조합
        </PasswordCreateRules>
        <button
          type="submit"
          id={submitButton && "active"}
          disabled={!submitButton && true}
        >
          {!loading && "회원가입"}
          <BeatLoader color="#ffffff" size={10} margin={5} loading={loading} />
        </button>
      </Form>
    </>
  );
};

export default UserPasswordPage;
