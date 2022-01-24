import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Main from "./views/Main";

function App() {
  return (
    <>
      <BrowserRouter>
        <Route path="/" exact component={Main} />
      </BrowserRouter>
    </>
  );
}

export default App;
