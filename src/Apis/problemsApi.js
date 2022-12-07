import axios from "./baseAxios";
import { fetchUserDetails } from "./userApis";
import { store } from "../store/store";
import { ProblemsDataActions } from "../store/reducers/problemsData";
import { ModalAction } from "../store/reducers/modal";

export const fetchMonthQuestion = async () => {
  store.dispatch(ProblemsDataActions.setLoading(true));
  const currMonth = store.getState().problemsData.currentMonth;
  try {
    const res = await axios.post("/api/v1/problems/monthlyQuestions", {
      date: currMonth,
    });
    store.dispatch(ProblemsDataActions.setMonthlyProblems(res.data.data));
  } catch (e) {
    console.log("failed to fetch month problems");
  }
  store.dispatch(ProblemsDataActions.setLoading(false));
};

export const showModalAndSetQuestion = (index) => {
  console.log("question index", index);
  store.dispatch(ProblemsDataActions.setQuestionIndex(index));
  store.dispatch(ModalAction.showCalenderModal());
};

export const validateQuestion = async (question) => {
  store.dispatch(ProblemsDataActions.setValidateLoading(true));
  try {
    const questiondate = new Date(Date.parse(question.date));
    await axios.post("/api/v1/problems/validate", {
      date: questiondate,
    });

    let { selectedModalQuestionIndex, monthlyProblems } =
      store.getState().problemsData;

    monthlyProblems[selectedModalQuestionIndex].solved = true;

    store.dispatch(ProblemsDataActions.setMonthlyProblems(monthlyProblems));
    fetchUserDetails();
  } catch (e) {
    console.log("not able to validate question or question not solved");
  }

  store.dispatch(ProblemsDataActions.setValidateLoading(false));
};
