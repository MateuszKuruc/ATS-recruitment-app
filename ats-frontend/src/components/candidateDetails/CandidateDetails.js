import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import styled from "styled-components";

import { removeCandidate } from "../../reducers/candidateReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  updateCandidate,
  uploadCandidateFile,
} from "../../reducers/candidateReducer";

import { format } from "date-fns";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import { downloadFile } from "../../services/candidates";

import CandidateBasicDetails from "./CandidateBasicDetails";
import CandidateExtendedFeedback from "./CandidateExtendedFeedback";
import CandidateFiles from "./CandidateFiles";

import { validateEditForCandidate } from "../../utils/validationService";

const StyledTextField = styled(TextField)`
  && {
    margin-top: 2rem;
    margin-bottom: 2rem;
    background-color: #ffffff;
    border-radius: 0.5rem;
    // padding-right: 3rem;
    // width: auto;
    // width: 15rem;
    // border: 0.15rem solid  #990033;

    ${(props) =>
      props.disabled &&
      `
    // background-color: #c0d9e7;
    border: 0.15rem solid #084c61;
    // border: 0.15rem solid  #990033;
    // color: #ffffff
    `}
`;

const StyledButton = styled(Button)`
  && {
    flex: 1;
    padding: 1rem;
  }
`;

const StyledHeader = styled.div`
  && {
    display: flex;
    justify-content: space-around;
    align-content: center;
    margin-bottom: 1rem;
    background-color: #084c61;
    padding: 0.25rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    // width: 80%;
  }
`;

// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

