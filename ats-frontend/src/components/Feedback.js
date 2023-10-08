import { useEffect, useState } from "react";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import candidateService from "../services/candidates";

const StyledContainer = styled.div`
  //   border: 1px solid red;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #c0d9e7;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
`;

export const StyledTextField = styled(TextField)`
  && {
    // margin-bottom: 2rem;
    background-color: #ffffff;
    border-radius: 0.5rem;
  }
`;

const StyledLine = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  //   margin-top: 1rem;
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const Feedback = ({ candidates }) => {
  const id = useParams().id;

  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    const fetchById = async () => {
      try {
        const candidate = await candidateService.getById(id);
        console.log("fucking candidate", candidate);
        setCandidate(candidate);
      } catch (error) {
        console.error("error", error);
      }
    };

    fetchById();
  }, [id]);

  const [assessment, setAssessment] = useState("");
  const [notice, setNotice] = useState("");
  const [contract, setContract] = useState("");
  const [notes, setNotes] = useState("");
  const [language, setLanguage] = useState("");

  // return <div>fuck this shit</div>;

  return (
    <StyledContainer>
      <Typography variant="h3">Meeting feedback</Typography>
      <StyledLine>
        <Typography variant="h6">Final assessment</Typography>
        <FormControl fullWidth>
          <InputLabel id="assessment">Assessment</InputLabel>
          <Select
            labelId="assessment"
            label="assessment"
            value={
              candidate?.assessment ? candidate.assessment : "6 - Rockstar"
            }
          >
            <MenuItem value="1 - Disqualified">1 - Disqualified</MenuItem>
            <MenuItem value="2 - No hire">2 - No hire</MenuItem>
            <MenuItem value="3 - Maybe">3 - Maybe</MenuItem>
            <MenuItem value="4 - Good candidate">4 - Good candidate</MenuItem>
            <MenuItem value="5 - Great candidate">5 - Great candidate</MenuItem>
            <MenuItem value="6 - Rockstar">6 - Rockstar</MenuItem>
          </Select>
        </FormControl>
      </StyledLine>
      <StyledLine>
        <Typography variant="h6">Notice period</Typography>
        <FormControl fullWidth>
          <InputLabel id="notice">Notice period</InputLabel>
          <Select
            labelId="notice"
            label="notice"
            value={candidate?.notice ? candidate.notice : "Available now"}
          >
            <MenuItem value="Available now">Available now</MenuItem>
            <MenuItem value="2 weeks">2 weeks</MenuItem>
            <MenuItem value="1 month">1 month</MenuItem>
            <MenuItem value="2 months">2 months</MenuItem>
            <MenuItem value="3 months">3 months</MenuItem>
          </Select>
        </FormControl>
      </StyledLine>
      <StyledLine>
        <Typography variant="h6">English level</Typography>
        <FormControl fullWidth>
          <InputLabel id="language">English</InputLabel>
          <Select
            labelId="language"
            label="language"
            value={candidate?.language ? candidate.language : "A1"}
          >
            <MenuItem value="A1">A1</MenuItem>
            <MenuItem value="A2">A2</MenuItem>
            <MenuItem value="B1">B1</MenuItem>
            <MenuItem value="B2">B2</MenuItem>
            <MenuItem value="C1">C1</MenuItem>
            <MenuItem value="C2">C2</MenuItem>
            <MenuItem value="Native">Native</MenuItem>
          </Select>
        </FormControl>
      </StyledLine>
      <StyledLine>
        <Typography variant="h6">Contract type</Typography>
        <FormControl fullWidth>
          <InputLabel id="contract">Contract type</InputLabel>
          <Select
            labelId="contract"
            label="contract"
            value={candidate?.contract ? candidate.contract : "UoP"}
          >
            <MenuItem value="UoP">UoP - contract of employment</MenuItem>
            <MenuItem value="B2B">B2B</MenuItem>
          </Select>
        </FormControl>
      </StyledLine>
      <StyledLine>
        <Typography variant="h6">Notes</Typography>
        <StyledTextField
          label="Add notes here..."
          multiline
          rows={8}
          fullWidth
        />
      </StyledLine>
      <Button variant="contained" style={{ height: "3rem" }}>
        Submit
      </Button>
    </StyledContainer>
  );
};

export default Feedback;
