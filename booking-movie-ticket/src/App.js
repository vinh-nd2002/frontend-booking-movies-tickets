import { createBrowserHistory } from "history";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { Home } from "./pages/Home/Home";
import { Contact } from "./pages/Contact/Contact";
import { News } from "./pages/News/News";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";

export const history = createBrowserHistory();
function App() {
  return (
    <Switch history={history}>
      <HomeTemplate exact path="/" Component={Home} />
      <HomeTemplate exact path="/contact" Component={Contact} />
      <HomeTemplate exact path="/news" Component={News} />
      <Route exact path="/login" Component={Login} />
      <Route exact path="/regiter" Component={Register} />
      <HomeTemplate exact path="/home" Component={Home} />
    </Switch>
  );
}

export default App;
