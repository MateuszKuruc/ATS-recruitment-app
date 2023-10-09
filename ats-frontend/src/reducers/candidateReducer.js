import { createSlice } from "@reduxjs/toolkit";
import candidateService from "../services/candidates";

const candidateSlice = createSlice({
  name: "candidate",
  initialState: [],
  reducers: {
    setCandidates(state, action) {
      return action.payload;
    },
    addCandidate(state, action) {
      state.push(action.payload);
    },
  },
});

export default candidateSlice.reducer;
export const { setCandidates, addCandidate } = candidateSlice.actions;

export const initializeCandidates = () => {
  return async (dispatch) => {
    const candidates = await candidateService.getAll();
    dispatch(setCandidates(candidates));
  };
};

export const createCandidate = (content) => {
  return async (dispatch) => {
    const newCandidate = await candidateService.create(content);

    dispatch(addCandidate(newCandidate));
    return newCandidate;
  };
};

export const removeCandidate = (id) => {
  return async (dispatch) => {
    await candidateService.deleteCandidateById(id);
    const candidates = await candidateService.getAll();
    dispatch(setCandidates(candidates));
  };
};
