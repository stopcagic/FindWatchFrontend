import React, { useState } from "react";
import "./movie.scss";
import { Rating } from "react-simple-star-rating";
import Grid from "@material-ui/core/Grid";
import FavoriteIcon from "@material-ui/icons/Favorite";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { ThumbUpAltOutlined, ThumbDownOutlined } from "@material-ui/icons";

function Movie() {
  const [rating, setRating] = useState(0);
  const [favoriteColor, setFavoriteColor] = useState("grey");
  const [thumbsUpColor, setThumbsUpColor] = useState("grey");
  const [thumbsDownColor, setThumbsDownColor] = useState("grey");
  const [watchLaterColor, setWatchLaterColor] = useState("grey");
  const [acessTimeColor, setAcessTimeColor] = useState("grey");

  const handleRating = (rate) => {
    setRating(rate);
  };

  const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  return (
    <div id="movie">
      <div className="movie_container">
        <Grid container>
          <Grid item lg={11}>
            <div className="movie_header">
              <h1>The White Lotus</h1>
              <p>Genre</p>
              <p>Release_year</p>
              <div className="icon_container">
                <div className="first_icon_container">
                  <div className="icons_left">
                    <div className="star_favoutire">
                      <h2>3/5</h2>

                      <Rating
                        onClick={handleRating}
                        ratingValue={rating} /* Rating Props */
                      />

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
          <Grid item xs={12} lg={5}>
            <div className="movie_video">
              <video src={trailer} autoPlay={true} loop />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Movie;
