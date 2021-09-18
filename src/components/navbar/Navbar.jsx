import { useState, useEffect } from "react"
import { ArrowDropDown } from "@material-ui/icons";
import "./navbar.scss";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Logo from "../../images/naslov.png";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { auth } from "../../services/index"
import { fetch } from "../../services/routes/baseCalls"

const Navbar = () => {

  const [searchTerm, setSearchTerm] = useState("")
  const [searchList, setSearchList] = useState([])

  const ConditionalLink = () => {
    const isLoggedIn = auth.getAuthenticated();
    if (isLoggedIn) {
      return <Link to="/profile">
        <AccountCircleIcon className="icon" />
      </Link>
    }
    else {
      return <Link to="/login">
        <AccountCircleIcon className="icon" />
      </Link>
    }
  }
  const logout = () => {
    auth.logout()
    window.location.reload();
  }


  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      console.log(searchTerm)
      setSearchList(await fetch.search(searchTerm))
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  return (
    <div className="navbar">
      <div className="container">
        <div className="left">
          <Link to="/">
            <img className="logo" src={Logo} alt="" />
          </Link>

          <input className="searchField" type="text" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="right">
          <ConditionalLink />
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
              <Button className="button" onClick={logout}>Odjavi se</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
