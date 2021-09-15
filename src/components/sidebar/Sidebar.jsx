import React, { useState } from "react";
import "./sidebar.scss";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import TvIcon from "@material-ui/icons/Tv";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { Link } from "react-router-dom";

function Sidebar() {
  const [showDiv, setShowDiv] = useState(false);

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
                    <input type="text" />
                    <p>to</p>
                    <input type="text" />
                  </div>
                </div>
                <div className="rating">
                  <div className="input_rating">
                    <p>Relese year</p>
                    <p>from</p>
                    <input type="text" />
                    <p>to</p>
                    <input type="text" />
                  </div>
                </div>

                <hr />
                <div className="movies_series">
                  <div className="option">
                    <input type="checkbox" />
                    <option value="movies">Movies</option>
                    <input type="checkbox" />
                    <option value="series">Series</option>
                  </div>
                </div>
                <hr />
                <div className="option">
                  <input type="checkbox" />
                  <option value="adventure">Comedy</option>
                </div>
                <div className="option">
                  <input type="checkbox" />
                  <option value="comedy">Crime</option>
                </div>
                <div className="option">
                  <input type="checkbox" />
                  <option value="crime">Fantasy</option>
                </div>
                <div className="option">
                  <input type="checkbox" />
                  <option value="fantasy">Historical</option>
                </div>
                <div className="option">
                  <input type="checkbox" />
                  <option value="historical">Horror</option>
                </div>
                <div className="option">
                  <input type="checkbox" />
                  <option value="horror">Romance</option>
                </div>
                <div className="option">
                  <input type="checkbox" />
                  <option value="romance">Sci-fi</option>
                </div>
                <div className="option">
                  <input type="checkbox" />
                  <option value="sci-fi">Thriller</option>
                </div>
                <div className="option">
                  <input type="checkbox" />
                  <option value="thriller">Western</option>
                </div>
                <div className="option">
                  <input type="checkbox" />
                  <option value="western">Animation</option>
                </div>
                <div className="option">
                  <input type="checkbox" />
                  <option value="animation">Drama</option>
                </div>
                <div className="option">
                  <input type="checkbox" />
                  <option value="documentary">Documentary</option>
                </div>

                <button className="option_button">Submit</button>
              </div>
            </div>
          ) : null}
        </div>

        <SideNav className="sideNav">
          <SideNav.Nav className="icon" eventkey="home">
            {/* -------------- Filter -------------- */}
            <NavItem onClick={() => setShowDiv(!showDiv)} eventkey="home">
              <NavIcon>
                <TvIcon />
              </NavIcon>

              <NavText>Filter</NavText>
            </NavItem>
            {/* ---------------------------- */}
          </SideNav.Nav>

          <Link to="/movieList">
            <SideNav.Nav>
              {/* -------------- Pozitivno ocijenjeno -------------- */}
              <NavItem eventkey="home">
                <NavIcon>
                  <ThumbUpAltIcon />
                </NavIcon>
                <NavText>Pozitivno ocjenjeno</NavText>
              </NavItem>
            </SideNav.Nav>
          </Link>
          <Link to="/movieList">
            <SideNav.Nav>
              {/* -------------- Gledati kasnije -------------- */}
              <NavItem eventkey="home">
                <NavIcon>
                  <AccessTimeIcon />
                </NavIcon>
                <NavText>Gledati Kasnije</NavText>
              </NavItem>
            </SideNav.Nav>
          </Link>
          <Link to="/movieList">
            <SideNav.Nav>
              {/* -------------- Omiljeno -------------- */}

              <NavItem eventkey="home">
                <NavIcon>
                  <FavoriteIcon />
                </NavIcon>
                <NavText>Omiljeno</NavText>
              </NavItem>
            </SideNav.Nav>
          </Link>
        </SideNav>
      </div>
    </div>
  );
}

export default Sidebar;
