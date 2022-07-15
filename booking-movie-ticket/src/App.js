import { createBrowserHistory } from "history";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import { Home } from "./pages/Home/Home";
import { Contact } from "./pages/Contact/Contact";
import { News } from "./pages/News/News";
import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";
import { MovieDetail } from "./pages/Detail/MovieDetail";
import { Checkout } from "./pages/Checkout/Checkout";

import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Movies from "./pages/Admin/Movies/Movies";
import AddNew from "./pages/Admin/Movies/AddNew";
import ShowTime from "./pages/Admin/Showtime/Showtime";
import Edit from "./pages/Admin/Movies/Edit";
export const history = createBrowserHistory();

function App() {
  return (
    <Switch history={history}>
      <HomeTemplate exact path="/" Component={Home} />
      <HomeTemplate exact path="/contact" Component={Contact} />
      <HomeTemplate exact path="/news" Component={News} />
      <HomeTemplate exact path="/movie-detail/:id" Component={MovieDetail} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <HomeTemplate exact path="/home" Component={Home} />
      <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />
      <AdminTemplate path="/admin" exact Component={Dashboard} />
      <AdminTemplate path="/admin/movies" exact Component={Movies} />
      <AdminTemplate path="/admin/movies/add-new" exact Component={AddNew} />
      <AdminTemplate
        path="/admin/movies/showtime/:id/:movieName"
        exact
        Component={ShowTime}
      />
      <AdminTemplate path="/admin/movies/update/:id" exact Component={Edit} />
    </Switch>
  );
}

export default App;
