import { Container } from "./styled";
import axios from "axios";

// 새로운 페이지 생성시 기본 구조
export const DevPage = () => {
  // 계정 생성 요청
  // 휴대폰번호로 인증코드를 보내는 로직
  const onClickCreateUser = () => {
    axios
      .post("/user/signup", {
        phoneNumber: "",
        password: "",
      })
      .then((res) => {
        // 회원가입 성공
        if (res.data.success && res.data.data) {
        }
      })
      .catch((err) => {
        console.error("err >> ", err);
      });
  };
  return (
    <Container>
      <h3>DevPage</h3>
      <button onClick={onClickCreateUser}>회원가입</button>
    </Container>
  );
};

export default DevPage;
