import { Form, InputWrapper } from "../../styled";
import BeatLoader from "react-spinners/BeatLoader";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Container, Timer, ResendMessage } from "./styled";
import { withRouter } from "react-router-dom";
import useInterval from "../../../../hooks/useInterval";

const AuthNumberPage = ({ name, phoneNumber, history }) => {
  const authNumberInput = useRef();

  const [authNumber, setAuthNumber] = useState("");
  const [authNumberError, setAuthNumberError] = useState({ validate: false });

  const [loading, setLoading] = useState(false);
  const [submitButton, setSubmitButton] = useState(true);

  const [timer, setTimer] = useState(300);
  const [stopTimer, setStopTimer] = useState(false);
  const [showResendMessage, setShowResendMessage] = useState(false);
  const [showResendAlert, setShowResendAlert] = useState(false);
  const [showEndMessage, setShowEndMessage] = useState(false);

  const initTimer = useRef(180);

  useInterval(() => {
    initTimer.current -= 1;
    setTimer(timeFormat(initTimer.current));

    // 타이머가 2분 남았을 때
    if (initTimer.current <= 120) {
      setShowResendMessage(true);
    }

    // 타이머가 종료되었을 때
    if (initTimer.current <= 0) {
      setShowResendMessage(false);
      setShowEndMessage(true);
      disableForm();
    }
    console.log(initTimer.current);
  }, 1000);

  useEffect(() => {
    setTimer(timeFormat(initTimer.current));
  }, []);

  useEffect(() => {
    // 입력란이 비어있지 않으면 확인 버튼 활성화
    if (authNumber !== "") setSubmitButton(true);
    else setSubmitButton(false);
  }, [authNumber]);

  function resetForm() {
    setStopTimer(false);
    initTimer.current = 180;
    setTimer(timeFormat(initTimer.current));
    setShowResendMessage(false);
    setShowEndMessage(false);
    setAuthNumber("");
    setAuthNumberError({ validate: false });

    console.log("인증번호 재전송");
    console.log("name >> ", name, "\nphoneNumber >> ", phoneNumber);
  }

  const disableForm = () => {
    initTimer.current = 0;
    setTimer(timeFormat(initTimer.current));
    setSubmitButton(false);
    setAuthNumber("");
  };

  const timeFormat = (value) => {
    // 초를 분, 초 포맷으로 변경
    let min = parseInt(value / 60);
    min = min < 10 ? `0${min}` : `${min}`;
    let sec = value % 60;
    sec = sec < 10 ? `0${sec}` : `${sec}`;
    return `${min}:${sec}`;
  };

  const onChangeAuthNumber = (e) => {
    const regex = /[^0-9]/g;
    const value = e.target.value.replace(regex, "");
    if (value.length < 7) setAuthNumber(value);
  };

  // 휴대폰 인증 완료
  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name,
      phoneNumber,
      code: authNumber,
    };

    console.log("payload >> ", payload);
    setLoading(true);
    axios
      .post("http://localhost:8000/sms/code/check", payload)
      .then((res) => {
        console.log("res >> ", res);
        if (res.data.success) {
          console.log("휴대폰 인증 성공!");
          setAuthNumberError({ validate: false });
          // history.push("/");
        } else {
          console.log("휴대폰 인증 실패..");
          setAuthNumberError({ validate: true });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("err >> ", err);
        console.log(toString(err));
        setAuthNumberError({ validate: true });
        setLoading(false);
      });
  };

  const onClickResendCode = () => {
    // 폼 초기상태 초기화
    resetForm();
    setLoading(true);
    const payload = { phoneNumber };
    console.log("payload >> ", payload);

    axios
      .post("http://localhost:8000/sms/code/send", payload)
      .then(({ data }) => {
        if (data.success) {
          setLoading(false);
          setShowResendAlert(true);
          setTimeout(() => {
            setShowResendAlert(false);
          }, 2000);
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
        <h1>인증번호를 입력해주세요</h1>
        <InputWrapper>
          <input
            type="text"
            value={authNumber}
            onChange={onChangeAuthNumber}
            required={true}
            autoFocus={true}
            ref={authNumberInput}
            disabled={showEndMessage}
          />
          <span></span>
          <Timer>{timer}</Timer>
          <label onClick={() => authNumberInput.current.focus()}>
            {authNumberError.validate ? (
              <div className="error">인증번호를 다시 확인해주세요</div>
            ) : (
              "인증번호 입력"
            )}
          </label>
        </InputWrapper>
        {showResendMessage && (
          <div style={{ fontSize: "14px", color: "#adadad" }}>
            <strong>
              인증문자가 오지 않나요? &nbsp;
              <u
                style={{ color: "#000000" }}
                className="cursor_pointer"
                onClick={onClickResendCode}
              >
                인증번호 재전송
              </u>
            </strong>
          </div>
        )}
        {showEndMessage && (
          <div style={{ fontSize: "14px", color: "#adadad" }}>
            <strong>
              인증문자가 만료되었습니다.&nbsp;
              <u
                style={{ color: "#000000" }}
                className="cursor_pointer"
                onClick={onClickResendCode}
              >
                인증번호 재전송
              </u>
            </strong>
          </div>
        )}
        <button
          type="submit"
          id={submitButton && "active"}
          disabled={!submitButton && true}
        >
          {!loading && "확인"}
          <BeatLoader color="#ffffff" size={10} margin={5} loading={loading} />
        </button>
      </Form>
      <ResendMessage className={showResendAlert && "active"}>
        인증번호를 다시 보냈어요
      </ResendMessage>
    </Container>
  );
};

export default withRouter(AuthNumberPage);
