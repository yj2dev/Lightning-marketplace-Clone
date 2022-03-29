import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from "./_reducers";
import dotenv from "dotenv";
import { CookiesProvider } from "react-cookie";
import axios from "axios";
dotenv.config();

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://api.log1999.com:8000";
// axios.defaults.baseURL = "https://localhost:8000";

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider
        store={createStoreWithMiddleware(
          Reducer,
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )}
      >
        <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
