import { useState, useEffect } from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { auth } from "../../../services/index"
import { patchUserData, getUserData } from "../../../services/routes/userData"

const Epizoda = ({ epizoda, sesasonJwId }) => {
  const [acessTimeColor, setAcessTimeColor] = useState(false);
  const [error, setError] = useState(null);

  const AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails);

  const handleEpisode = async () => {
    const userId = auth.getUserId()
    if (userId !== "User not logged In.") {
      const compl = !acessTimeColor
      setAcessTimeColor(compl)

      const response =
        await patchUserData.patchUserEpisodeData(
          userId, sesasonJwId.toString(), epizoda.episode_number, {
          watched: compl
        })
      if (response.status !== 200) {
        console.log(response.message);
      }
    }
  }

  const updateColor = isCompleted => {
    setAcessTimeColor(isCompleted);
  }

  const fetchEpisodeData = async data => {
    const userId = auth.getUserId();

    if (userId !== "User not logged In.") {
      const response = await getUserData.getSpeficicEpisode(sesasonJwId.toString(), data.episode_number)
      if (response.status === 200) {
        updateColor(response.message.watched)
      }
      else {
        setError(response.status);
      }
    }
  }


  useEffect(() => {
    if (epizoda !== undefined) {
      fetchEpisodeData(epizoda)
    }
  }, []);
  return (
    <div className="epizoda">
      {error != null ? <div><p>{error}</p></div> :
        <div>
          <AccordionDetails className="episode" key={epizoda.id}>
            <Typography>{epizoda.title}</Typography>
            <AccessTimeIcon
              style={{ color: acessTimeColor ? "white" : "grey", cursor: "pointer" }}
              onClick={() => handleEpisode()}
            ></AccessTimeIcon>
          </AccordionDetails>
        </div>
      }
    </div>
  )
};

export default Epizoda;
