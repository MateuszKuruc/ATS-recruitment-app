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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCandidate } from "../../reducers/candidateReducer";
import format from "date-fns/format";
import { setNotification } from "../../reducers/notificationReducer";
import useMediaQuery from "@mui/material/useMediaQuery";
import AnimatedPage from "../Layout/AnimatedPage";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #ebcbf4;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  flex: 1;
`;

const StyledTextField = styled(TextField)`
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

const StyledButton = styled(Button)`
  height: 3rem;
  flex: 1;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledHeader = styled.div`
  display: flex;
  background-color: #25283d;
  padding: 1rem;
  border-radius: 0.5rem;
  justify-content: center;
  color: #ffffff;
`;

const StyledTypography = styled(Typography)``;

const Feedback = ({ candidates }) => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState(null);
  const [notesError, setNotesError] = useState(false);
  const [editedCandidate, setEditedCandidate] = useState(null);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const defaultValues = {
    assessment: "6 - Rockstar",
    notice: "Available now",
    language: "A1",
    contract: "UoP",
    notes: "",
  };

  useEffect(() => {
    const candidate = candidates.find((candidate) => candidate.id === id);
    setCandidate(candidate);
    setEditedCandidate({ ...candidate });
  }, [candidates, id]);

  const handleFeedback = () => {
    setNotesError(false);

    if (editedCandidate.notes.length < 6) {
      setNotesError(true);
      dispatch(
        setNotification({
          severity: "error",
          message:
            "Feedback update failed, please provide all necessary details",
        })
      );
      return;
    }

    if (editedCandidate.assessment === "") {
      editedCandidate.assessment = defaultValues.assessment;
    }
    if (editedCandidate.contract === "") {
      editedCandidate.contract = defaultValues.contract;
    }
    if (editedCandidate.language === "") {
      editedCandidate.language = defaultValues.language;
    }
    if (editedCandidate.notice === "") {
      editedCandidate.notice = defaultValues.notice;
    }

    const updatedCandidate = {
      ...editedCandidate,
      edit: format(new Date(), "yyyy-MM-dd, HH:mm:ss"),
    };

    dispatch(updateCandidate(updatedCandidate));
    dispatch(
      setNotification({
        severity: "success",
        message: "Feedback successfully updated!",
      })
    );

    navigate(`/candidates/${candidate.id}`);
  };

  const handleGoingBack = () => {
    window.history.back();
  };

  if (candidate === null) {
    return null;
  }

  return (
    <AnimatedPage>
      <StyledContainer>
        <StyledHeader>
          <StyledTypography variant="h3">Meeting feedback</StyledTypography>
        </StyledHeader>
        <StyledLine>
          {!isSmallScreen && (
            <Typography variant="h6">Final assessment</Typography>
          )}
          <FormControl fullWidth>
            {isSmallScreen && (
              <InputLabel id="assessment">Assessment</InputLabel>
            )}

            <Select
              labelId="assessment"
              label={isSmallScreen ? "Assessment" : null}
              value={editedCandidate.assessment || "6 - Rockstar"}
              onChange={({ target }) =>
                setEditedCandidate({
                  ...editedCandidate,
                  assessment: target.value,
                })
              }
            >
              <MenuItem value="1 - Disqualified">1 - Disqualified</MenuItem>
              <MenuItem value="2 - No hire">2 - No hire</MenuItem>
              <MenuItem value="3 - Maybe">3 - Maybe</MenuItem>
              <MenuItem value="4 - Good candidate">4 - Good candidate</MenuItem>
              <MenuItem value="5 - Great candidate">
                5 - Great candidate
              </MenuItem>
              <MenuItem value="6 - Rockstar">6 - Rockstar</MenuItem>
            </Select>
          </FormControl>
        </StyledLine>
        <StyledLine>
          {!isSmallScreen && (
            <Typography variant="h6">Notice period</Typography>
          )}
          <FormControl fullWidth>
            {isSmallScreen && (
              <InputLabel id="notice">Notice period</InputLabel>
            )}
            <Select
              labelId="noticeperiod"
              label={isSmallScreen ? "Notice-period" : null}
              value={editedCandidate.notice || "Available now"}
              onChange={({ target }) =>
                setEditedCandidate({ ...editedCandidate, notice: target.value })
              }
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
          {!isSmallScreen && (
            <Typography variant="h6">English level</Typography>
          )}
          <FormControl fullWidth>
            {isSmallScreen && <InputLabel id="language">English</InputLabel>}
            <Select
              labelId="language"
              label={isSmallScreen ? "English" : null}
              value={editedCandidate.language || "A1"}
              onChange={({ target }) =>
                setEditedCandidate({
                  ...editedCandidate,
                  language: target.value,
                })
              }
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
          {!isSmallScreen && (
            <Typography variant="h6">Contract type</Typography>
          )}
          <FormControl fullWidth>
            {isSmallScreen && (
              <InputLabel id="contract">Contract type</InputLabel>
            )}
            <Select
              labelId="contract"
              label={isSmallScreen ? "contract-type" : null}
              value={editedCandidate.contract || "UoP"}
              onChange={({ target }) =>
                setEditedCandidate({
                  ...editedCandidate,
                  contract: target.value,
                })
              }
            >
              <MenuItem value="UoP">UoP - contract of employment</MenuItem>
              <MenuItem value="B2B">B2B</MenuItem>
            </Select>
          </FormControl>
        </StyledLine>
        <StyledLine>
          {!isSmallScreen && <Typography variant="h6">Notes</Typography>}
          <StyledTextField
            label={editedCandidate.notes === "" ? "Add notes here..." : null}
            error={notesError}
            helperText={
              notesError ? "Notes need to be min. 6 characters long" : ""
            }
            multiline
            rows={8}
            fullWidth
            value={editedCandidate.notes !== "" ? editedCandidate.notes : ""}
            onChange={({ target }) =>
              setEditedCandidate({ ...editedCandidate, notes: target.value })
            }
          />
        </StyledLine>
        <StyledButtonContainer>
          <StyledButton
            variant="contained"
            color="secondary"
            onClick={() => handleFeedback()}
          >
            <Typography variant="h6">Submit</Typography>
          </StyledButton>
          <StyledButton
            variant="contained"
            color="inherit"
            onClick={handleGoingBack}
          >
            <Typography variant="h6">Cancel</Typography>
          </StyledButton>
        </StyledButtonContainer>
      </StyledContainer>
    </AnimatedPage>
  );
};

export default Feedback;
