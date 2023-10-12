import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    severity: "success",
    message: "This is a test success notification message!",
    // message: "",
  },
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return { severity: "", message: "" };
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
