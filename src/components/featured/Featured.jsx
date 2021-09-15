import "./featured.scss";
import Lacasa from "../../images/lacasa.png";

export default function Featured({ type }) {
  return (
    <div className="featured">
      <img
        src="https://m.media-amazon.com/images/M/MV5BYTE3ZmZhZDYtMmIxNy00ZDA4LTljY2ItNzk0YjFlOWJlOWRjXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg"
        alt=""
      />

      <div className="info">
        <div className="lacasa">
          <img src={Lacasa} alt="" />
        </div>

        <span className="desc">
          Set in Madrid, a mysterious man known as "The Professor" recruits a group of eight people, who choose city names as their aliases, to carry out an ambitious plan that involves entering the Royal Mint of Spain, and escaping with €984 million. After taking 67 people hostage inside the Mint, the team plans to remain inside for 11 days to print the money as they deal with elite police forces.
        </span>
      </div>
    </div>
  );
}
