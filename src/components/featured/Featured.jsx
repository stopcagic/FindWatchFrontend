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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
          adipisci repellendus eum quasi illo, velit numquam, maxime tempora
          sint deleniti, aliquid qui? Facilis, adipisci! Ratione hic repudiandae
          temporibus eum earum?
        </span>
      </div>
    </div>
  );
}
