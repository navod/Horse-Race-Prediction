import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  token: null,
  popupVisible: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setPopupVisible: (state, action) => {
      state.popupVisible = action.payload;
    },
  },
});

export const { setUserData, setToken, setPopupVisible } = authSlice.actions;

export default authSlice.reducer;
