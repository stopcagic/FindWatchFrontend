import React, { useState, useEffect } from "react";
import "./serie.scss";
import Grid from "@material-ui/core/Grid";
import FavoriteIcon from "@material-ui/icons/Favorite";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

import { Rating } from "react-simple-star-rating";
import { ThumbUpAltOutlined, ThumbDownOutlined } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import { fetch } from "../../../services/routes/baseCalls"
import { auth } from "../../../services/index"
import { patchUserData } from "../../../services/routes/userData"

function Serie(props) {
  const [rating, setRating] = useState(0);
  const [favoriteColor, setFavoriteColor] = useState(false);
  const [thumbsUpColor, setThumbsUpColor] = useState(false);
  const [thumbsDownColor, setThumbsDownColor] = useState(false);
  const [watchLaterColor, setWatchLaterColor] = useState(false);
  const [acessTimeColor, setAcessTimeColor] = useState(false);
  const [episodeColor, setEpisodeColor] = useState(false);
  const [item, setItem] = useState({
    title: "",
    genres: [],
    original_release_year: "",
    userData: {
      baseData: {
        rating: 0
      }
    },
    poster: "",
    clips: [{ external_id: "" }],
    seasons: [{ title: "" }]
  });
  const [error, setError] = useState(null);
  const Accordion = withStyles({
    root: {
      border: "1px solid white",
      backgroundColor: "rgb(32, 31, 31)",
      color: "white",
      boxShadow: "none",
      "&:not(:last-child)": {
        borderBottom: 0,
      },
      "&:before": {
        display: "none",
      },
      "&$expanded": {
        margin: "auto",
      },
    },
    expanded: {},
  })(MuiAccordion);
  const AccordionSummary = withStyles({
    root: {
      backgroundColor: "rgba(0, 0, 0, .03)",
      borderBottom: "1px solid rgba(0, 0, 0, .125)",
      marginBottom: -1,
      minHeight: 56,
      "&$expanded": {
        minHeight: 56,
      },
    },
    content: {
      "&$expanded": {
        margin: "12px 0",
      },
    },
    expanded: {},
  })(MuiAccordionSummary);
  const AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails);

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleRating = async (rate) => {
    const userId = auth.getUserId()
    if (userId !== "User not logged In.") {
      setRating(rate)
      const data = JSON.parse(localStorage.getItem("dataSerie"))
      const response = await patchUserData.patchMovieUserData(userId, data.id, data.type, {
        rating: rate
      })
      if (response.status !== 200) {
        console.log(response.message);
      }
    }
  };
  const handleFavorite = async () => {
    const userId = auth.getUserId()
    if (userId !== "User not logged In.") {
      const fav = !favoriteColor
      setFavoriteColor(fav);
      const data = JSON.parse(localStorage.getItem("dataSerie"))
      const response = await patchUserData.patchMovieUserData(userId, data.id, data.type, {
        favorite: fav
      })
      if (response.status !== 200) {
        console.log(response.message);
      }
    }
  };
  const handleLike = async () => {
    const userId = auth.getUserId()
    if (userId !== "User not logged In.") {
      const like = !thumbsUpColor
      setThumbsUpColor(like);
      setThumbsDownColor(like ? false : thumbsDownColor)
      const data = JSON.parse(localStorage.getItem("dataSerie"))
      const object = like ? { like: like, dislike: false } : { like: like }
      const response = await patchUserData.patchMovieUserData(userId, data.id, data.type, object)
      if (response.status !== 200) {
        console.log(response.message);
      }
    }
  };
  const handleDislike = async () => {
    const userId = auth.getUserId()
    if (userId !== "User not logged In.") {
      const dislk = !thumbsDownColor
      setThumbsDownColor(dislk);
      setThumbsUpColor(dislk ? false : thumbsUpColor)
      const data = JSON.parse(localStorage.getItem("dataSerie"))
      const object = dislk ? { dislike: dislk, like: false } :
        { dislike: dislk }
      const response = await patchUserData.patchMovieUserData(userId, data.id, data.type, object)
      if (response.status !== 200) {
        console.log(response.message);
      }
    }
  };
  const handleWatchLater = async () => {
    const userId = auth.getUserId()
    if (userId !== "User not logged In.") {
      const wlater = !watchLaterColor
      setWatchLaterColor(wlater);
      const data = JSON.parse(localStorage.getItem("dataSerie"))
      const response = await patchUserData.patchMovieUserData(userId, data.id, data.type, {
        watch_later: wlater
      })
      if (response.status !== 200) {
        console.log(response.message);
      }
    }
  };
  const handleCompleted = async () => {
    const userId = auth.getUserId()
    if (userId !== "User not logged In.") {
      const compl = !acessTimeColor
      setAcessTimeColor(compl);
      const data = JSON.parse(localStorage.getItem("dataSerie"))
      const response = await patchUserData.patchMovieUserData(userId, data.id, data.type, {
        completed: compl
      })
      if (response.status !== 200) {
        console.log(response.message);
      }
    }
  };

  const updateColors = userData => {
    setRating(userData?.rating);
    setFavoriteColor(userData?.favorite);
    setThumbsUpColor(userData?.like);
    setThumbsDownColor(userData?.dislike);
    setWatchLaterColor(userData?.watch_later);
    setAcessTimeColor(userData?.completed);
  }

  const fetchItemData = async data => {
    const userId = auth.getUserId();

    if (userId !== "User not logged In.") {
      let response;
      let id = data.id.toString()
      if (id.startsWith("tt")) {
        response = await fetch.getMovieInfo(data.id, data.type, userId)
      }
      else {
        response = await fetch.getMovieInfo(data.id, data.type, userId)
      }

      if (response.status === 200) {
        const userData = response.message.userData.baseData
        setItem(response.message);
        if (userData !== null) {
          updateColors(userData)
        }

        localStorage.setItem("itemSerie", JSON.stringify(response.message));
      }
      else {
        setError(response.status);
      }
    }
  }

  useEffect(() => {
    const data = props.location.data
    localStorage.setItem("dataSerie", JSON.stringify(data));
    if (data !== undefined) {
      fetchItemData(data)
    }
    else {
      setItem(JSON.parse(localStorage.getItem("itemSerie")))
    }

  }, []);



  return (
    <div id="serie">
      <div className="serie_container">
        {error != null ? <div><p>{error}</p></div> :
          <Grid container>
            <Grid item lg={11}>
              <div className="serie_header">
                <h1>{item.title}</h1>
                {item.genres?.map(x => <p key={x?.short_name}>{x?.full_name}</p>)}
                <p>----------------</p>
                <p >{item.original_release_year}</p>
                <div className="icon_container">
                  <div className="first_icon_container">
                    <div className="star_favoutire">
                      <h2>{rating}/10</h2>

                      <Rating
                        stars={10}
                        onClick={handleRating}
                        ratingValue={rating} /* Rating Props */
                      />

                      <FavoriteIcon
                        className="favourite_icon"
                        style={{ color: favoriteColor ? "red" : "grey" }}
                        onClick={() => handleFavorite()}
                      />
                    </div>
                  </div>

                  <div className="second_icon_container">
                    <div className="like">
                      <ThumbUpAltOutlined
                        className="right_icon"
                        style={{ color: thumbsUpColor ? "green" : "grey" }}
                        onClick={() => handleLike()}
                      />
                    </div>
                    <div className="dislike">
                      <ThumbDownOutlined
                        className="right_icon"
                        style={{ color: thumbsDownColor ? "rgb(184, 8, 8)" : "grey" }}
                        onClick={() => handleDislike()}
                      />
                    </div>
                    <div className="watch_later">
                      <WatchLaterIcon
                        className="right_icon"
                        style={{ color: watchLaterColor ? "blanchedalmond" : "grey" }}
                        onClick={() => handleWatchLater()}
                      ></WatchLaterIcon>
                    </div>
                    <div className="acess_time">
                      <AccessTimeIcon
                        className="right_icon"
                        style={{ color: acessTimeColor ? "rgb(197, 170, 129)" : "grey" }}
                        onClick={() => handleCompleted()}
                      ></AccessTimeIcon>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} lg={5}>
              <div className="movie_poster">
                <img
                  src={item.poster}
                  alt=""
                />
              </div>
            </Grid>
            <Grid item xs={12} lg={6}>
              <div className="accordion">
                {
                  item.seasons?.map(x => <div className="sezona">
                    <AccessTimeIcon
                      className="season_icon"
                      style={{ color: episodeColor ? "white" : "grey", cursor: "pointer" }}
                      onClick={() => setEpisodeColor(!episodeColor)}
                    ></AccessTimeIcon>
                    <Accordion
                      square
                      expanded={expanded === "panel1"}
                      onChange={handleChange("panel1")}
                    >
                      <AccordionSummary
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                      >
                        <Typography>{x.title}</Typography>
                      </AccordionSummary>

                      <AccordionDetails className="episode">
                        <Typography>Episode 1</Typography>
                        <AccessTimeIcon
                          style={{ color: episodeColor ? "white" : "grey", cursor: "pointer" }}
                          onClick={() => setEpisodeColor(!episodeColor)}
                        ></AccessTimeIcon>
                      </AccordionDetails>
                    </Accordion>
                  </div>)
                }

              </div>
            </Grid>
            <Grid item xs={12} lg={6}>
              <div className="movie_comment">
                <TextField>sfaasfasfsaf</TextField>
              </div>
            </Grid>
            <Grid item xs={12} lg={5}>
              <div className="movie_video">
                <iframe className="video" width="510" height="315" src={`https://www.youtube.com/embed/${item.clips[0].external_id}`} title={item.title} frameBorder="1" allowFullScreen></iframe>
              </div>
            </Grid>
          </Grid>
        }
      </div>
    </div>
  );
}

export default Serie;
