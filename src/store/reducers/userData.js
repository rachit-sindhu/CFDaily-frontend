import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profileData: null,
    loading: true,
};


const UserDataSlice = createSlice({
    name:"userData",
    initialState,
    reducers : {
        setProfile: (state, action) => {
            state.profileData = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});


export const UserDataActions = UserDataSlice.actions;

export default UserDataSlice.reducer;