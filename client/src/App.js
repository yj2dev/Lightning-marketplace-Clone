import "./App.css";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import MainPage from "./layouts";
import Auth from "./hoc/Auth";
import Layout from "./layouts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Route exact path="/" component={Auth(Layout)} />
        <Route path="/:page" component={Layout} />
      </BrowserRouter>
    </>
  );
}

export default App;
