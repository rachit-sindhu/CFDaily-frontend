import styles from "./CalenderQuestion.module.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {validateQuestion} from "../../../Apis/problemsApi";
import { Button, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const CalenderQuestion = () => {
  
  const {calenderQuestion : question, validateLoading} = useSelector(state => state.problemsData);

  const getFormatedDate = (date) => {
    var options = { year: "numeric", month: "long", day: "numeric" };
    const dobj = new Date(Date.parse(date));
    return dobj.toLocaleDateString("en-US", options);
  };

  return (
    <>
      {question ? (
        <div className={styles.CalenderQuestion}>
          <div className={styles.Shadow}></div>
          <h2>
            {getFormatedDate(question.date)}, <i>{question.rank}</i>
          </h2>
          <div style={{ height: "10px" }}></div>
          <h1>{question.name}</h1>
          <div style={{ flex: 1 }}></div>
          <div className={styles.QuestionLink}>
            <div>
              <div className={styles.Link}>
                <a href={question.link} target="_blank">
                  <p>Click here open question</p>
                </a>
                <ArrowRightAltIcon />
              </div>
              {!question.solved ? (
                <Button
                  variant="contained"
                  style={{ width: "100%", height: "50px", marginTop: "20px", backgroundColor:"purple" }}
                  onClick={validateQuestion}
                  disabled={validateLoading}
                >
                  {validateLoading ? (
                    <CircularProgress style={{ color: "white" }} />
                  ) : (
                    <p>Validate</p>
                  )}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CalenderQuestion;
