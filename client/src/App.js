import "./App.css";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import MainPage from "./layouts";
import Auth from "./hoc/Auth";

function App() {
  return (
    <>
      <BrowserRouter>
        <Route exact path="/" component={Auth(MainPage)} />
        <Route path="/:page" component={MainPage} />
      </BrowserRouter>
    </>
  );
}

export default App;
