import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useState } from "react";
import "./navbar.scss";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Logo from "../../images/naslov.png";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const Navbar = ({ isLoggedId }) => {

  const ConditionalLink = (isLoggedIn) => {
    if (isLoggedIn === true) {

      console.log(isLoggedIn)

      return <Link to="/profile">
        <AccountCircleIcon className="icon" />
      </Link>
    }
    else {
      return <Link to="/register">
        <AccountCircleIcon className="icon" />
      </Link>
    }
  }

  return (
    <div className="navbar">
      <div className="container">
        <div className="left">
          <Link to="/">
            <img className="logo" src={Logo} alt="" />
          </Link>

          <input className="searchField" type="text" />
        </div>
        <div className="right">
          <Notifications className="icon" />

          <ConditionalLink isLoggedIn={isLoggedId} />

          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <Button className="button" component={Link} to="/login">
                Prijavi se
              </Button>
              <hr />
              <Button className="button" component={Link} to="/register">
                Registriraj se
              </Button>
              <hr />
              <Button className="button">Odjavi se</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
