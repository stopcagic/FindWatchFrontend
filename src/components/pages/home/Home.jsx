import "./home.scss";
import Featured from "../../featured/Featured";
import List from "../../list/List";


const Home = () => {
  return (
    <div className="home">
      <div className="content">
        <Featured type="movie" />

        <List type="Recommended" />
        <List type="Most Popular" />
        <List type="In Theaters" />
        <List type="Comming Soon" />

      </div>
    </div>
  );
};

export default Home;
