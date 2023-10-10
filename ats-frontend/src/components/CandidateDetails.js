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
  && {
    flex: 1;
    padding: 1rem;
  }
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
  const [notice, setNotice] = useState("initialValue");
  const [language, setLanguage] = useState("initialValue");
  const [contract, setContract] = useState("initialValue");
  const [assessment, setAssessment] = useState("initialValue");

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

  const resetFields = () => {
    setFirstName("initialValue");
    setLastName("initialValue");
    setEmail("initialValue");
    setPhone("initialValue");
    setLocation("initialValue");
    setSkill("initialValue");
    setSeniority("initialValue");
    setFirstContact("initialValue");
    setNotice("initialValue");
    setContract("initialValue");
    setLanguage("initialValue");
    setAssessment("initialValue");
  };

  const cancelEdit = () => {
    resetFields();
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

            <StyledFormControl

            // error={skillError}
            >
              <Select
                value={skill !== "initialValue" ? skill : candidate.skill}
                disabled={!editMode}
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
            </StyledFormControl>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Seniority</Typography>

            <StyledFormControl

            // error={skillError}
            >
              <Select
                value={
                  seniority !== "initialValue" ? seniority : candidate.seniority
                }
                disabled={!editMode}
                onChange={({ target }) => setSeniority(target.value)}
              >
                <MenuItem value="Intern">Intern</MenuItem>
                <MenuItem value="Junior">Junior</MenuItem>
                <MenuItem value="Regular">Regular</MenuItem>
                <MenuItem value="Senior">Senior</MenuItem>
                <MenuItem value="Lead">Lead</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
              </Select>
            </StyledFormControl>
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
            <StyledFormControl

            // error={skillError}
            >
              <Select
                value={notice !== "initialValue" ? notice : candidate.notice}
                disabled={!editMode}
                onChange={({ target }) => setNotice(target.value)}
              >
                <MenuItem value="Available now">Available now</MenuItem>
                <MenuItem value="2 weeks">2 weeks</MenuItem>
                <MenuItem value="1 month">1 month</MenuItem>
                <MenuItem value="2 months">2 months</MenuItem>
                <MenuItem value="3 months">3 months</MenuItem>
              </Select>
            </StyledFormControl>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Contract type</Typography>

            <StyledFormControl

            // error={skillError}
            >
              <Select
                value={
                  contract !== "initialValue" ? contract : candidate.contract
                }
                disabled={!editMode}
                onChange={({ target }) => setContract(target.value)}
              >
                <MenuItem value="UoP">UoP - contract of employment</MenuItem>
                <MenuItem value="B2B">B2B</MenuItem>
              </Select>
            </StyledFormControl>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">English</Typography>

            <StyledFormControl

            // error={skillError}
            >
              <Select
                value={
                  language !== "initialValue" ? language : candidate.language
                }
                disabled={!editMode}
                onChange={({ target }) => setLanguage(target.value)}
              >
                <MenuItem value="A1">A1</MenuItem>
                <MenuItem value="A2">A2</MenuItem>
                <MenuItem value="B1">B1</MenuItem>
                <MenuItem value="B2">B2</MenuItem>
                <MenuItem value="C1">C1</MenuItem>
                <MenuItem value="C2">C2</MenuItem>
                <MenuItem value="Native">Native</MenuItem>
              </Select>
            </StyledFormControl>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Assessment</Typography>

            <StyledFormControl

            // error={skillError}
            >
              <Select
                value={
                  assessment !== "initialValue"
                    ? assessment
                    : candidate.assessment
                }
                disabled={!editMode}
                onChange={({ target }) => setAssessment(target.value)}
              >
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
