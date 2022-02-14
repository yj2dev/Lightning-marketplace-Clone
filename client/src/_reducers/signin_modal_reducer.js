import { SHOW_SIGNIN_MODAL, CLOSE_SIGNIN_MODAL } from "../_actions/types.js";

const initialState = {
  show: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_SIGNIN_MODAL:
      return { show: true };
    case CLOSE_SIGNIN_MODAL:
      return { show: false };
    default:
      return state;
  }
}
