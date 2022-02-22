import "./App.css";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import MainPage from "./layouts";
import Auth from "./hoc/Auth";
import Layout from "./layouts";
import DevPage from "./page/DevPage";
import React from "react";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* 개발전용 페이지 */}
        <Route exact path="/" component={Auth(Layout)} />
        <Route path="/:page" component={Layout} />
        <Redirect from="*" to="/"></Redirect>
      </BrowserRouter>
    </>
  );
}

export default App;
