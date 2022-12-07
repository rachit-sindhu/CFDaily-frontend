import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    monthlyProblems: [],
    dailyChallenge: null,
    loading: true,
    validateLoading: false,
    selectedModalQuestionIndex : 0,
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
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setQuestionIndex : (state, action) => {
            state.selectedModalQuestionIndex = action.payload;
        },
        setValidateLoading: (state, action) => {
            state.validateLoading = action.payload;
        }
    }
});


export const ProblemsDataActions = ProblemsDataSlice.actions;

export default ProblemsDataSlice.reducer;