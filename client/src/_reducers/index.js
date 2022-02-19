import { combineReducers } from "redux";
import user from "./user_reducer";
import signinModal from "./signin_modal_reducer";

const rootReducer = combineReducers({
  user,
  signinModal,
});

export default rootReducer;
