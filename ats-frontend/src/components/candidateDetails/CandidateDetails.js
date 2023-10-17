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

import { updateCandidate } from "../../reducers/candidateReducer";

import { format } from "date-fns";

import CandidateBasicDetails from "./CandidateBasicDetails";
import CandidateExtendedFeedback from "./CandidateExtendedFeedback";
import CandidateFiles from "./CandidateFiles";

import { validateEditForCandidate } from "../../utils/validationService";

import { setNotification } from "../../reducers/notificationReducer";

import useMediaQuery from "@mui/material/useMediaQuery";

const StyledTextField = styled(TextField)`
  && {
    margin-top: 2rem;
    margin-bottom: 2rem;
    background-color: #ffffff;
    border-radius: 0.5rem;
    flex: 1;
    ${(props) =>
      props.disabled &&
      `
    border: 0.15rem solid #084c61;
    `}
`;

const StyledHeader = styled.div`
  && {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 1rem;
    background-color: #084c61;
    background-color: #25283d;
    border-radius: 0.5rem;
    margin-top: 2rem;
    padding: 1rem;
    gap: 0.5rem;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
`;

const Container = styled.div`
  background-color: #c0d9e7;
  background-color: #ebcbf4;
  padding-right: 2rem;
  padding-left: 2rem;
  padding-bottom: 2rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    padding: 0;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }
`;

const StyledTypography = styled(Typography)`
  color: #ffffff;
`;

const StyledEditTypography = styled(Typography)`
  color: #fefefe;
  align-self: center;
`;

const FeedbackButton = styled(Button)`
  && {
    flex: 1;
    padding: 1rem;

    // background-color: #ffba49;

    @media (max-width: 768px) {
      max-width: 100%;
    }
  }
`;

const FeedbackTypography = styled(Typography)`
  // color: #25283d;
`;

const UpperButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  // flex: 1;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const BottomButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

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

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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
    marginBottom: "0",
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
      dispatch(
        setNotification({
          severity: "error",
          message:
            "Something went wrong. Please correct the mistakes before saving.",
        })
      );
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

    dispatch(
      setNotification({
        severity: "success",
        message: "Candidate profile updated successfully!",
      })
    );
    dispatch(updateCandidate(updatedCandidate));
    setEditMode(false);
    setEditModeExtended(false);
  };

  const cancelEdit = () => {
    setEditedCandidate({ ...candidate });

    setEditMode(false);
    setEditModeExtended(false);
  };

  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };

  const deleteCandidate = (id) => {
    dispatch(removeCandidate(id));
    navigate("/candidates");
  };

  if (!candidate) {
    return null;
  }

  return (
    <Container>
      <StyledHeader>
        <StyledTypography variant="h3">
          <i>
            {candidate.firstName} {candidate.lastName}
          </i>
        </StyledTypography>
        <StyledEditTypography variant="italic2">
          Last edited: {candidate.edit}
        </StyledEditTypography>
      </StyledHeader>

      <UpperButtonContainer>
        {candidate.assessment && (
          <FeedbackButton
            variant="contained"
            color="secondary"
            onClick={toggleNotes}
          >
            {showNotes ? (
              <FeedbackTypography variant="h6">Hide notes</FeedbackTypography>
            ) : (
              <FeedbackTypography variant="h6">Show notes</FeedbackTypography>
            )}
          </FeedbackButton>
        )}

        {!candidate.assessment ? (
          <FeedbackButton
            variant="contained"
            color="secondary"
            component={Link}
            to={`/candidates/${candidate.id}/feedback`}
          >
            <FeedbackTypography variant="h6">
              Provide feedback
            </FeedbackTypography>
          </FeedbackButton>
        ) : (
          <FeedbackButton
            variant="contained"
            color="secondary"
            component={Link}
            to={`/candidates/${candidate.id}/feedback`}
          >
            <FeedbackTypography variant="h6">Edit feedback</FeedbackTypography>
          </FeedbackButton>
        )}
      </UpperButtonContainer>
      <div className="notesShown" style={notesShown}>
        <StyledTextField
          inputProps={{
            readOnly: true,
          }}
          multiline
          rows={10}
          value={candidate.notes}
        />
      </div>

      {/* <StyledHeader>
        <StyledTypography variant="h5">Files</StyledTypography>
      </StyledHeader>

      <StyledButton variant="contained" color="secondary">
        <Typography variant="h6">Files</Typography>
      </StyledButton> */}

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
        enterEditMode={enterEditMode}
        saveEdit={saveEdit}
        cancelEdit={cancelEdit}
        isSmallScreen={isSmallScreen}
      />

      <CandidateExtendedFeedback
        candidate={candidate}
        setEditedCandidate={setEditedCandidate}
        editedCandidate={editedCandidate}
        editModeExtended={editModeExtended}
        isSmallScreen={isSmallScreen}
      />

      <BottomButtonContainer>
        {/* <StyledButton */}
        <FeedbackButton
          variant="contained"
          color="secondary"
          onClick={openDialogWindow}
        >
          <FeedbackTypography variant="h6">Delete profile</FeedbackTypography>
        </FeedbackButton>
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
            <Button variant="outlined" color="secondary" onClick={closeDialogWindow} autoFocus>
              <Typography variant="h6">Cancel</Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </BottomButtonContainer>
    </Container>
  );
};

export default CandidateDetails;
