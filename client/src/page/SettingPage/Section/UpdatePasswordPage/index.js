import { withRouter } from "react-router-dom";
import axios from "axios";
import { Container, SettingCommonSection } from "../../styled";
import React, { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import AlertModal from "../../../../components/AlertModal";
import { BiHide, BiShow } from "react-icons/bi";

export const UpdatePasswordPage = ({ history }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState({
    validate: false,
  });

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState({ validate: false });
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState({
    incorrect: false,
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onCloseSuccessModal = () => {
    setShowSuccessModal(false);
    history.push("/");
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
      setPasswordCheckError({ incorrect: true });
    } else {
      // 일치하면
      setPasswordCheckError({ incorrect: false });
    }

    return result;
  };

  const onSubmitUpdatePassword = () => {
    // 유효성 검사를 통과하지 못했을 때
    if (!totalValidate()) return;

    setLoading(true);

    console.log("currentPassword >> ", currentPassword);
    console.log("password >> ", password);

    axios
      .patch("/user/password", { currentPassword, password })
      .then((res) => {
        console.log("res >> ", res);
        setLoading(false);

        // 비밀번호 변경 성공
        if (res.data.success) {
          setCurrentPassword("");
          setPassword("");
          setPasswordCheck("");
          setShowSuccessModal(true);
        }
      })
      .catch((err) => {
        console.log("err >> ", err);
        setLoading(false);
        setCurrentPasswordError({ validate: true });
      });
  };

  return (
    <Container>
      <div>
        <p style={{ textAlign: "center" }}>
          <strong>[ 비밀번호 생성규칙 ]</strong>
        </p>
        <p>
          - 최소<span style={{ color: "red" }}>8글자</span>
          에서 최대 <span style={{ color: "red" }}>16글자</span>까지 입력할 수
          있습니다.
        </p>
        <p>
          - <u>영문자</u>, <u>숫자</u>, <u>특수기호</u>, 는 반드시&nbsp;
          <span style={{ color: "red" }}>1개</span>
          이상 입력돼야 합니다.
        </p>
      </div>
      <SettingCommonSection>
        {/* Current Password Input Section */}
        {currentPasswordError.validate ? (
          <label style={{ color: "red" }}>
            현재 비밀번호가 일치하지 않습니다.
          </label>
        ) : (
          <label>현재 비밀번호</label>
        )}{" "}
        <div className="input_wrapper">
          <input
            type={showCurrentPassword ? "text" : "password"}
            value={currentPassword}
            placeholder="현재 비밀번호를 입력해주세요."
            onChange={(e) => setCurrentPassword(e.target.value)}
          />{" "}
          <span
            className="toggle_hidden_and_show"
            onClick={() => setShowCurrentPassword((prev) => !prev)}
          >
            {showCurrentPassword ? <BiHide /> : <BiShow />}
          </span>
        </div>
        {/* End Current Password Input Section */}
        {/* Password Input Section */}
        {passwordError.validate ? (
          <label style={{ color: "red" }}>
            비밀번호 생성규칙과 일치하지 않습니다.
          </label>
        ) : (
          <label>변경할 비밀번호</label>
        )}
        <div className="input_wrapper">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={onChangePassword}
            placeholder="변경할 비밀번호를 입력해주세요."
          />
          <span
            className="toggle_hidden_and_show"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <BiHide /> : <BiShow />}
          </span>
        </div>
        {/* End Password Input Section */}
        {/* Check Password Input Section */}
        {passwordCheckError.incorrect ? (
          <label style={{ color: "red" }}>
            변경할 비밀번호가 일치하지 않습니다.
          </label>
        ) : (
          <label>변경할 비밀번호 확인</label>
        )}
        <div className="input_wrapper">
          <input
            type={showPasswordCheck ? "text" : "password"}
            value={passwordCheck}
            placeholder="변경할 비밀번호를 한번 더 입력해주세요."
            onChange={onChangePasswordCheck}
          />
          <span
            className="toggle_hidden_and_show"
            onClick={() => setShowPasswordCheck((prev) => !prev)}
          >
            {showPasswordCheck ? <BiHide /> : <BiShow />}
          </span>
        </div>
        {/* End Check Password Input Section */}
        <button onClick={onSubmitUpdatePassword} disabled={loading}>
          {!loading && "비밀번호 변경"}
          <BeatLoader color="#ffffff" size={10} margin={5} loading={loading} />
        </button>
      </SettingCommonSection>
      <AlertModal
        show={showSuccessModal}
        close={onCloseSuccessModal}
        confirm={onCloseSuccessModal}
        useCancelButton={false}
      >
        비밀번호 변경에 성공했습니다. <br /> 비밀번호 확인을 위해 재로그인
        해주세요.
      </AlertModal>
    </Container>
  );
};

export default withRouter(UpdatePasswordPage);
