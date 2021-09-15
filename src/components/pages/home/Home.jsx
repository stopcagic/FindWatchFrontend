import "./home.scss";
import Featured from "../../featured/Featured";
import List from "../../list/List";


const Home = () => {
  return (
    <div className="home">
           <div className="content">
        <Featured type="movie" />

        <List type="Most Popular" />
        <List type="Comming Soon" />
        <List type="In Theaters" />
      </div>
    </div>
  );
};

export default Home;
