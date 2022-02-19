import { combineReducers } from "redux";
import store from "./store_reducer";
import signinModal from "./signin_modal_reducer";

const rootReducer = combineReducers({
  store,
  signinModal,
});

export default rootReducer;
