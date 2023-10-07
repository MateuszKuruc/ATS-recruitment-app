import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginReducer";
import candidateReducer from "./reducers/candidateReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    login: loginReducer,
    candidates: candidateReducer,
    user: userReducer,
  },
});

export default store;
