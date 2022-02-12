import {
  SIGNUP_USER,
  SIGNUP_PROCESS_USER,
  SIGNIN_USER,
  AUTH_USER,
} from "../_actions/types.js";

const initialState = {
  authStatus: {
    isAuth: false,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_USER:
      return { ...state, signupSuccess: action.payload };
    case SIGNUP_PROCESS_USER:
      return { ...state, phoneNumber: action.payload };
    case SIGNIN_USER:
      return { ...state, signinSuccess: action.payload };
    case AUTH_USER:
      return { ...state, authStatus: action.payload };
    default:
      return state;
  }
}
