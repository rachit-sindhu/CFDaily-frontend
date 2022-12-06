import styles from "./Calender.module.css";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Modal from "../Modal/Modal";

import { ModalAction } from "../../store/reducers/modal";
import { UserDataActions } from "../../store/reducers/userData";
import { useDispatch } from "react-redux";
import CalenderQuestion from "./CalenderQuestion/CalenderQuestion";
import { useEffect, useState } from "react";
import axios from "../../baseAxios";
import BoxLoading from "../UI/BoxLoading/BoxLoading";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function daysInThisMonth(now) {
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}

const Calender = () => {
  const dispatch = useDispatch();

  const [calMonth, setCalMonth] = useState(new Date());
  const [monthDailyProblems, setMonthDailyProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalQuestionIndex, setModalQuestionIndex] = useState(1);

  const createCalenderForMonth = (startDay, noofdays) => {
    const cal = [];

    let day = 1;
    let displayday = 1;
    let mDPI = 0; //month daily problem Index
    let d = new Date();
    let currDate = new Date(d.getFullYear(), d.getMonth());

    const sameDate = (date) => {
      const dd = Date.parse(date);
      const dd1 = new Date(dd);
      return dd1.getDate() == currDate.getDate();
    };

    for (let i = 1; i <= 6; i++) {
      const currrow = [];
      for (let j = 1; j <= 7; j++) {
        if (day < startDay || displayday > noofdays) {
          //these are the cells which are not part of this calender
          currrow.push(<div className={styles.DisabledCell}></div>);
        } else {
          //here we are checking if mDPI is not out of bound && have same date as currDate
          //then we are pushing a cell which have a question in it
          if (
            mDPI < monthDailyProblems.length &&
            sameDate(monthDailyProblems[mDPI].date)
          ) {
            const ind = mDPI; //i'm having another index because javascript is not remembering mDPI
            currrow.push(
              <div
                className={monthDailyProblems[mDPI].solved ? styles.SolvedCell : styles.Cell}
                onClick={() => {
                  setModalQuestionIndex(ind);
                  dispatch(ModalAction.showCalenderModal());
                }}
              >
                {monthDailyProblems[mDPI].solved ? null: displayday}
              </div>
            );
            mDPI++;
          } else {
            //else we are pushing a cell which don't have a question in it.
            currrow.push(
              <div className={styles.DisabledCell}>{displayday}</div>
            );
          }
          currDate.setDate(currDate.getDate() + 1);
          displayday++;
        }
        day++;
      }

      cal.push(<div className={styles.Row}>{currrow}</div>);

      if (displayday > noofdays) break;
    }

    return cal;
  };

  const changeMonth = (val) => {
    calMonth.setMonth(calMonth.getMonth() + val);
    const nd = new Date(calMonth);
    setCalMonth(nd);
    fetchMonthChallenges();
  };

  const getFirstDay = () => {
    const nd = new Date(calMonth);
    nd.setDate(1);
    return nd.getDay() + 1;
  };

  const fetchMonthChallenges = async () => {
    setLoading(true);
    const res = await axios.post("/api/v1/problems/monthlyQuestions", {
      date: calMonth,
    });
    console.log(res.data.data);
    console.log("setting months data");
    setMonthDailyProblems(res.data.data);

    let n = res.data.data.length;
    if (n) dispatch(UserDataActions.setDailyChallenge(res.data.data[n - 1])); //last day data
    setLoading(false);
  };

  useEffect(() => {
    fetchMonthChallenges();
  }, []);

  return (
    <>
      {loading ? (
        <BoxLoading />
      ) : (
        <div className={styles.CalContainer}>
          <div className={styles.Title}>
            <div className={styles.Month}>
              <h1>{`${
                months[calMonth.getMonth()]
              }, ${calMonth.getFullYear()}`}</h1>
              <div className={styles.ChangeButtons}>
                <div className={styles.Button} onClick={() => changeMonth(-1)}>
                  <ArrowBackIosNewIcon />
                </div>
                <div className={styles.Button} onClick={() => changeMonth(1)}>
                  <ArrowForwardIosIcon />
                </div>
              </div>
            </div>
            <div className={styles.Row}>
              {["M", "T", "W", "TH", "F", "ST", "S"].map((ele) => {
                return <div className={styles.DisabledCell}>{ele}</div>;
              })}
            </div>
            <div style={{ marginTop: "40px" }}></div>
            {createCalenderForMonth(getFirstDay(), daysInThisMonth(calMonth))}
          </div>
          <Modal>
            <CalenderQuestion
              question={monthDailyProblems[modalQuestionIndex]}
              updateQuestionSolvedStatus={(q) => {
                monthDailyProblems[modalQuestionIndex] = q;
                setMonthDailyProblems([...monthDailyProblems]);
              }}
            />
          </Modal>
        </div>
      )}
    </>
  );
};

export default Calender;
