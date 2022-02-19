import { SIGNUP_PROCESS_STORE, AUTH_STORE } from "../_actions/types.js";

const initialState = {
  isSignin: {
    success: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_PROCESS_STORE:
      return { phoneNumber: action.payload };
    case AUTH_STORE:
      return { ...state, isSignin: action.payload };
    default:
      return state;
  }
}
