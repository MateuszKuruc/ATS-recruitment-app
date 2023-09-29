import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import styled from "styled-components";
import { secondaryColor, primaryColor } from "../App";

const StyledPaper = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0.25rem solid #990033;
  padding: 1rem;
`;

const StyledTextField = styled(TextField)`
  && {
    margin-top: 2rem;
    margin-bottom: 2rem;
    background-color: #ffffff;
    border-radius: 0.5rem;
    padding-right: 3rem;
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

  if (!candidate) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: primaryColor,
        padding: "2rem",
        marginTop: "1rem",
        borderRadius: "0.5rem",
      }}
    >
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
            <Typography variant="italic">Location</Typography>
            <StyledTextField
              value={candidate.location}
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
            <Typography variant="italic">Phone number</Typography>
            <StyledTextField
              value={candidate.phone}
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Specialization</Typography>
            <StyledTextField
              value={candidate.skill}
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
        <Grid item xs={12}>
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
