import React, { useState, useEffect } from "react";
import "./sidebar.scss";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import TvIcon from "@material-ui/icons/Tv";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { filters } from "../../services/routes/filters"
import { getUserData } from "../../services/routes/userData"
import { auth } from "../../services/index"
import { useHistory } from "react-router-dom";

function Sidebar() {
  const history = useHistory();

  const [showDiv, setShowDiv] = useState(false);
  const [genres, setGenere] = useState([]);
  const [type, setType] = useState({
    movie: false,
    show: false
  });
  const [ratingMin, setRatingMin] = useState(null)
  const [ratingMax, setRatingMax] = useState(null)
  const [releaseYearFrom, setReleaseYearFrom] = useState(null)
  const [releaseYearTo, setReleaseYearTo] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  const filterMovies = async () => {
    setShowDiv(!showDiv)

    let sendType = type.movie === true ? "movie" : type.show === true ? "show" : null
    let sendGenres = genres.length !== 0 ? genres : null
    let sendRatingMin = ratingMin !== "" ? ratingMin : null
    let sendRatingMax = ratingMax !== "" ? ratingMax : null
    let sendReleaseYearFrom = releaseYearFrom !== "" ? releaseYearFrom : null
    let sendReleaseYearTo = releaseYearTo !== "" ? releaseYearTo : null

    const response = await filters.filter(sendType, sendGenres, sendRatingMin, sendRatingMax, sendReleaseYearFrom, sendReleaseYearTo);
    let data = {};
    data.title = "Filtered Movies & Shows."
    data.items = response
    history.push("/movieList", data);

    setGenere([])
    setType({
      movie: false,
      show: false
    })
    setRatingMin(null)
    setRatingMax(null)
    setReleaseYearFrom(null)
    setReleaseYearTo(null)
  }

  const fetchProperty = async property => {
    const userId = auth.getUserId();

    if (userId !== "User not logged In.") {
      const response = await getUserData.getByProperty(userId, property)
      if (response.status === 200) {
        let data = {};
        let title = property === "watch_later" ? "Watch Later" : property === "favorite" ? "Favorite" : property === "like" ? "Liked" : property === "completed" ? "Completed" : "List Of"
        data.title = `${title} Movies & Shows`
        data.items = response.message
        history.push("/movieList", data);
      }
    }
  }


  const handleCheckBox = event => {
    if (genres.includes(event.target.value)) {
      const genresArray = genres.filter(x => x !== event.target.value);
      setGenere(genresArray);
    }
    else if (!genres.includes(event.target.value)) {
      const genresArray = genres;
      genresArray.push(event.target.value);
      setGenere(genresArray);
    }
  }

  const handleType = event => {
    let newType = Object.assign({}, type);
    newType[event.target.value] = !newType[event.target.value]
    setType(newType)
  }

  const ratingMinHandler = event => {
    setRatingMin(event.target.value);
  }
  const ratingMaxHandler = event => {
    setRatingMax(event.target.value);
  }

  const relYearFromHandler = event => {
    setReleaseYearFrom(event.target.value);
  }
  const relYearToHandler = event => {
    setReleaseYearTo(event.target.value);
  }
  useEffect(() => {
    setIsLoggedIn(auth.getAuthenticated())
  }, []);

  return (
    <div className="sidebar">
      <div className="container">
        <div>
          {showDiv ? (
            <div className="sideDiv">
              <div className="option_container">
                <div className="rating">
                  <div className="input_rating">
                    <p>Rating</p>
                    <p>from</p>
                    <input type="text" onChange={ratingMinHandler} />
                    <p>to</p>
                    <input type="text" onChange={ratingMaxHandler} />
                  </div>
                </div>
                <div className="rating">
                  <div className="input_rating">
                    <p>Relese year</p>
                    <p>from</p>
                    <input type="text" onChange={relYearFromHandler} />
                    <p>to</p>
                    <input type="text" onChange={relYearToHandler} />
                  </div>
                </div>

                <hr />
                <div className="movies_series">
                  <div className="option">
                    <input type="checkbox" onChange={handleType} value="movie" />
                    <option>Movies</option>
                    <input type="checkbox" onChange={handleType} value="show" />
                    <option>Series</option>
                  </div>
                </div>
                <hr />
                <div className="option">
                  <input type="checkbox" onChange={handleCheckBox} value="act" />
                  <option>Action & Adventure</option>
                </div>
                <div className="option">
                  <input type="checkbox" onChange={handleCheckBox} value="cmy" />
                  <option>Comedy</option>
                </div>
                <div className="option">
                  <input type="checkbox" onChange={handleCheckBox} value="crm" />
                  <option>Crime</option>
                </div>
                <div className="option">
                  <input type="checkbox" onChange={handleCheckBox} value="fnt" />
                  <option>Fantasy</option>
                </div>
                <div className="option">
                  <input type="checkbox" onChange={handleCheckBox} value="hst" />
                  <option>Historical</option>
                </div>
                <div className="option">
                  <input type="checkbox" onChange={handleCheckBox} value="hrr" />
                  <option>Horror</option>
                </div>
                <div className="option">
                  <input type="checkbox" onChange={handleCheckBox} value="rma" />
                  <option>Romance</option>
                </div>
                <div className="option">
                  <input type="checkbox" onChange={handleCheckBox} value="scf" />
                  <option>Sci-fi</option>
                </div>
                <div className="option">
                  <input type="checkbox" onChange={handleCheckBox} value="trl" />
                  <option>Thriller</option>
                </div>
                <div className="option">
                  <input type="checkbox" onChange={handleCheckBox} value="wsn" />
                  <option>Western</option>
                </div>
                <div className="option">
                  <input type="checkbox" onChange={handleCheckBox} value="ani" />
                  <option>Animation</option>
                </div>
                <div className="option">
                  <input type="checkbox" onChange={handleCheckBox} value="drm" />
                  <option>Drama</option>
                </div>
                <div className="option">
                  <input type="checkbox" onChange={handleCheckBox} value="doc" />
                  <option>Documentary</option>
                </div>

                <button className="option_button" onClick={() => filterMovies()}>Submit</button>

              </div>
            </div>
          ) : null}
        </div>
        <div>
          <SideNav className="sideNav">
            {
              !isLoggedIn ? null :
                <div>
                  <div><SideNav.Nav className="icon" eventkey="home">
                    {/* -------------- Filter -------------- */}

                    <NavItem onClick={() => setShowDiv(!showDiv)} eventkey="home">
                      <NavIcon>
                        <TvIcon />
                      </NavIcon>

                      <NavText>Filter</NavText>
                    </NavItem>
                    {/* ---------------------------- */}
                  </SideNav.Nav>

                    <SideNav.Nav>
                      {/* -------------- Pozitivno ocijenjeno -------------- */}
                      <NavItem eventkey="home">
                        <NavIcon>
                          <ThumbUpAltIcon onClick={() => fetchProperty("like")} />
                        </NavIcon>
                        <NavText>Pozitivno ocjenjeno</NavText>
                      </NavItem>
                    </SideNav.Nav>
                    <SideNav.Nav>
                      {/* -------------- Gledati kasnije -------------- */}
                      <NavItem eventkey="home">
                        <NavIcon>
                          <AccessTimeIcon onClick={() => fetchProperty("watch_later")} />
                        </NavIcon>
                        <NavText >Gledati Kasnije</NavText>
                      </NavItem>
                    </SideNav.Nav>
                    <SideNav.Nav>
                      {/* -------------- Gledati kasnije -------------- */}
                      <NavItem eventkey="home">
                        <NavIcon>
                          <WatchLaterIcon
                            onClick={() => fetchProperty("completed")}
                          />
                        </NavIcon>
                        <NavText>Pogledano</NavText>
                      </NavItem>
                    </SideNav.Nav>
                    <SideNav.Nav>
                      {/* -------------- Omiljeno -------------- */}
                      <NavItem eventkey="home">
                        <NavIcon>
                          <FavoriteIcon onClick={() => fetchProperty("favorite")} />
                        </NavIcon >
                        <NavText >Omiljeno</NavText>
                      </NavItem>
                    </SideNav.Nav></div>
                </div>
            }

          </SideNav>
        </div>
      </div>
    </div >
  );
}

export default Sidebar;
