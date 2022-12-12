import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    monthlyProblems: [],
    dailyChallenge: null,
    loading: true,
    validateLoading: false,
    calenderQuestion: null,
    calQuestionIndex: null,
    currentMonth : new Date(),
};


const ProblemsDataSlice = createSlice({
    name:"problemsData",
    initialState,
    reducers : {
        setMonthlyProblems: (state, action) => {
            state.monthlyProblems = action.payload;
            if(state.dailyChallenge == null){ //setting daily challenge for the first time.
                let n = state.monthlyProblems.length;
                state.dailyChallenge = state.monthlyProblems[n-1];
            }
            if(state.calQuestionIndex != null){
                state.calenderQuestion = state.monthlyProblems[state.calQuestionIndex];
            }
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setQuestionIndex : (state, action) => {
            state.calQuestionIndex = action.payload;
            state.calenderQuestion = state.monthlyProblems[action.payload];
        },
        setValidateLoading: (state, action) => {
            state.validateLoading = action.payload;
        },
        setDailyChallenge: (state) => {
            let n = state.monthlyProblems.length;
            state.dailyChallenge = state.monthlyProblems[n-1];
        },
        setCurrentMonth : (state, action) => {
            state.currentMonth = action.payload;
        }
    }
});


export const ProblemsDataActions = ProblemsDataSlice.actions;

export default ProblemsDataSlice.reducer;