import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCalQuestion: false,
  showSettings: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showCalenderModal: (state) => {
      state.showCalQuestion = true;
    },
    hideCalenderModal: (state) => {
      state.showCalQuestion = false;
    },
    showSettingsModal: (state) => {
      state.showSettings = true;
    },
    hideSettingsModal: (state) => {
      state.showSettings = false;
    },
  },
});

export const ModalAction = modalSlice.actions;

export default modalSlice.reducer;
