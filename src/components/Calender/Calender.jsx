import styles from "./Calender.module.css";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Modal from "../Modal/Modal";

import { useDispatch, useSelector } from "react-redux";
import CalenderQuestion from "./CalenderQuestion/CalenderQuestion";
import { useEffect } from "react";
import {
  fetchMonthQuestion,
  showModalAndSetQuestion,
} from "../../Apis/problemsApi";
import BoxLoading from "../UI/BoxLoading/BoxLoading";
import { ProblemsDataActions } from "../../store/reducers/problemsData";

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
  const { monthlyProblems, loading, currentMonth } = useSelector(
    (state) => state.problemsData
  );

  const dispatch = useDispatch();

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
            mDPI < monthlyProblems.length &&
            sameDate(monthlyProblems[mDPI].date)
          ) {
            const ind = mDPI; //i'm having another index because javascript is not remembering mDPI
            currrow.push(
              <div
                className={
                  monthlyProblems[mDPI].solved ? styles.SolvedCell : styles.Cell
                }
                onClick={() => {
                  showModalAndSetQuestion(ind);
                }}
              >
                {monthlyProblems[mDPI].solved ? null : displayday}
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
    let newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + val);
    dispatch(ProblemsDataActions.setCurrentMonth(newMonth));
    fetchMonthQuestion();
  };

  const getFirstDay = () => {
    const nd = new Date(currentMonth);
    nd.setDate(1);
    return nd.getDay();
  };

  useEffect(() => {
    fetchMonthQuestion();
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
                months[currentMonth.getMonth()]
              }, ${currentMonth.getFullYear()}`}</h1>
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
            {createCalenderForMonth(getFirstDay(), daysInThisMonth(currentMonth))}
          </div>
        </div>
      )}
      <Modal>
        <CalenderQuestion />
      </Modal>
    </>
  );
};

export default Calender;
