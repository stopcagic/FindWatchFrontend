import React from "react";
import "./profile.scss";
import { Grid, CircularProgress } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Star from "@material-ui/icons/Star";
import { ThumbUpAltOutlined, ThumbDownOutlined } from "@material-ui/icons";
import ListItem from "../../../components/listItem/ListItem";
import { useRef, useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { auth, getUser, updateProfile } from "../../../services/index"
import { getUserData, } from "../../../services/routes/userData"
import moment from "moment"

function Profile() {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const [changeUsername, setChangeUsername] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [favoriteColor, setFavoriteColor] = useState(true);
  const [starColor, setStarColor] = useState(false);
  const [thumbsUpColor, setThumbsUpColor] = useState(false);
  const [thumbsDownColor, setThumbsDownColor] = useState(false);
  const [watchLaterColor, setWatchLaterColor] = useState(false);
  const [acessTimeColor, setAcessTimeColor] = useState(false);
  const [data, setData] = useState([]);
  const [user, setUser] = useState({ username: "", email: "", registeredAt: "", lastLogin: "" });
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRepeatPassword, setNewRepeatPassword] = useState("");
  const [notification, setNotification] = useState("");


  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${300 + distance}px)`;
      if (slideNumber < 1) setIsMoved(false)
    }
    if (direction === "right" && slideNumber < 10) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-700 + distance}px)`;
    }
  };

  const fetchProperty = async (property, state) => {
    const userId = auth.getUserId();
    if (userId !== "User not logged In." && state === true) {
      const response = await getUserData.getByProperty(userId, property)
      if (response.status === 200) {
        setData(response.message)
      }
    }
  }

  const fetchUserData = async () => {
    const userId = auth.getUserId();
    if (userId !== "User not logged In.") {
      const uData = await getUser.get(userId)
      setUser(uData.message);
    }
  }
  const handleUsernameValue = e => {
    setNewUsername(e.target.value)
  }
  const handlePasswordValue = e => {
    setNewPassword(e.target.value)
  }
  const handleRepeatPasswordValue = e => {
    setNewRepeatPassword(e.target.value)
  }
  const handleUsername = async () => {
    const userId = auth.getUserId();
    if (userId !== "User not logged In.") {
      const response = await updateProfile.updateUsername(userId, newUsername);
      if (response.status !== 200) {
        setNotification(response.message);
      }
      else {
        await fetchUserData()
        setNotification("Username Update Successful.")
      }
    }
  }

  const handlePassword = async () => {
    const userId = auth.getUserId();
    if (userId !== "User not logged In.") {
      if (newPassword == newRepeatPassword) {
        const response = await updateProfile.updatePassword(userId, newPassword);
        if (response.status !== 200) {
          setNotification(response.message);
        }
        else {
          await fetchUserData()
          setNotification("Password Update Successful.")
        }
      }
      else {
        setNotification("Passwords do not match.")
      }
    }
  }

  useEffect(() => {
    fetchUserData()
    fetchProperty("favorite", true)
    setNotification("")
  }, []);

  return (
    <div id="profile">
      <div className="profile_container">
        <Grid container>
          <Grid item lg={6} xs={12}>
            <div className="profile_header">
              <div className="avatar">
                <Avatar className="avatar_icon" />
                <h2>{user.username}</h2>
              </div>
              <div className="info">
                <h3>Email: {user.email}</h3>
                <p><b>Registered At:</b> {moment(user.registeredAt).format("YYYY/MM/DD")} </p>
                <p><b>Last Login:</b> {moment(user.lastLogin).format("YYYY/MM/DD")}</p>
              </div>

              <div className="notification"><h3>{notification}</h3></div>
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
                    <p>New password</p>
                    <input type="text" onChange={handlePasswordValue} />
                  </div>

                  <div className="input">
                    <p>Repeat password</p>
                    <input type="text" onChange={handleRepeatPasswordValue} />
                  </div>

                  <button className="button_submit" onClick={handlePassword}>Submit</button>
                </div>
              ) : null}
              <hr />
              {changeUsername ? (
                <div className="input_password">
                  <div className="input">
                    <p>New Username</p>
                    <input type="text" onChange={handleUsernameValue} />
                  </div>
                  <button className="button_submit" onClick={handleUsername}>Submit</button>
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
                {
                  data.length ? data.map((x) => {
                    let item = x.object_type === "movie" ?
                      <div className="item" key={x.jw_entity_id
                      }>
                        <Link to={{
                          pathname: "/movie",
                          data: {
                            id: x.id,
                            type: "movie"
                          }
                        }} >
                          <ListItem key={x.jw_entity_id} title={x.title} image={x.poster} />
                        </Link>
                      </div>
                      :
                      <div className="item" key={x.jw_entity_id
                      }>
                        <Link to={{
                          pathname: "/serie",
                          data: {
                            id: x.id,
                            type: "show"
                          }
                        }}>
                          <ListItem key={x.jw_entity_id} title={x.title} image={x.poster} />
                        </Link>
                      </div>

                    return item;
                  }) : <div className="noItems"><CircularProgress /></div>
                }
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
                  style={{ color: favoriteColor ? "red" : "grey" }}
                  onClick={() => {
                    setFavoriteColor(!favoriteColor)
                    setStarColor(false)
                    setThumbsUpColor(false)
                    setThumbsDownColor(false)
                    setWatchLaterColor(false)
                    setAcessTimeColor(false)
                    fetchProperty("favorite", !favoriteColor)
                  }}
                />
              </button>
              <button className="star">
                <Star
                  className="icon_size"
                  style={{ color: starColor ? "yellow" : "grey" }}
                  onClick={() => {
                    setFavoriteColor(false)
                    setStarColor(!starColor)
                    setThumbsUpColor(false)
                    setThumbsDownColor(false)
                    setWatchLaterColor(false)
                    setAcessTimeColor(false)
                    fetchProperty("rating", !starColor)
                  }}
                />
              </button>
              <button className="thumbsUp">
                <ThumbUpAltOutlined
                  className="icon_size"
                  style={{ color: thumbsUpColor ? "green" : "grey" }}
                  onClick={() => {
                    setFavoriteColor(false)
                    setStarColor(false)
                    setThumbsUpColor(!thumbsUpColor)
                    setThumbsDownColor(false)
                    setWatchLaterColor(false)
                    setAcessTimeColor(false)
                    fetchProperty("like", !thumbsUpColor)
                  }}
                />
              </button>
              <button className="thumbsDown">
                <ThumbDownOutlined
                  className="icon_size"
                  style={{ color: thumbsDownColor ? "rgb(184, 8, 8)" : "grey" }}
                  onClick={() => {
                    setFavoriteColor(false)
                    setStarColor(false)
                    setThumbsUpColor(false)
                    setThumbsDownColor(!thumbsDownColor)
                    setWatchLaterColor(false)
                    setAcessTimeColor(false)
                    fetchProperty("dislike", !thumbsDownColor)
                  }}
                />
              </button>

              <button className="watch_later">
                <WatchLaterIcon
                  className="icon_size"
                  style={{ color: watchLaterColor ? "blanchedalmond" : "grey" }}
                  onClick={() => {
                    setFavoriteColor(false)
                    setStarColor(false)
                    setThumbsUpColor(false)
                    setThumbsDownColor(false)
                    setWatchLaterColor(!watchLaterColor)
                    setAcessTimeColor(false)
                    fetchProperty("watch_later", !watchLaterColor)
                  }}
                />
              </button>
              <button className="watch_later">
                <AccessTimeIcon
                  className="icon_size"
                  style={{ color: acessTimeColor ? "rgb(197, 170, 129)" : "grey" }}
                  onClick={() => {
                    setFavoriteColor(false)
                    setStarColor(false)
                    setThumbsUpColor(false)
                    setThumbsDownColor(false)
                    setWatchLaterColor(false)
                    setAcessTimeColor(!acessTimeColor)
                    fetchProperty("completed", !acessTimeColor)
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

export default Profile;
