import { useState } from "react";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const StyledContainer = styled.div``;

const Feedback = ({ candidates }) => {
  const id = Number(useParams().id);
  const candidate = candidates.find((candidate) => candidate.id === id);
  console.log("id", candidate.assessment);

  const [assessment, setAssessment] = useState("");

  return (
    <StyledContainer>
      <Typography variant="h3">Meeting feedback</Typography>
      <FormControl fullWidth>
        <InputLabel id="assessment">Assessment</InputLabel>
        <Select
          labelId="assessment"
          label="assessment"
          value={candidate.assessment}
        >
          <MenuItem value="1 - Disqualified">1 - Disqualified</MenuItem>
          <MenuItem value="2 - No hire">2 - No hire</MenuItem>
          <MenuItem value="3 - Maybe">3 - Maybe</MenuItem>
          <MenuItem value="4 - Good candidate">4 - Good candidate</MenuItem>
          <MenuItem value="5 - Great candidate">5 - Great candidate</MenuItem>
          <MenuItem value="6 - Rockstar">6 - Rockstar</MenuItem>
        </Select>
      </FormControl>
    </StyledContainer>
  );
};

export default Feedback;
