import { withRouter } from "react-router-dom";
import axios from "axios";
import { Container, SettingCommonSection } from "../../styled";
import { useState } from "react";

export const UpdatePasswordPage = ({ history }) => {
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

  const onSubmitUpdatePassword = () => {
    // 유효성 검사를 통과하지 못했을 때
    if (!totalValidate()) return;

    setLoading(true);

    axios
      .patch("/user/password", { password })
      .then((res) => {
        console.log("res >> ", res);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err >> ", err);
        setLoading(false);
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
        <label>현재 비밀번호</label>
        <input type="password" />
        <label>변경할 비밀번호</label>
        <input type="password" />
        <label>변경할 비밀번호 확인</label>
        <input type="password" />
        <button>비밀번호 변경</button>
      </SettingCommonSection>
    </Container>
  );
};

export default withRouter(UpdatePasswordPage);
