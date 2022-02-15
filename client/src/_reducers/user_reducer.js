import { SIGNUP_PROCESS_USER, AUTH_USER } from "../_actions/types.js";

const initialState = {
  isSignin: {
    success: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_PROCESS_USER:
      return { phoneNumber: action.payload };
    case AUTH_USER:
      return { ...state, isSignin: action.payload };
    default:
      return state;
  }
}
