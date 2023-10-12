import styled from "styled-components";

import {
  Grid,
  Paper,
  Typography,
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
  editModeExtended,
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
              <Select
                value={
                  editModeExtended ? editedCandidate.notice : candidate.notice
                }
                disabled={!editModeExtended}
                onChange={({ target }) =>
                  setEditedCandidate({
                    ...editedCandidate,
                    notice: target.value,
                  })
                }
              >
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
              <Select
                value={
                  editModeExtended
                    ? editedCandidate.contract
                    : candidate.contract
                }
                disabled={!editModeExtended}
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
              <FormHelperText> </FormHelperText>
            </StyledFormControl>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StyledPaper>
            <Typography variant="italic">English</Typography>

            <StyledFormControl>
              <Select
                value={
                  editModeExtended
                    ? editedCandidate.language
                    : candidate.language
                }
                disabled={!editModeExtended}
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
              <FormHelperText> </FormHelperText>
            </StyledFormControl>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StyledPaper>
            <Typography variant="italic">Assessment</Typography>

            <StyledFormControl>
              <Select
                value={
                  editModeExtended
                    ? editedCandidate.assessment
                    : candidate.assessment
                }
                disabled={!editModeExtended}
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
