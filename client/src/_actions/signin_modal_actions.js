import { SHOW_SIGNIN_MODAL, CLOSE_SIGNIN_MODAL } from "./types";

export function showSigninModal() {
  return {
    type: SHOW_SIGNIN_MODAL,
  };
}

export function closeSigninModal() {
  return {
    type: CLOSE_SIGNIN_MODAL,
  };
}
