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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCandidate } from "../reducers/candidateReducer";

const StyledContainer = styled.div`
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
    background-color: #ffffff;
    border-radius: 0.5rem;
  }
`;

const StyledLine = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const Feedback = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState(null);
  const [assessment, setAssessment] = useState("6 - Rockstar");
  const [notice, setNotice] = useState("Available now");
  const [language, setLanguage] = useState("A1");
  const [contract, setContract] = useState("UoP");
  const [notes, setNotes] = useState("");
  const [notesError, setNotesError] = useState(false);

  console.log(assessment, notice, language, contract, notes);

  useEffect(() => {
    const fetchById = async () => {
      try {
        const candidate = await candidateService.getById(id);
        console.log("fucking candidate", candidate);
        setCandidate(candidate);
        setNotes(candidate.notes);
      } catch (error) {
        console.error("error", error);
      }
    };

    fetchById();
  }, [id]);

  const handleFeedback = () => {
    setNotesError(false);

    if (notes.length < 6) {
      setNotesError(true);
      return;
    }
    const updatedCandidate = {
      ...candidate,
      assessment,
      notice,
      language,
      contract,
      notes,
    };

    console.log("updated candidate in feedback", updatedCandidate);

    dispatch(updateCandidate(updatedCandidate));

    setAssessment("6 - Rockstar");
    setNotice("Available now");
    setLanguage("A1");
    setNotes("");

    navigate(`/candidates/${candidate.id}`);
  };

  return (
    <StyledContainer>
      <Typography
        variant="h3"
        style={{ alignSelf: "center", marginBottom: "1rem" }}
      >
        Meeting feedback
      </Typography>
      <StyledLine>
        <Typography variant="h6">Final assessment</Typography>
        <FormControl fullWidth>
          <InputLabel id="assessment">Assessment</InputLabel>
          <Select
            labelId="assessment"
            label="assessment"
            value={candidate?.assessment ? candidate.assessment : assessment}
            onChange={({ target }) => setAssessment(target.value)}
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
            labelId="noticeperiod"
            label="notice-period"
            value={candidate?.notice ? candidate.notice : notice}
            onChange={({ target }) => setNotice(target.value)}
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
            label="english"
            value={candidate?.language ? candidate.language : language}
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
        </FormControl>
      </StyledLine>
      <StyledLine>
        <Typography variant="h6">Contract type</Typography>
        <FormControl fullWidth>
          <InputLabel id="contract">Contract type</InputLabel>
          <Select
            labelId="contract"
            label="contract-type"
            value={candidate?.contract ? candidate.contract : contract}
            onChange={({ target }) => setContract(target.value)}
          >
            <MenuItem value="UoP">UoP - contract of employment</MenuItem>
            <MenuItem value="B2B">B2B</MenuItem>
          </Select>
        </FormControl>
      </StyledLine>
      <StyledLine>
        <Typography variant="h6">Notes</Typography>
        <StyledTextField
          label={notes === "" ? "Add notes here..." : ""}
          error={notesError}
          helperText={
            notesError ? "Notes need to be min. 6 characters long" : ""
          }
          value={notes}
          multiline
          rows={8}
          fullWidth
          onChange={({ target }) => setNotes(target.value)}
        />
      </StyledLine>
      <Button
        variant="contained"
        style={{ height: "3rem" }}
        onClick={handleFeedback}
      >
        Submit
      </Button>
    </StyledContainer>
  );
};

export default Feedback;
