import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profileData: null,
    dailyChallenge: null,
};


const UserDataSlice = createSlice({
    name:"userData",
    initialState,
    reducers : {
        setProfile: (state, action) => {
            state.profileData = action.payload;
        },
        setDailyChallenge: (state, action) => {
            if(state.dailyChallenge == null){
                state.dailyChallenge = action.payload;
            }
        }
    }
});


export const UserDataActions = UserDataSlice.actions;

export default UserDataSlice.reducer;