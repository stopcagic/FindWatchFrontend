import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import { useRef, useState, useEffect } from "react";
import ListItem from "../listItem/ListItem";
import "./list.scss";
import { Link } from "react-router-dom";
import { movies } from "../../services/routes/movies";
import { fetch } from "../../services/routes/baseCalls"
import { auth } from "../../services/index"

export default function List({ type, isLoggedIn }) {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [data, setData] = useState([]);


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

  const fetchData = async (call) => {
    const userId = auth.getUserId()
    let data;

    if (userId === "User not logged In.") data = await call();
    else data = await call(userId);

    if (data.message !== null) {
      if (data.message !== undefined) {
        if (data.message.items === undefined) {
          setData(data.message);
        }
        else {
          setData(data.message.items);
        }
      }
    }
  };


  useEffect(() => {
    let mostPopular = type === "Most Popular" ? movies.mostPopular : null;
    let commingSoon = type === "Comming Soon" ? movies.commingSoon : null;
    let inTheaters = type === "In Theaters" ? movies.inTheaters : null;
    let recommeded = type === "Recommended" ? fetch.getRecommended : null;
    // if (mostPopular && !commingSoon && !inTheaters && !recommeded) fetchData(mostPopular);
    // if (!mostPopular && commingSoon && !inTheaters && !recommeded) fetchData(commingSoon);
    // if (!mostPopular && !commingSoon && inTheaters && !recommeded) fetchData(inTheaters);
    if (!mostPopular && !commingSoon && !inTheaters && recommeded) fetchData(recommeded);

  }, []);
  return (
    <div className="list">
      <span className="listTitle">{type}</span>
      <hr />
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className="container" ref={listRef}>

          {/* <Link to="/movie">
            <div className="listItem">
              <img
                src="https://images.justwatch.com/poster/249138360/s592"
                alt="{name}"
              />
            </div>
          </Link> */}
          {
            type === "Recommended" ?
              data.map((x) => {
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
              })
              :
              data.map((x) => {
                return (
                  <Link to={{
                    pathname: "/movie",
                    data: {
                      id: x.id,
                      type: "movie"
                    }
                  }} key={x.id}>
                    <ListItem isLoggedIn={isLoggedIn} key={x.id} title={x.title} image={x.image} />
                  </Link>
                );
              })}
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}
