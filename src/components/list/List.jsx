import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import { useRef, useState, useEffect } from "react";
import ListItem from "../listItem/ListItem";
import "./list.scss";
import { Link } from "react-router-dom";
import { movies } from "../../services/routes/movies";

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
    let data = await call();
    if (data != null) setData(data.items);
  };

  useEffect(() => {
    let mostPopular = type === "Most Popular" ? movies.mostPopular : null;
    let commingSoon = type === "Comming Soon" ? movies.commingSoon : null;
    let inTheaters = type === "In Theaters" ? movies.inTheaters : null;
    /* 
    if (mostPopular && !commingSoon && !inTheaters) fetchData(mostPopular);
    if (!mostPopular && commingSoon && !inTheaters) fetchData(commingSoon);
    if (!mostPopular && !commingSoon && inTheaters) fetchData(inTheaters); */
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
          {
            isLoggedIn ?
              <Link to="/movie">
                <div className="listItem">
                  <img
                    src="https://images.justwatch.com/poster/249138360/s592"
                    alt="{name}"
                  />
                </div>
              </Link> :
              <Link to="/register">
                <div className="listItem">
                  <img
                    src="https://images.justwatch.com/poster/249138360/s592"
                    alt="{name}"
                  />
                </div>
              </Link>
          }


          {/*    {data.map((x) => {
            return ({
              isLoggedIn ? 
              <Link to="/movie" key={x.id}>
                <ListItem isLoggedIn={isLoggedIn} key={x.id} title={x.title} image={x.image} />
              </Link> :
              <Link to="/register" key={x.id}>
                <ListItem isLoggedIn={isLoggedIn} key={x.id} title={x.title} image={x.image} />
              </Link>}
            );
          })} */}
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}
