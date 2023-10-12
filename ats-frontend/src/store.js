import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginReducer";
import candidateReducer from "./reducers/candidateReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    login: loginReducer,
    candidates: candidateReducer,
    notification: notificationReducer,
  },
});

export default store;
