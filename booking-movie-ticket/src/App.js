import { createBrowserHistory } from "history";
import { Switch } from "react-router-dom";
import "./App.css";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import { Home } from "./pages/Home/Home";
import { Contact } from "./pages/Contact/Contact";
import { News } from "./pages/News/News";
import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";
import { MovieDetail } from "./pages/Detail/MovieDetail";
import TabCheckout, { Checkout } from "./pages/Checkout/Checkout";

import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
export const history = createBrowserHistory();

function App() {
  return (
    <Switch history={history}>
      <HomeTemplate exact path="/" Component={Home} />
      <HomeTemplate exact path="/contact" Component={Contact} />
      <HomeTemplate exact path="/news" Component={News} />
      <HomeTemplate exact path="/detail-movie/:id" Component={MovieDetail} />
      <UserTemplate exact path="/login" Component={Login} />
      <UserTemplate exact path="/register" Component={Register} />
      <HomeTemplate exact path="/home" Component={Home} />
      <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />
    </Switch>
  );
}

export default App;
