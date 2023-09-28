import { useParams } from "react-router-dom";
import { useState } from "react";
import { StyledTextField } from "./AddProfile";
import { Grid, Paper } from "@mui/material";

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
    <div>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Paper>
            <StyledTextField value={candidate.firstName}></StyledTextField>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper>
            <StyledTextField value={candidate.location}></StyledTextField>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <StyledTextField value={candidate.lastName}></StyledTextField>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <StyledTextField value={candidate.phone}></StyledTextField>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <StyledTextField value={candidate.skill}></StyledTextField>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <StyledTextField value={candidate.email}></StyledTextField>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <StyledTextField value={candidate.seniority}></StyledTextField>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <StyledTextField value={candidate.firstContact}></StyledTextField>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CandidateDetails;
