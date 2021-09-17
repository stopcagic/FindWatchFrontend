import { Container } from "@material-ui/core";
import React from "react";
import "./movieList.scss";
import Grid from "@material-ui/core/Grid";
import ListItem from "../../../components/listItem/ListItem";
import { Link } from "react-router-dom";

function MovieList(data) {
  const items = data.location.state.items
  const title = data.location.state.title

  return (
    <div id="movieList">
      <Container>
        <Grid className="movieListTitle" item lg={12} xs={12}>
          <h1>{title}</h1>
          <hr />
        </Grid>
        <Grid item lg={12} xs={12}>
          <div className="wrapper">
            <div className="container">
              {
                items.length ? items.map((x) => {
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
                }) : <div className="noItems"><h1> There are currently no movies or shows. </h1></div>
              }
            </div>
          </div>
        </Grid>
      </Container>
    </div>
  );
}

export default MovieList;
