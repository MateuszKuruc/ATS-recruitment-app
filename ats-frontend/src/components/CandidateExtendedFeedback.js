import dayjs from "dayjs";
import styled from "styled-components";

import { DatePicker } from "@mui/x-date-pickers";

import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

const StyledHeader = styled.div`
  && {
    display: flex;
    justify-content: space-around;
    align-content: center;
    margin-bottom: 1rem;
    background-color: #084c61;
    padding: 0.25rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    // width: 80%;
  }
`;

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
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
    // border: 0.15rem solid  #990033;

    ${(props) =>
      props.disabled &&
      `
    // background-color: #c0d9e7;
    // border: 0.15rem solid #084c61;
    // border: 0.15rem solid  #990033;
    color: #ffffff
    `}
`;

const StyledDatePicker = styled(DatePicker)`
  && {
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-radius: 0.5rem;
  }
`;

const StyledFormControl = styled(FormControl)`
&& {
  margin-top: 2rem;
  margin-bottom: 2rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  width: 15rem;
  // border: 0.15rem solid  #990033;
`;

const CandidateExtendedFeedback = ({
  candidate,
  editedCandidate,
  setEditedCandidate,
  editMode,
}) => {
  return (
    <>
      <StyledHeader>
        <Typography variant="h5" style={{ color: "#ffffff" }}>
          Extended feedback
        </Typography>
      </StyledHeader>

      <Grid container spacing={0.5} style={{ marginTop: "1rem" }}>
        <Grid item xs={12} md={6} lg={3}>
          <StyledPaper>
            <Typography variant="italic">Notice period</Typography>
            <StyledFormControl>
              <Select value={candidate.notice} disabled={!editMode}>
                <MenuItem value="Available now">Available now</MenuItem>
                <MenuItem value="2 weeks">2 weeks</MenuItem>
                <MenuItem value="1 month">1 month</MenuItem>
                <MenuItem value="2 months">2 months</MenuItem>
                <MenuItem value="3 months">3 months</MenuItem>
              </Select>
              <FormHelperText> </FormHelperText>
            </StyledFormControl>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StyledPaper>
            <Typography variant="italic">Contract type</Typography>

            <StyledFormControl>
              <Select value={candidate.contract} disabled={!editMode}>
                <MenuItem value="UoP">UoP - contract of employment</MenuItem>
                <MenuItem value="B2B">B2B</MenuItem>
              </Select>
              <FormHelperText> </FormHelperText>
            </StyledFormControl>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StyledPaper>
            <Typography variant="italic">English</Typography>

            <StyledFormControl>
              <Select value={candidate.language} disabled={!editMode}>
                <MenuItem value="A1">A1</MenuItem>
                <MenuItem value="A2">A2</MenuItem>
                <MenuItem value="B1">B1</MenuItem>
                <MenuItem value="B2">B2</MenuItem>
                <MenuItem value="C1">C1</MenuItem>
                <MenuItem value="C2">C2</MenuItem>
                <MenuItem value="Native">Native</MenuItem>
              </Select>
              <FormHelperText> </FormHelperText>
            </StyledFormControl>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StyledPaper>
            <Typography variant="italic">Assessment</Typography>

            <StyledFormControl>
              <Select value={candidate.assessment} disabled={!editMode}>
                <MenuItem value="1 - Disqualified">1 - Disqualified</MenuItem>
                <MenuItem value="2 - No hire">2 - No hire</MenuItem>
                <MenuItem value="3 - Maybe">3 - Maybe</MenuItem>
                <MenuItem value="4 - Good candidate">
                  4 - Good candidate
                </MenuItem>
                <MenuItem value="5 - Great candidate">
                  5 - Great candidate
                </MenuItem>
                <MenuItem value="6 - Rockstar">6 - Rockstar</MenuItem>
              </Select>
              <FormHelperText> </FormHelperText>
            </StyledFormControl>
          </StyledPaper>
        </Grid>
      </Grid>
    </>
  );
};

export default CandidateExtendedFeedback;