const CandidateDetails = ({ candidates }) => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [candidate, setCandidate] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
  const [editModeExtended, setEditModeExtended] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [locationError, setLocationError] = useState(false);

  const [editedCandidate, setEditedCandidate] = useState({ ...candidate });

  const handleCandidateValidation = () => {
    const errors = validateEditForCandidate(editedCandidate);

    setFirstNameError(errors.firstName);
    setLastNameError(errors.lastName);
    setEmailError(errors.email);
    setPhoneError(errors.phone);
    setLocationError(errors.location);

    return !Object.values(errors).some((error) => error);
  };

  const openDialogWindow = () => {
    setOpenDialog(true);
  };

  const closeDialogWindow = () => {
    setOpenDialog(false);
  };

  const notesShown = {
    display: showNotes ? "flex" : "none",
  };

  useEffect(() => {
    const foundCandidate = candidates.find((candidate) => candidate.id === id);
    setCandidate(foundCandidate);
  }, [candidates, id]);

  const enterEditMode = () => {
    setEditMode(true);
    setEditedCandidate({ ...candidate });
    console.log("edited in edit", editedCandidate);
    if (candidate.assessment !== "") {
      setEditModeExtended(!editModeExtended);
    }
  };

  const saveEdit = () => {
    if (!handleCandidateValidation()) {
      return;
    }

    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPhoneError(false);
    setLocationError(false);

    const updatedCandidate = {
      ...editedCandidate,
      edit: format(new Date(), "yyyy-MM-dd, HH:mm:ss"),
    };

    dispatch(updateCandidate(updatedCandidate));
    setEditMode(false);
  };

  const cancelEdit = () => {
    setEditedCandidate({ ...candidate });

    setEditMode(false);
  };

  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };

  const deleteCandidate = (id) => {
    dispatch(removeCandidate(id));
    navigate("/candidates");
  };

  // const onFileChange = (e) => {
  //   const file = e.target.files[0];

  //   if (!file) {
  //     return;
  //   }
  //   console.log("file in onFileChange", file);
  //   dispatch(uploadCandidateFile(candidate.id, file));
  // };

  // const handleDownload = (fileName) => {
  //   console.log("file name in handledownload", fileName);
  //   downloadFile(fileName);
  // };

  if (!candidate) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: "#c0d9e7",
        paddingRight: "2rem",
        paddingLeft: "2rem",
        paddingBottom: "2rem",
        marginTop: "1rem",
        borderRadius: "0.5rem",
        marginBottom: "1rem",
      }}
    >
      <StyledHeader>
        <Typography variant="h3" style={{ color: "#ffffff" }}>
          <i>
            {candidate.firstName} {candidate.lastName}
          </i>
        </Typography>
        <Typography
          variant="italic2"
          style={{ color: "#fefefe", alignSelf: "center" }}
        >
          Last edited: {candidate.edit}
        </Typography>
      </StyledHeader>

      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          flex: "1",
        }}
      >
        {candidate.assessment && (
          <StyledButton
            variant="contained"
            color="secondary"
            onClick={toggleNotes}
          >
            {showNotes ? (
              <Typography variant="h6">Hide feedback</Typography>
            ) : (
              <Typography variant="h6">Show feedback</Typography>
            )}
          </StyledButton>
        )}

        {!candidate.assessment ? (
          <StyledButton
            variant="contained"
            color="secondary"
            component={Link}
            to={`/candidates/${candidate.id}/feedback`}
          >
            <Typography variant="h6">Provide feedback</Typography>
          </StyledButton>
        ) : (
          <StyledButton
            variant="contained"
            color="secondary"
            component={Link}
            to={`/candidates/${candidate.id}/feedback`}
          >
            <Typography variant="h6">Edit feedback</Typography>
          </StyledButton>
        )}

        <StyledButton
          variant="contained"
          color={!editMode ? "secondary" : "primary"}
          onClick={!editMode ? () => enterEditMode() : () => saveEdit()}
        >
          {editMode ? (
            <Typography variant="h6">Save</Typography>
          ) : (
            <Typography variant="h6">Edit</Typography>
          )}
        </StyledButton>
        {editMode ? (
          <StyledButton
            variant="contained"
            color="inherit"
            onClick={cancelEdit}
          >
            <Typography variant="h6">Cancel</Typography>
          </StyledButton>
        ) : null}
      </div>

      <div className="notesShown" style={notesShown}>
        <StyledTextField
          inputProps={{
            readOnly: true,
          }}
          multiline
          rows={10}
          value={candidate.notes}
          style={{ flex: "1" }}
        />
      </div>

      <StyledHeader>
        <Typography variant="h5" style={{ color: "#ffffff" }}>
          Files
        </Typography>
      </StyledHeader>

      {/* <div
        style={{
          // border: "1px solid red",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Button
          component="label"
          variant="contained"
          color="secondary"
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput
            type="file"
            name="file_upload"
            accept=".pdf, .doc, .docx"
            onChange={onFileChange}
          />
        </Button>
        {candidate.uploadedFiles.map((file) => (
          <div key={file.fileName}>
            <CloudDownloadIcon onClick={() => handleDownload(file.fileName)} />
          </div>
        ))}
      </div> */}

      <CandidateFiles candidate={candidate} />

      <CandidateBasicDetails
        candidate={candidate}
        setEditedCandidate={setEditedCandidate}
        editedCandidate={editedCandidate}
        editMode={editMode}
        firstNameError={firstNameError}
        lastNameError={lastNameError}
        emailError={emailError}
        phoneError={phoneError}
        locationError={locationError}
      />

      <CandidateExtendedFeedback
        candidate={candidate}
        setEditedCandidate={setEditedCandidate}
        editedCandidate={editedCandidate}
        editModeExtended={editModeExtended}
      />

      <div
        style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}
      >
        <StyledButton
          variant="contained"
          color="secondary"
          onClick={openDialogWindow}
        >
          <Typography variant="h6">Delete profile</Typography>
        </StyledButton>
        <Dialog
          open={openDialog}
          onClose={closeDialogWindow}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete candidate's profile?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action will delete all data connected with candidate from the
              database. Deleting a profile is irreversible.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteCandidate(candidate.id)}
            >
              <Typography variant="h6">Confirm</Typography>
            </Button>
            <Button variant="outlined" onClick={closeDialogWindow} autoFocus>
              <Typography variant="h6">Cancel</Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default CandidateDetails;
