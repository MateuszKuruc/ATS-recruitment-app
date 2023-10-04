import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import styled from "styled-components";
import { secondaryColor, primaryColor } from "../App";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";

const StyledPaper = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // border: 0.25rem solid #990033;
  padding: 1rem;
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
  }
`;

const CandidateDetails = ({ candidates }) => {
  const id = Number(useParams().id);

  const [editMode, setEditMode] = useState(false);
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    const foundCandidate = candidates.find((candidate) => candidate.id === id);
    setCandidate(foundCandidate);
  }, [candidates, id]);

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  const toggleNotes = () => {};

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
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {candidate.assessment && (
          <Button variant="contained" color="secondary" onChange={toggleNotes}>
            Show feedback
          </Button>
        )}

        {!candidate.assessment ? (
          <Link to={`/candidates/${candidate.id}/feedback`}>
            <Button variant="contained" color="secondary">
              Provide feedback
            </Button>
          </Link>
        ) : (
          <Link to={`/candidates/${candidate.id}/feedback`}>
            <Button variant="contained" color="secondary">
              Edit feedback
            </Button>
          </Link>
        )}
        <div>
          <StyledTextField multiline rows={8} fullWidth value={candidate.notes}>
            
          </StyledTextField>
        </div>
      </div>
      <Grid container spacing={3} style={{ marginTop: "1rem" }}>
        <Grid item xs={6} md={4}>
          <StyledPaper>
            <Typography variant="italic">First name</Typography>
            <StyledTextField
              value={candidate.firstName}
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={6} md={4}>
          <StyledPaper>
            <Typography variant="italic">Email address</Typography>
            <StyledTextField
              value={candidate.email}
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        {candidate.assessment ? (
          <Grid item xs={6} md={4}>
            <StyledPaper>
              <Typography variant="italic">Contract type</Typography>
              <StyledTextField
                value={candidate.contract}
                disabled={!editMode}
              ></StyledTextField>
            </StyledPaper>
          </Grid>
        ) : null}

        <Grid item xs={6} md={4}>
          <StyledPaper>
            <Typography variant="italic">Last name</Typography>
            <StyledTextField
              value={candidate.lastName}
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={6} md={4}>
          <StyledPaper>
            <Typography variant="italic">Phone number</Typography>
            <StyledTextField
              value={candidate.phone}
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        {candidate.assessment ? (
          <Grid item xs={6} md={4}>
            <StyledPaper>
              <Typography variant="italic">Notice period</Typography>
              <StyledTextField
                value={candidate.notice}
                disabled={!editMode}
              ></StyledTextField>
            </StyledPaper>
          </Grid>
        ) : null}

        <Grid item xs={6} md={4}>
          <StyledPaper>
            <Typography variant="italic">Location</Typography>
            <StyledTextField
              value={candidate.location}
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={6} md={4}>
          <StyledPaper>
            <Typography variant="italic">Skill</Typography>
            <StyledTextField
              value={candidate.skill}
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        {candidate.assessment ? (
          <Grid item xs={6} md={4}>
            <StyledPaper>
              <Typography variant="italic">English level</Typography>
              <StyledTextField
                value={candidate.language}
                disabled={!editMode}
              ></StyledTextField>
            </StyledPaper>
          </Grid>
        ) : null}

        {candidate.assessment ? (
          <Grid item xs={6} md={4}>
            <StyledPaper>
              <Typography variant="italic">Assessment</Typography>
              <StyledTextField
                value={candidate.assessment}
                disabled={!editMode}
              ></StyledTextField>
            </StyledPaper>
          </Grid>
        ) : null}

        <Grid item xs={6} md={4}>
          <StyledPaper>
            <Typography variant="italic">Seniority</Typography>
            <StyledTextField
              value={candidate.seniority}
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>
        <Grid item xs={6} md={4}>
          <StyledPaper>
            <Typography variant="italic">First contact</Typography>
            <StyledTextField
              value={candidate.firstContact}
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={6}>
          <Button variant="contained" color="secondary" onClick={toggleEdit}>
            {editMode ? "Save" : "Edit"}
          </Button>
          {editMode ? (
            <Button variant="contained" color="inherit" onClick={toggleEdit}>
              Cancel
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};

export default CandidateDetails;
