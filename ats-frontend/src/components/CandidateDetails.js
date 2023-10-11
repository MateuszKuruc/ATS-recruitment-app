import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import styled from "styled-components";

import { removeCandidate } from "../reducers/candidateReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateCandidate } from "../reducers/candidateReducer";

import { format } from "date-fns";
import { isEmailValid, isPhoneNumberValid } from "./AddProfile";

import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  // border: 0.25rem solid #990033;
  padding: 1rem;
  padding-right: 2rem;
  padding-left: 2rem;
  // margin-bottom: 0;
  gap: 0.25rem;
`;

const StyledTextField = styled(TextField)`
  && {
    margin-top: 2rem;
    margin-bottom: 2rem;
    // background-color: #ffffff;
    border-radius: 0.5rem;
    // padding-right: 3rem;
    // width: auto
    width: 15rem;
    // border: 0.15rem solid  #990033;

    ${(props) =>
      props.disabled &&
      `
    // background-color: #c0d9e7;
    // border: 0.15rem solid #084c61;
    // border: 0.15rem solid  #990033;
    color: #ffffff
    `}
`;

const StyledDatePicker = styled(DatePicker)`
  && {
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-radius: 0.5rem;
  }
`;

const StyledFormControl = styled(FormControl)`
&& {
  margin-top: 2rem;
  margin-bottom: 2rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  width: 15rem;
  // border: 0.15rem solid  #990033;
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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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

  const validateEdit = () => {
    console.log("edited cand in validation", editedCandidate);
    const errors = {
      firstName:
        editedCandidate.firstName.length < 2 ||
        editedCandidate.firstName === "",
      lastName:
        editedCandidate.lastName.length < 2 || editedCandidate.lastName === "",
      email: !isEmailValid(editedCandidate.email),
      phone: !isPhoneNumberValid(editedCandidate.phone),
      location:
        editedCandidate.location.length < 3 || editedCandidate.location === "",
    };

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
    if (!validateEdit()) {
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

  const onFileChange = (e) => {
    const file = e.target.files[0];

    console.log(e.target.files[0]);

    const formData = new FormData();
    formData.append("file", file);
  };

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

      <div
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
      </div>

      <StyledHeader>
        <Typography variant="h5" style={{ color: "#ffffff" }}>
          Basic details
        </Typography>
      </StyledHeader>

      <Grid container spacing={0.5} style={{ marginTop: "1rem" }}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">First name</Typography>
            <StyledTextField
              value={editMode ? editedCandidate.firstName : candidate.firstName}
              disabled={!editMode}
              error={firstNameError}
              helperText={
                firstNameError ? "Enter valid name, min. 2 characters" : " "
              }
              onChange={({ target }) =>
                setEditedCandidate({
                  ...editedCandidate,
                  firstName: target.value,
                })
              }
            />
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Last name</Typography>
            <StyledTextField
              value={editMode ? editedCandidate.lastName : candidate.lastName}
              disabled={!editMode}
              error={lastNameError}
              helperText={
                lastNameError ? "Enter valid name, min. 2 characters" : " "
              }
              onChange={({ target }) =>
                setEditedCandidate({
                  ...editedCandidate,
                  lastName: target.value,
                })
              }
            />
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Email address</Typography>
            <StyledTextField
              value={editMode ? editedCandidate.email : candidate.email}
              disabled={!editMode}
              error={emailError}
              helperText={emailError ? "Enter email in valid format" : " "}
              onChange={({ target }) =>
                setEditedCandidate({ ...editedCandidate, email: target.value })
              }
            />
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Phone number</Typography>
            <StyledTextField
              value={editMode ? editedCandidate.phone : candidate.phone}
              disabled={!editMode}
              error={phoneError}
              helperText={phoneError ? "Enter number in valid format" : " "}
              onChange={({ target }) =>
                setEditedCandidate({ ...editedCandidate, phone: target.value })
              }
            />
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Location</Typography>
            <StyledTextField
              value={editMode ? editedCandidate.location : candidate.location}
              error={locationError}
              helperText={locationError ? "Enter location" : " "}
              disabled={!editMode}
              onChange={({ target }) =>
                setEditedCandidate({
                  ...editedCandidate,
                  location: target.value,
                })
              }
            />
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Skill</Typography>

            <StyledFormControl>
              <Select
                value={editMode ? editedCandidate.skill : candidate.skill}
                disabled={!editMode}
                onChange={({ target }) =>
                  setEditedCandidate({
                    ...editedCandidate,
                    skill: target.value,
                  })
                }
              >
                <MenuItem value="Java">Java</MenuItem>
                <MenuItem value="Python">Python</MenuItem>
                <MenuItem value="JavaScript">JavaScript</MenuItem>
                <MenuItem value="C">C/C#/C++</MenuItem>
                <MenuItem value="Scala">Scala</MenuItem>
                <MenuItem value="BigData">Big Data</MenuItem>
                <MenuItem value="DevOps">DevOps</MenuItem>
                <MenuItem value="Mobile">Mobile</MenuItem>
                <MenuItem value="Golang">Golang</MenuItem>
              </Select>
              <FormHelperText> </FormHelperText>
            </StyledFormControl>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Seniority</Typography>

            <StyledFormControl>
              <Select
                value={
                  editMode ? editedCandidate.seniority : candidate.seniority
                }
                disabled={!editMode}
                onChange={({ target }) =>
                  setEditedCandidate({
                    ...editedCandidate,
                    seniority: target.value,
                  })
                }
              >
                <MenuItem value="Intern">Intern</MenuItem>
                <MenuItem value="Junior">Junior</MenuItem>
                <MenuItem value="Regular">Regular</MenuItem>
                <MenuItem value="Senior">Senior</MenuItem>
                <MenuItem value="Lead">Lead</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
              </Select>
              <FormHelperText> </FormHelperText>
            </StyledFormControl>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">First contact</Typography>

            <StyledDatePicker
              slotProps={{
                textField: {
                  helperText: " ",
                },
              }}
              defaultValue={
                editMode
                  ? dayjs(editedCandidate.firstContact)
                  : dayjs(candidate.firstContact)
              }
              disabled={!editMode}
              onChange={(target) =>
                setEditedCandidate({
                  ...editedCandidate,
                  firstContact: dayjs(target),
                })
              }
            />
          </StyledPaper>
        </Grid>
      </Grid>

      <StyledHeader>
        <Typography variant="h5" style={{ color: "#ffffff" }}>
          Extended feedback
        </Typography>
      </StyledHeader>

      <Grid container spacing={0.5} style={{ marginTop: "1rem" }}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Notice period</Typography>
            <StyledFormControl>
              <Select value={candidate.notice} disabled={!editMode}>
                <MenuItem value="Available now">Available now</MenuItem>
                <MenuItem value="2 weeks">2 weeks</MenuItem>
                <MenuItem value="1 month">1 month</MenuItem>
                <MenuItem value="2 months">2 months</MenuItem>
                <MenuItem value="3 months">3 months</MenuItem>
              </Select>
              <FormHelperText> </FormHelperText>
            </StyledFormControl>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Contract type</Typography>

            <StyledFormControl>
              <Select value={candidate.contract} disabled={!editMode}>
                <MenuItem value="UoP">UoP - contract of employment</MenuItem>
                <MenuItem value="B2B">B2B</MenuItem>
              </Select>
              <FormHelperText> </FormHelperText>
            </StyledFormControl>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">English</Typography>

            <StyledFormControl>
              <Select value={candidate.language} disabled={!editMode}>
                <MenuItem value="A1">A1</MenuItem>
                <MenuItem value="A2">A2</MenuItem>
                <MenuItem value="B1">B1</MenuItem>
                <MenuItem value="B2">B2</MenuItem>
                <MenuItem value="C1">C1</MenuItem>
                <MenuItem value="C2">C2</MenuItem>
                <MenuItem value="Native">Native</MenuItem>
              </Select>
              <FormHelperText> </FormHelperText>
            </StyledFormControl>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Assessment</Typography>

            <StyledFormControl>
              <Select value={candidate.assessment} disabled={!editMode}>
                <MenuItem value="1 - Disqualified">1 - Disqualified</MenuItem>
                <MenuItem value="2 - No hire">2 - No hire</MenuItem>
                <MenuItem value="3 - Maybe">3 - Maybe</MenuItem>
                <MenuItem value="4 - Good candidate">
                  4 - Good candidate
                </MenuItem>
                <MenuItem value="5 - Great candidate">
                  5 - Great candidate
                </MenuItem>
                <MenuItem value="6 - Rockstar">6 - Rockstar</MenuItem>
              </Select>
              <FormHelperText> </FormHelperText>
            </StyledFormControl>
          </StyledPaper>
        </Grid>
      </Grid>
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
