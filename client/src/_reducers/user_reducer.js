import { SIGNUP_PROCESS_USER, AUTH_USER } from "../_actions/types.js";

const initialState = {
  isSignin: {
    success: false,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_PROCESS_USER:
      return { phoneNumber: action.payload };
    case AUTH_USER:
      return { isSignin: action.payload };
    default:
      return state;
  }
}
