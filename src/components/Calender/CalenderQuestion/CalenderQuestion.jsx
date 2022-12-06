import styles from "./CalenderQuestion.module.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useState } from "react";
import axios from "../../../baseAxios";
import { Button, CircularProgress } from "@mui/material";

const CalenderQuestion = ({question, updateQuestionSolvedStatus}) => {
  const [loading, setLoading] = useState(false);

  const getFormatedDate = (date) => {
    var options = { year: "numeric", month: "long", day: "numeric" };
    const dobj = new Date(Date.parse(date));
    return dobj.toLocaleDateString("en-US", options);
  };

  const validateQuestion = async () => {
    setLoading(true);
    try {
      const questiondate = new Date(Date.parse(question.date));
      const res = await axios.post("/api/v1/problems/validate", {
        date: questiondate,
      });
      const q = {
        ...question,
        solved: true,
      }
      updateQuestionSolvedStatus(q)
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <>
      {question ? (
        <div className={styles.CalenderQuestion}>
          <div className={styles.Shadow}></div>
          <h2>
            {getFormatedDate(question.date)}, <i>Pupil</i>
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
                  style={{ width: "100%", height: "50px", marginTop: "20px" }}
                  onClick={validateQuestion}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress style={{ color: "primary" }} />
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
