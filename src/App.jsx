import "./app.scss";
import Home from "../src/components/pages/home/Home";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Register from "../src/components/pages/register/Register";
import Login from "../src/components/pages/login/Login";
import Profile from "./components/pages/profile/Profile";
import Navbar from "./components/navbar/Navbar";
import Movie from "../src/components/pages/movie/Movie";
import MovieList from "./components/pages/movieList/MovieList";
import Sidebar from "./components/sidebar/Sidebar";
import Serie from "./components/pages/serie/Serie";
import { auth } from "./services/index"

function App() {


  const PrivateRoute = ({ component: Component }) => {

    const isLoggedIn = auth.getAuthenticated()

    return (
      <Route
        render={() =>
          isLoggedIn ? (
            <Component />
          ) : (
            <Redirect to={{ pathname: '/login' }} />
          )
        }
      />
    )
  }


  return (
    <div className="app_wrapper">
      <BrowserRouter>
        <div className="App" type="movie">
          <Navbar />
          <Sidebar />
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/login" exact component={Login}></Route>
            <PrivateRoute path="/profile" component={<Route path="/profile" exact component={Profile} ></Route>} />
            <PrivateRoute path="/movie" component={<Route path="/movie" exact component={Movie} ></Route>} />
            <PrivateRoute path="/movieList" component={<Route path="/movieList" exact component={MovieList} ></Route>} />
            <PrivateRoute path="/serie" component={<Route path="/serie" exact component={Serie} ></Route>} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
