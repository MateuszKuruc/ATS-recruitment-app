import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import styled from "styled-components";

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

    ${(props) =>
      props.disabled &&
      `
    background-color: #c0d9e7;
    border: 0.15rem solid #084c61;
    color: #ffffff
    `}
`;

const StyledButton = styled(Button)`
  width: 15rem;
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
    margin-top: 1rem;
  }
`;

const CandidateDetails = ({ candidates }) => {
  const id = useParams().id;

  const [editMode, setEditMode] = useState(false);
  const [candidate, setCandidate] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
  const [extendedFeedback, setExtendedFeedback] = useState(false);

  const notesShown = { display: showNotes ? "" : "none" };

  useEffect(() => {
    const foundCandidate = candidates.find((candidate) => candidate.id === id);
    setCandidate(foundCandidate);
    console.log("candidate details", foundCandidate);
  }, [candidates, id]);

  useEffect(() => {
    candidate?.assessment !== ""
      ? setExtendedFeedback(true)
      : setExtendedFeedback(false);
  }, [candidate]);

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };

  if (!candidate) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: "#c0d9e7",
        padding: "2rem",
        marginTop: "1rem",
        borderRadius: "0.5rem",
        marginBottom: "1rem",
      }}
    >
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginBottom: "1rem",
          backgroundColor: "#084c61",
          padding: "1rem",
          borderRadius: "0.5rem",
        }}
      > */}
      <StyledHeader>
        <Typography variant="h3" style={{ color: "#ffffff" }}>
          {candidate.firstName} {candidate.lastName}
        </Typography>
      </StyledHeader>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        {candidate.assessment && (
          <div>
            <StyledButton
              variant="contained"
              color="secondary"
              onClick={toggleNotes}
            >
              {showNotes ? "Hide feedback" : "Show feedback"}
            </StyledButton>
          </div>
        )}

        {!candidate.assessment ? (
          <Link to={`/candidates/${candidate.id}/feedback`}>
            <StyledButton variant="contained" color="secondary">
              Provide feedback
            </StyledButton>
          </Link>
        ) : (
          <Link to={`/candidates/${candidate.id}/feedback`}>
            <StyledButton variant="contained" color="secondary">
              Edit feedback
            </StyledButton>
          </Link>
        )}

        <Grid item xs={12} style={{ display: "flex", gap: "0.5rem" }}>
          <StyledButton
            variant="contained"
            color={!editMode ? "secondary" : "primary"}
            onClick={toggleEdit}
          >
            {editMode ? "Save" : "Edit"}
          </StyledButton>
          {editMode ? (
            <StyledButton
              variant="contained"
              color="inherit"
              onClick={toggleEdit}
            >
              Cancel
            </StyledButton>
          ) : null}
        </Grid>

        <div className="notesShown" style={notesShown}>
          <StyledTextField
            style={{ marginBottom: "0rem" }}
            inputProps={{
              readOnly: true,
            }}
            multiline
            rows={8}
            fullWidth
            value={candidate.notes}
          ></StyledTextField>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginBottom: "1rem",
          backgroundColor: "#084c61",
          padding: "1rem",
          borderRadius: "0.5rem",
        }}
      >
        <Typography variant="h3" style={{ color: "#ffffff" }}>
          Basic details
        </Typography>
      </div>

      <Grid container spacing={3} style={{ marginTop: "1rem" }}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">First name</Typography>
            <StyledTextField
              value={candidate.firstName}
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Last name</Typography>
            <StyledTextField
              value={candidate.lastName}
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Email address</Typography>
            <StyledTextField
              value={candidate.email}
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Phone number</Typography>
            <StyledTextField
              value={candidate.phone}
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Location</Typography>
            <StyledTextField
              value={candidate.location}
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Skill</Typography>
            <StyledTextField
              value={candidate.skill}
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

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

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginBottom: "1rem",
          backgroundColor: "#084c61",
          padding: "1rem",
          borderRadius: "0.5rem",
        }}
      >
        <Typography variant="h3" style={{ color: "#ffffff" }}>
          Extended feedback
        </Typography>
      </div>

      <Grid container spacing={3} style={{ marginTop: "1rem" }}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Notice period</Typography>
            <StyledTextField
              value={candidate.notice}
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Contract type</Typography>
            <StyledTextField
              value={candidate.contract}
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">English level</Typography>
            <StyledTextField
              value={candidate.language}
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Assessment</Typography>
            <StyledTextField
              value={candidate.assessment}
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CandidateDetails;
