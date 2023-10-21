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
    updateCandidateInStore(state, action) {
      return state.map((candidate) =>
        candidate.id === action.payload.id ? action.payload : candidate
      );
    },
    updateCandidateFileInStore(state, action) {
      const { candidateId, uploadedFile } = action.payload;
      return state.map((candidate) =>
        candidate.id === candidateId
          ? {
              ...candidate,
              uploadedFiles: [...candidate.uploadedFiles, uploadedFile],
            }
          : candidate
      );
    },
    // updateCandidateAllFiles(state, action) {
    //   const { candidateId, changedUploadedFiles } = action.payload;
    //   return state.map((candidate) =>
    //     candidate.id === candidateId
    //       ? { ...candidate, uploadedFiles: changedUploadedFiles }
    //       : candidate
    //   );
    // },
  },
});

export default candidateSlice.reducer;
export const {
  setCandidates,
  addCandidate,
  updateCandidateInStore,
  updateCandidateFileInStore,
  updateCandidateAllFiles,
} = candidateSlice.actions;

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

export const updateCandidate = (updatedCandidate) => {
  return async (dispatch) => {
    const updatedCandidateResponse = await candidateService.updateCandidateById(
      updatedCandidate
    );

    dispatch(updateCandidateInStore(updatedCandidateResponse));
  };
};

export const uploadCandidateFile = (id, file) => {
  return async (dispatch) => {
    const uploadedCandidateResponse = await candidateService.uploadFile(
      id,
      file
    );

    dispatch(updateCandidateInStore(uploadedCandidateResponse));
  };
};

export const deleteCandidateFile = (id, fileName) => {
  return async (dispatch) => {
    const deletedCandidateFileResponse = await candidateService.deleteFile(
      id,
      fileName
    );

    dispatch(updateCandidateInStore(deletedCandidateFileResponse));
  };
};
