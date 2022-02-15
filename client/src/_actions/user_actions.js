import axios from "axios";
import { SIGNUP_PROCESS_USER, AUTH_USER } from "./types";

// 로그인, 회원가입 중 입력 데이터 임시 저장
export function signupProcessUser(data) {
  return {
    type: SIGNUP_PROCESS_USER,
    payload: data,
  };
}

// 로그인 후 유저 인증 정보 불러오기
export function authUser() {
  const request = axios
    .get("/user/auth", { withCredentials: true })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {});

  return {
    type: AUTH_USER,
    payload: request,
  };
}
