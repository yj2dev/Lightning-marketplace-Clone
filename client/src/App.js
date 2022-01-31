import "./App.css";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import MainPage from "./layouts";
import CertificationPage from "./page/CertificationPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Route path="/" exact component={MainPage} />
        <Route path="/:page" component={MainPage} />
        <Route path="/certification" component={CertificationPage} />
      </BrowserRouter>
    </>
  );
}

export default App;
