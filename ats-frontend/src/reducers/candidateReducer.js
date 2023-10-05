import { createSlice } from "@reduxjs/toolkit";

const candidateSlice = createSlice({
  name: "candidate",
  initialState: [],
  reducers: {
    setCandidates(state, action) {
      return action.payload;
    },
  },
});

export const { setCandidates } = candidateSlice.actions;

export default candidateSlice.reducer;
