import axios from "axios";
import { SIGNUP_PROCESS_STORE, AUTH_STORE } from "./types";

// 로그인, 회원가입 중 입력 데이터 임시 저장
export function signupProcessUser(data) {
  return {
    type: SIGNUP_PROCESS_STORE,
    payload: data,
  };
}

// 로그인 후 유저 인증 정보 불러오기
export function authUser() {
  const request = axios
    .get("/store/auth", { withCredentials: true })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {});

  return {
    type: AUTH_STORE,
    payload: request,
  };
}
