import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginReducer";
import candidateReducer from "./reducers/candidateReducer";

const store = configureStore({
  reducer: {
    login: loginReducer,
    candidates: candidateReducer,
  },
});

export default store;
