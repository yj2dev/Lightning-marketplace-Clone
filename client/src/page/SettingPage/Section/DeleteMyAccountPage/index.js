import { Container, SettingCommonSection } from "../../styled";
import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import AlertModal from "../../../../components/AlertModal";
import BeatLoader from "react-spinners/BeatLoader";

export const DeleteMyAccountPage = ({ history }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState({
    validate: false,
    incorrect: false,
  });
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState({
    validate: false,
    incorrect: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onCloseSuccessModal = () => {
    setShowSuccessModal(false);
    history.push("/");
  };

  const onChangePhoneNumber = (e) => {
    const regex = /[^0-9]/g;
    const value = e.target.value.replace(regex, "");
    if (value.length < 12) setPhoneNumber(value);
  };

  const onChangePassword = (e) => {
    // 최대 24글자 길이 제한 (비밀번호 생성시에는 16글자까지 가능)
    if (e.target.value.length < 24) setPassword(e.target.value);
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

  const resetError = () => {
    setPhoneNumberError({ validate: false, incorrect: false });
    setPasswordError({ validate: false, incorrect: false });
  };

  const onSubmitDeleteMyAccount = () => {
    // 유효성 검사를 통과하지 못했을 때
    if (!totalValidate()) return;

    setLoading(true);

    axios
      .delete("/user/account", {
        data: {
          phoneNumber,
          password,
        },
      })
      .then((res) => {
        setLoading(false);

        // 회원탈퇴 성공
        if (res.data.success) {
          resetError();
          setShowSuccessModal(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        setPhoneNumberError({ incorrect: true });
        setPasswordError({ incorrect: true });
        console.error("err >> ", err);
      });
  };
  return (
    <Container>
      <div>
        <p style={{ textAlign: "center" }}>
          <strong>[ 회원탈퇴 주의사항 ]</strong>
        </p>
        <p>- 상점명 변경 및 휴대폰번호 변경은 내정보 수정에서 가능합니다.</p>
        <p>
          - 탈퇴 시 계정의 모든 정보는 삭제되며 재가입시에도
          <span style={{ color: "red" }}> 복구되지 않습니다.</span>
        </p>
      </div>
      <SettingCommonSection>
        {/* PhoneNumber Input Section*/}

        {phoneNumberError.validate ? (
          <label style={{ color: "red" }}>휴대번호가 일치하지 않습니다.</label>
        ) : (
          <>
            {phoneNumberError.incorrect ? (
              <label style={{ color: "red" }}>
                휴대번호와 비밀번호를 다시 한번 확인해주세요.
              </label>
            ) : (
              <label>휴대번호</label>
            )}
          </>
        )}
        <input
          type="text"
          value={phoneNumber}
          onChange={onChangePhoneNumber}
          placeholder="현재 로그인된 계정의 휴대번호를 입력해주세요."
        />
        {/* End PhoneNumber Input Section*/}

        {/* Password Input Section*/}

        {passwordError.validate ? (
          <label style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</label>
        ) : (
          <>
            {passwordError.incorrect ? (
              <label style={{ color: "red" }}>
                휴대번호와 비밀번호를 다시 한번 확인해주세요.
              </label>
            ) : (
              <label>비밀번호</label>
            )}
          </>
        )}
        <div className="input_wrapper">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={onChangePassword}
            placeholder="비밀번호를 입력해주세요."
          />
          <span
            className="toggle_hidden_and_show"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <BiHide /> : <BiShow />}
          </span>
        </div>
        {/* End Password Input Section*/}
        <button onClick={onSubmitDeleteMyAccount} disabled={loading}>
          {!loading && "회원탈퇴"}
          <BeatLoader color="#ffffff" size={10} margin={5} loading={loading} />
        </button>
      </SettingCommonSection>
      <AlertModal
        show={showSuccessModal}
        close={onCloseSuccessModal}
        confirm={onCloseSuccessModal}
        useCancelButton={false}
      >
        회원탈퇴를 성공했습니다. <br /> 그동안 이용해주셔서 감사합니다.
      </AlertModal>
    </Container>
  );
};

export default withRouter(DeleteMyAccountPage);
