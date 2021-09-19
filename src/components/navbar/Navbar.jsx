import { useState, useEffect } from "react"
import { ArrowDropDown } from "@material-ui/icons";
import "./navbar.scss";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Logo from "../../images/naslov.png";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { auth } from "../../services/index"
import { fetch } from "../../services/routes/baseCalls"
import Select from 'react-select'
import { Redirect, Route } from "react-router-dom";
import Movie from "../pages/movie/Movie";
import Serie from "../pages/serie/Serie";
import { useHistory } from "react-router";

const Navbar = () => {
  const history = useHistory()
  const [searchTerm, setSearchTerm] = useState("")
  const [searchList, setSearchList] = useState([])
  const [searchData, setSearchData] = useState([])

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

  const customStyles = {
    control: (base, state) => ({

      ...base,
      backgroundColor: "transparent",
      fontFamily: 'Times New Roman',
      fontSize: 18,
      border: "1px solid white",
      boxShadow: state.isFocused ? 0 : 0,
      cursor: 'text',
      borderRadius: 0,

    }),

    option: (styles, { isFocused }) => {
      return {
        ...styles,
        cursor: 'pointer',
        backgroundColor: isFocused ? '#272626' : '#272626',
        color: 'white',
        lineHeight: 2,

      }
    },

    input: styles => ({
      ...styles,
      color: 'white',
      fontFamily: 'Times New Roman, Times, Serif',

    }),

    menu: styles => ({
      ...styles,
      marginTop: 0,
      boxShadow: 'none',
      borderRadius: 0,
    }),

    singleValue: styles => ({
      ...styles,
      color: 'black',
    }),
  }

  const logout = () => {
    auth.logout()
    window.location.reload();
  }

  const handleSearchCall = idTitle => {
    if (idTitle.type === "movie") {
      history.push("/movie", { location: { data: { id: idTitle.value, type: idTitle.type } } })
    }
    else if (idTitle.type === "show") {
      history.push("/serie", { location: { data: { id: idTitle.value, type: idTitle.type } } })
    }
  }
  const handleSearch = value => {
    setSearchTerm(value)
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      let list = await fetch.search(searchTerm)
      setSearchData(list.message)
      let valueList = list.message.map(x => {
        return {
          value: x.id,
          label: x.title,
          type: x.object_type
        }
      })
      setSearchList(valueList)
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
          <Select className="searchField" onInputChange={handleSearch} options={searchList}
            onChange={(e) => handleSearchCall(e)} styles={customStyles} />
        </div>
        <div className="right">
          <ConditionalLink />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <Button className="button" component={Link} to="/login">
                Login
              </Button>
              <hr />
              <Button className="button" component={Link} to="/register">
                Register
              </Button>
              <hr />
              <Button className="button" onClick={logout}>Logout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
