import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    success: (state, action) => {
      state.token = action.token;
    },
    logout: (state) => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      state.token = null;
    },
    tryAutoLogin: (state) => {
      const access_token = localStorage.getItem("access_token");
      const refresh_token = localStorage.getItem("refresh_token");
      if (access_token != null && access_token.trim() != "" && refresh_token != null) state.token = access_token;
      else state.token = null;
    },
  },
});


export const AuthActions = AuthSlice.actions;

export default AuthSlice.reducer;

