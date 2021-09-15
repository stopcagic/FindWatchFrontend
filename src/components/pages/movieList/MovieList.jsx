import { Container, Paper } from "@material-ui/core";
import React from "react";
import "./movieList.scss";
import Grid from "@material-ui/core/Grid";
import ListItem from "../../../components/listItem/ListItem";

function MovieList() {
  return (
    <div id="movieList">
      <Container>
        <Grid className="movieListTitle" item lg={12} xs={12}>
          <h1>Popis filmova</h1>
          <hr />
        </Grid>
        <Grid item lg={12} xs={12}>
          <div className="wrapper">
            <div className="container">
              <div className="item">
                <ListItem index={0} />
              </div>
              <div className="item">
                <ListItem index={0} />
              </div>
              <div className="item">
                <ListItem index={0} />
              </div>
              <div className="item">
                <ListItem index={0} />
              </div>
              <div className="item">
                <ListItem index={0} />
              </div>
              <div className="item">
                <ListItem index={0} />
              </div>
              <div className="item">
                <ListItem index={0} />
              </div>
              <div className="item">
                <ListItem index={0} />
              </div>
              <div className="item">
                <ListItem index={0} />
              </div>
              <div className="item">
                <ListItem index={0} />
              </div>
              <div className="item">
                <ListItem index={0} />
              </div>
              <div className="item">
                <ListItem index={0} />
              </div>
              <div className="item">
                <ListItem index={0} />
              </div>
              <div className="item">
                <ListItem index={0} />
              </div>
              <div className="item">
                <ListItem index={0} />
              </div>
              <div className="item">
                <ListItem index={0} />
              </div>
            </div>
          </div>
        </Grid>
      </Container>
    </div>
  );
}

export default MovieList;
