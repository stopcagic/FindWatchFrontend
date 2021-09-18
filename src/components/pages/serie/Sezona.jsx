import { useState, useEffect } from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Epizoda from "./Epizoda"
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { auth } from "../../../services/index"
import { patchUserData, getUserData } from "../../../services/routes/userData"

const Sezona = ({ sezona }) => {
  const [acessTimeColor, setAcessTimeColor] = useState(false);
  const [expanded, setExpanded] = useState(false);


  const [error, setError] = useState(null);

  const Accordion = withStyles({
    root: {
      border: "1px solid white",
      backgroundColor: "rgb(32, 31, 31)",
      color: "white",
      boxShadow: "none",
      "&:not(:last-child)": {
        borderBottom: 0,
      },
      "&:before": {
        display: "none",
      },
      "&$expanded": {
        margin: "auto",
      },
    },
    expanded: {},
  })(MuiAccordion);

  const AccordionSummary = withStyles({
    root: {
      backgroundColor: "rgba(0, 0, 0, .03)",
      borderBottom: "1px solid rgba(0, 0, 0, .125)",
      marginBottom: -1,
      minHeight: 56,
      "&$expanded": {
        minHeight: 56,
      },
    },
    content: {
      "&$expanded": {
        margin: "12px 0",
      },
    },
    expanded: {},
  })(MuiAccordionSummary);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(!expanded);
  };

  const handleSeason = async () => {
    const userId = auth.getUserId()
    if (userId !== "User not logged In.") {
      const compl = !acessTimeColor
      setAcessTimeColor(compl)

      const response =
        await patchUserData.patchUserSeasonData(userId, sezona.id.toString(), {
          is_completed: compl
        })
      if (response.status !== 200) {
        console.log(response.message);
      }
    }
  }


  const updateColor = isCompleted => {
    setAcessTimeColor(isCompleted);
  }

  const fetchSeasonData = async data => {
    const userId = auth.getUserId();

    if (userId !== "User not logged In.") {
      const response = await getUserData.getSpeficicSeason(userId, data.id.toString())

      if (response.status === 200) {
        updateColor(response.message.is_completed)
      }
      else {
        setError(response.status);
      }
    }
  }

  useEffect(() => {
    if (sezona !== undefined) {
      fetchSeasonData(sezona)
    }
  }, []);

  return (
    <div className="sezona">
      {error != null ? <div><p>{error}</p></div> :
        <div>
          <AccessTimeIcon
            className="season_icon"
            style={{ color: acessTimeColor ? "white" : "grey", cursor: "pointer" }}
            onClick={() => handleSeason()}
          ></AccessTimeIcon>
          <Accordion
            square
            expanded={expanded}
            onChange={handleChange()}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>{sezona.title}</Typography>
            </AccordionSummary>

            {
              sezona.episodes.episodes.map(y => <Epizoda epizoda={y} sesasonJwId={sezona.id} key={y.id} />)
            }
          </Accordion>
        </div>
      }
    </div>
  )
};

export default Sezona;
