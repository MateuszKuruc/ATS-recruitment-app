import { useParams } from "react-router-dom";
import { useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import styled from "styled-components";
import { secondaryColor, primaryColor } from "../App";

const StyledPaper = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0.5rem solid #990033;
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
  const [editMode, setEditMode] = useState(false);

  console.log("candidates details", candidates);
  const id = Number(useParams().id);
  console.log("id", id);
  const candidate = candidates.find((candidate) => candidate.id === id);

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  if (!candidate) {
    return null;
  }

  return (
    <div style={{ backgroundColor: primaryColor, padding: "2rem" }}>
      <Grid container spacing={3} style={{ marginTop: "1rem" }}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">First name</Typography>
            <StyledTextField
              value={candidate.firstName}
              label="First name"
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Location</Typography>
            <StyledTextField
              value={candidate.location}
              label="Location"
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Last name</Typography>
            <StyledTextField
              value={candidate.lastName}
              label="Last name"
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Phone number</Typography>
            <StyledTextField
              value={candidate.phone}
              label="Phone number"
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Specialization</Typography>
            <StyledTextField
              value={candidate.skill}
              label="Specialization"
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Email address</Typography>
            <StyledTextField
              value={candidate.email}
              label="Email address"
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">Seniority</Typography>
            <StyledTextField
              value={candidate.seniority}
              label="Seniority"
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">First contact</Typography>
            <StyledTextField
              value={candidate.firstContact}
              label="First contact"
              disabled={!editMode}
            ></StyledTextField>
          </StyledPaper>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" onClick={toggleEdit}>
            {editMode ? "Save" : "Edit"}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CandidateDetails;
