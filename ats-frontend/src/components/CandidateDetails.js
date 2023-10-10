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
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import styled from "styled-components";

import { removeCandidate } from "../reducers/candidateReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import candidateService from "../services/candidates";
import { updateCandidate } from "../reducers/candidateReducer";

import { format } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers";

const StyledPaper = styled(Paper)`
  display: flex;
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
    background-color: #ffffff;
    border-radius: 0.5rem;
    // padding-right: 3rem;
    // width: auto
    width: 15rem;
    border: 0.15rem solid  #990033;

    ${(props) =>
      props.disabled &&
      `
    // background-color: #c0d9e7;
    // border: 0.15rem solid #084c61;
    border: 0.15rem solid  #990033;
    color: #ffffff
    `}
`;

const StyledFormControl = styled(FormControl)`
&& {
  margin-top: 2rem;
  margin-bottom: 2rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  width: 15rem;
  border: 0.15rem solid  #990033;
`;

const StyledButton = styled(Button)`
  flex: 1;
`;

const StyledHeader = styled.div`
  && {
    display: flex;
    justify-content: center;
    align-content: center;
    margin-bottom: 1rem;
    background-color: #084c61;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
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

  const [firstName, setFirstName] = useState("initialValue");
  const [lastName, setLastName] = useState("initialValue");
  const [email, setEmail] = useState("initialValue");
  const [phone, setPhone] = useState("initialValue");
  const [location, setLocation] = useState("initialValue");
  const [skill, setSkill] = useState("initialValue");
  const [seniority, setSeniority] = useState("initialValue");
  const [firstContact, setFirstContact] = useState("initialValue");
  // const [email, setEmail] = useState("initialValue");
  // const [email, setEmail] = useState("initialValue");

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

  const toggleEdit = () => {
    setEditMode(!editMode);
    if (candidate.assessment !== "") {
      setEditModeExtended(!editModeExtended);
    }
  };

  const cancelEdit = () => {
    setFirstName("initialValue");
    toggleEdit();
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
          onClick={toggleEdit}
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
        ></StyledTextField>
      </div>

      <StyledHeader>
        <Typography variant="h3" style={{ color: "#ffffff" }}>
          Basic details
        </Typography>
      </StyledHeader>

      <Grid container spacing={3} style={{ marginTop: "1rem" }}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">First name</Typography>
            <StyledTextField
              value={
                firstName !== "initialValue" ? firstName : candidate.firstName
              }
              disabled={!editMode}
              onChange={({ target }) => setFirstName(target.value)}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Last name</Typography>
            <StyledTextField
              value={
                lastName !== "initialValue" ? lastName : candidate.lastName
              }
              disabled={!editMode}
              onChange={({ target }) => setLastName(target.value)}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Email address</Typography>
            <StyledTextField
              value={email !== "initialValue" ? email : candidate.email}
              disabled={!editMode}
              onChange={({ target }) => setEmail(target.value)}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Phone number</Typography>
            <StyledTextField
              value={phone !== "initialValue" ? phone : candidate.phone}
              disabled={!editMode}
              onChange={({ target }) => setPhone(target.value)}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Location</Typography>
            <StyledTextField
              value={
                location !== "initialValue" ? location : candidate.location
              }
              disabled={!editMode}
              onChange={({ target }) => setLocation(target.value)}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Skill</Typography>
            {/* <StyledTextField
               value={skill !== "initialValue" ? skill : candidate.skill}
               disabled={!editMode}
               onChange={({ target }) => setSkill(target.value)}
            ></StyledTextField> */}

            <StyledFormControl
            // fullWidth
            // error={skillError}
            >
              {/* <InputLabel id="skill">Skill</InputLabel> */}
              <Select
                // labelId="skill"
                // label="Skill"
                value={skill !== "initialValue" ? skill : candidate.skill}
                disabled={!editMode}
                onChange={({ target }) => setSkill(target.value)}
                sx={{ input: { color: "white" } }}
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
            </StyledFormControl>
          </StyledPaper>
        </Grid>

        {/* <FormControl 
        fullWidth 
        // error={skillError}
        >
              <InputLabel id="skill">Skill</InputLabel>
              <Select
                labelId="skill"
                label="Skill"
                value={skill}
                onChange={({ target }) => setSkill(target.value)}
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
            </FormControl> */}

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Seniority</Typography>
            <StyledTextField
              value={candidate.seniority}
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">First contact</Typography>
            <StyledTextField
              value={candidate.firstContact}
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>
      </Grid>

      <StyledHeader>
        <Typography variant="h3" style={{ color: "#ffffff" }}>
          Extended feedback
        </Typography>
      </StyledHeader>

      <Grid container spacing={3} style={{ marginTop: "1rem" }}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Notice period</Typography>
            <StyledTextField
              value={candidate.notice}
              disabled={!editModeExtended}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Contract type</Typography>
            <StyledTextField
              value={candidate.contract}
              disabled={!editModeExtended}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">English level</Typography>
            <StyledTextField
              value={candidate.language}
              disabled={!editModeExtended}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Assessment</Typography>
            <StyledTextField
              value={candidate.assessment}
              disabled={!editModeExtended}
            ></StyledTextField>
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
