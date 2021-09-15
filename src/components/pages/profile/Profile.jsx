import React from "react";
import "./profile.scss";
import Grid from "@material-ui/core/Grid";
import FavoriteIcon from "@material-ui/icons/Favorite";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Star from "@material-ui/icons/Star";
import { ThumbUpAltOutlined, ThumbDownOutlined } from "@material-ui/icons";
import ListItem from "../../../components/listItem/ListItem";
import { useRef, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

function Movie() {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const [changeUsername, setChangeUsername] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [favoriteColor, setFavoriteColor] = useState("grey");
  const [starColor, setStarColor] = useState("grey");
  const [thumbsUpColor, setThumbsUpColor] = useState("grey");
  const [thumbsDownColor, setThumbsDownColor] = useState("grey");
  const [watchLaterColor, setWatchLaterColor] = useState("grey");
  const [acessTimeColor, setAcessTimeColor] = useState("grey");

  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${300 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 5) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-700 + distance}px)`;
    }
  };

  return (
    <div id="profile">
      <div className="profile_container">
        <Grid container>
          <Grid item lg={6} xs={12}>
            <div className="profile_header">
              <div className="avatar">
                <Avatar className="avatar_icon" />
                <h2>Username</h2>
              </div>
              <div className="info">
                <h3>Email:</h3>
                <p>registeredAt: </p>
                <p>lastLogin: </p>
              </div>
              <hr />
              <div className="change">
                <button
                  className="change_password"
                  onClick={() => {
                    setChangeUsername(!changeUsername);
                    setChangePassword(false);
                  }}
                >
                  Change Username
                </button>
                <button
                  className="change_password"
                  onClick={() => {
                    setChangePassword(!changePassword);
                    setChangeUsername(false);
                  }}
                >
                  Change Passwod
                </button>
              </div>
              {changePassword ? (
                <div className="input_password">
                  <div className="input">
                    <p>Old password</p>
                    <input type="text" />
                  </div>

                  <div className="input">
                    <p>New password</p>
                    <input type="text" />
                  </div>
                  <div className="input">
                    <p>Repeat password</p>
                    <input type="text" />
                  </div>
                </div>
              ) : null}
              <hr />
              {changeUsername ? (
                <div className="input_password">
                  <div className="input">
                    <p>Old password</p>
                    <input type="text" />
                  </div>

                  <div className="input">
                    <p>New Username</p>
                    <input type="text" />
                  </div>
                </div>
              ) : null}
            </div>
          </Grid>

          <Grid item lg={12} xs={12}>
            <div className="wrapper">
              <ArrowBackIosOutlined
                className="sliderArrow left"
                onClick={() => handleClick("left")}
                style={{ display: !isMoved && "none" }}
              />
              <div className="container" ref={listRef}>
                <Link to="/movie">
                  <ListItem index={0} />
                </Link>

                <ListItem index={1} />
                <ListItem index={2} />
                <ListItem index={3} />
                <ListItem index={4} />
                <ListItem index={5} />
                <ListItem index={6} />
                <ListItem index={7} />
                <ListItem index={8} />
                <ListItem index={9} />
              </div>
              <ArrowForwardIosOutlined
                className="sliderArrow right"
                onClick={() => handleClick("right")}
              />
            </div>
          </Grid>
          <Grid item lg={12} xs={12}>
            <div className="buttons">
              <button className="favourite">
                <FavoriteIcon
                  className="icon_size"
                  style={{ color: favoriteColor }}
                  onClick={() => {
                    if (favoriteColor === "grey") setFavoriteColor("red");
                    else setFavoriteColor("grey");
                  }}
                />
              </button>
              <button className="star">
                <Star
                  className="icon_size"
                  style={{ color: starColor }}
                  onClick={() => {
                    if (starColor === "grey") setStarColor("yellow");
                    else setStarColor("grey");
                  }}
                />
              </button>
              <button className="thumbsUp">
                <ThumbUpAltOutlined
                  className="icon_size"
                  style={{ color: thumbsUpColor }}
                  onClick={() => {
                    if (thumbsUpColor === "grey") setThumbsUpColor("green");
                    else setThumbsUpColor("grey");
                  }}
                />
              </button>
              <button className="thumbsDown">
                <ThumbDownOutlined
                  className="icon_size"
                  style={{ color: thumbsDownColor }}
                  onClick={() => {
                    if (thumbsDownColor === "grey")
                      setThumbsDownColor("rgb(184, 8, 8)");
                    else setThumbsDownColor("grey");
                  }}
                />
              </button>

              <button className="watch_later">
                <WatchLaterIcon
                  className="icon_size"
                  style={{ color: watchLaterColor }}
                  onClick={() => {
                    if (watchLaterColor === "grey")
                      setWatchLaterColor("blanchedalmond");
                    else setWatchLaterColor("grey");
                  }}
                />
              </button>
              <button className="watch_later">
                <AccessTimeIcon
                  className="icon_size"
                  style={{ color: acessTimeColor }}
                  onClick={() => {
                    if (acessTimeColor === "grey")
                      setAcessTimeColor("rgb(197, 170, 129)");
                    else setAcessTimeColor("grey");
                  }}
                />
              </button>
            </div>
          </Grid>

          <Grid item xs={12} lg={6}></Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Movie;
