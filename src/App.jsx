import { useState, useEffect } from "react";
import "./app.scss";
import Home from "../src/components/pages/home/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(auth.getAuthenticated());
  }, []);

  return (
    <div className="app_wrapper">
      <BrowserRouter>
        <div className="App" type="movie">
          <Navbar isLoggedId={isLoggedIn} />
          <Sidebar isLoggedId={isLoggedIn} />
          <Switch>
            <Route path="/" isLoggedId={isLoggedIn} exact component={Home}></Route>
            <Route path="/register" setIsLoggedIn={setIsLoggedIn} exact component={Register}></Route>
            <Route path="/login" setIsLoggedIn={setIsLoggedIn} exact component={Login}></Route>
            <Route path="/profile" exact component={Profile}></Route>
            <Route path="/movie" exact component={Movie}></Route>
            <Route path="/movieList" exact component={MovieList}></Route>
            <Route path="/serie" exact component={Serie}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
