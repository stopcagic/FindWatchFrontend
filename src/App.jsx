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
import { fetch } from "./services/routes/baseCalls"
import { useEffect } from "react";

function App() {

  const requireAuth = () => {
    return auth.getAuthenticated()
  }

  const fetchUpdates = async () => {
    const userId = auth.getUserId()
    if (userId !== "User not logged In.") {
      await fetch.getUpdates(userId);
    }

  }

  useEffect(() => {
    fetchUpdates()
  }, []);
  return (
    <div className="app_wrapper">
      <BrowserRouter>
        <div className="App" type="movie">
          <Navbar />
          <Sidebar />
          <Switch>
            <Route path="/" exact component={Home} ></Route>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/profile" render={() => requireAuth() ? <Route exact component={Profile} /> : <Redirect to="/login" />}></Route>
            <Route path="/movie" render={() => requireAuth() ? <Route exact component={Movie} /> : <Redirect to="/login" />} ></Route>
            <Route path="/movieList" render={() => requireAuth() ? <Route exact component={MovieList} /> : <Redirect to="/login" />} ></Route>
            <Route path="/serie" render={() => requireAuth() ? <Route exact component={Serie} /> : <Redirect to="/login" />} ></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
