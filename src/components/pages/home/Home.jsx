import "./home.scss";
import Featured from "../../featured/Featured";
import List from "../../list/List";


const Home = ({ isLoggedIn }) => {
  return (
    <div className="home">
      <div className="content">
        <Featured type="movie" />

        <List isLoggedIn={isLoggedIn} type="Most Popular" />
        <List isLoggedIn={isLoggedIn} type="Comming Soon" />
        <List isLoggedIn={isLoggedIn} type="In Theaters" />
      </div>
    </div>
  );
};

export default Home;
