import React, { useState } from "react";
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

function Serie() {
  const [rating, setRating] = useState(0);
  const [favoriteColor, setFavoriteColor] = useState("grey");
  const [thumbsUpColor, setThumbsUpColor] = useState("grey");
  const [thumbsDownColor, setThumbsDownColor] = useState("grey");
  const [watchLaterColor, setWatchLaterColor] = useState("grey");
  const [acessTimeColor, setAcessTimeColor] = useState("grey");
  const [episodeColor, setEpisodeColor] = useState("grey");
  const handleRating = (rate) => {
    setRating(rate);
  };
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

  const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  return (
    <div id="serie">
      <div className="serie_container">
        <Grid container>
          <Grid item lg={11}>
            <div className="serie_header">
              <h1>The White Lotus</h1>
              <p>Genre</p>
              <p>Release_year</p>
              <div className="icon_container">
                <div className="first_icon_container">
                  <div className="icons_left">
                    <h2>4/5</h2>
                    <div className="star_favoutire">
                      <Rating onClick={handleRating} ratingValue={rating} />

                      <FavoriteIcon
                        className="favourite_icon"
                        style={{ color: favoriteColor }}
                        onClick={() => {
                          if (favoriteColor === "grey") setFavoriteColor("red");
                          else setFavoriteColor("grey");
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="icon_container">
                <div className="second_icon_container">
                  <div className="icons_right">
                    <div className="like">
                      <ThumbUpAltOutlined
                        className="right_icon"
                        style={{ color: thumbsUpColor }}
                        onClick={() => {
                          if (thumbsUpColor === "grey")
                            setThumbsUpColor("green");
                          else setThumbsUpColor("grey");
                        }}
                      />
                    </div>
                    <div className="dislike">
                      <ThumbDownOutlined
                        className="right_icon"
                        style={{ color: thumbsDownColor }}
                        onClick={() => {
                          if (thumbsDownColor === "grey")
                            setThumbsDownColor("rgb(184, 8, 8)");
                          else setThumbsDownColor("grey");
                        }}
                      />
                    </div>
                    <div className="watch_later">
                      <WatchLaterIcon
                        className="right_icon"
                        style={{ color: watchLaterColor }}
                        onClick={() => {
                          if (watchLaterColor === "grey")
                            setWatchLaterColor("blanchedalmond");
                          else setWatchLaterColor("grey");
                        }}
                      ></WatchLaterIcon>
                    </div>
                    <div className="acess_time">
                      <AccessTimeIcon
                        className="right_icon"
                        style={{ color: acessTimeColor }}
                        onClick={() => {
                          if (acessTimeColor === "grey")
                            setAcessTimeColor("rgb(197, 170, 129)");
                          else setAcessTimeColor("grey");
                        }}
                      ></AccessTimeIcon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} lg={5}>
            <div className="movie_poster">
              <img
                src="https://images.justwatch.com/poster/247152730/s592"
                alt=""
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={6}>
            <div className="accordion">
              <div className="sezona"></div>
              <AccessTimeIcon
                className="season_icon"
                style={{ color: episodeColor, cursor: "pointer" }}
                onClick={() => {
                  if (episodeColor === "grey") setEpisodeColor("white");
                  else setEpisodeColor("grey");
                }}
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
                  <Typography>Season 1</Typography>
                </AccordionSummary>

                <AccordionDetails className="episode">
                  <Typography>Episode 1</Typography>
                  <AccessTimeIcon
                    style={{ color: episodeColor, cursor: "pointer" }}
                    onClick={() => {
                      if (episodeColor === "grey") setEpisodeColor("white");
                      else setEpisodeColor("grey");
                    }}
                  ></AccessTimeIcon>
                </AccordionDetails>
              </Accordion>
              <Accordion
                square
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography>Season 2</Typography>
                </AccordionSummary>

                <AccordionDetails className="episode">
                  <Typography>Episode 1</Typography>
                  <AccessTimeIcon
                    style={{ color: episodeColor, cursor: "pointer" }}
                    onClick={() => {
                      if (episodeColor === "grey") setEpisodeColor("white");
                      else setEpisodeColor("grey");
                    }}
                  ></AccessTimeIcon>
                </AccordionDetails>
              </Accordion>
              <Accordion
                square
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  aria-controls="panel3d-content"
                  id="panel3d-header"
                >
                  <Typography>Season 3</Typography>
                </AccordionSummary>

                <AccordionDetails className="episode">
                  <Typography>Episode 1</Typography>
                  <AccessTimeIcon
                    style={{ color: episodeColor, cursor: "pointer" }}
                    onClick={() => {
                      if (episodeColor === "grey") setEpisodeColor("white");
                      else setEpisodeColor("grey");
                    }}
                  ></AccessTimeIcon>
                </AccordionDetails>
              </Accordion>
            </div>
          </Grid>
          <Grid item xs={12} lg={6}>
            <div className="movie_comment">
              <TextField>sfaasfasfsaf</TextField>
            </div>
          </Grid>
          <Grid item xs={12} lg={6}>
            <div className="movie_video">
              <video src={trailer} autoPlay={true} loop />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Serie;
