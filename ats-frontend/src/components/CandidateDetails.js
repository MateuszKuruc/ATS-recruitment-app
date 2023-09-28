import { useParams } from "react-router-dom";
import { useState } from "react";
import { Grid, Paper, Typography, TextField } from "@mui/material";
import styled from "styled-components";
import { secondaryColor, primaryColor } from "../App";

const StyledPaper = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0.5rem solid;
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
  const [editOn, setEditOn] = useState(false);
  const [editOff, setEditOff] = useState(true);

  console.log("candidates details", candidates);
  const id = Number(useParams().id);
  console.log("id", id);
  const candidate = candidates.find((candidate) => candidate.id === id);

  if (!candidate) {
    return null;
  }

  return (
    <div style={{ backgroundColor: primaryColor, padding: "2rem"}}>
      <Grid container spacing={3} style={{ marginTop: "1rem" }}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="italic">First name</Typography>
            <StyledTextField
              value={candidate.firstName}
              label="First name"
            ></StyledTextField>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
          <Typography variant="italic">Location</Typography>
            <StyledTextField value={candidate.location}></StyledTextField>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
          <Typography variant="italic">Last name</Typography>
            <StyledTextField value={candidate.lastName}></StyledTextField>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
          <Typography variant="italic">Phone number</Typography>
            <StyledTextField value={candidate.phone}></StyledTextField>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
          <Typography variant="italic">Specialization</Typography>
            <StyledTextField value={candidate.skill}></StyledTextField>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
          <Typography variant="italic">Email address</Typography>
            <StyledTextField value={candidate.email}></StyledTextField>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
          <Typography variant="italic">Seniority</Typography>
            <StyledTextField value={candidate.seniority}></StyledTextField>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
          <Typography variant="italic">First contact date</Typography>
            <StyledTextField value={candidate.firstContact}></StyledTextField>
          </StyledPaper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CandidateDetails;
