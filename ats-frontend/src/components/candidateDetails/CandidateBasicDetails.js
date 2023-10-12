import dayjs from "dayjs";
import styled from "styled-components";

import { DatePicker } from "@mui/x-date-pickers";

import {
  Grid,
  Paper,
  Typography,
  TextField,
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

const CandidateBasicDetails = ({
  candidate,
  setEditedCandidate,
  editedCandidate,
  editMode,
  firstNameError,
  lastNameError,
  emailError,
  phoneError,
  locationError,
}) => {
  return (
    <>
      <StyledHeader>
        <Typography variant="h5" style={{ color: "#ffffff" }}>
          Basic details
        </Typography>
      </StyledHeader>

      <Grid container spacing={0.5} style={{ marginTop: "1rem" }}>
        <Grid item xs={12} md={6} lg={3}>
          <StyledPaper>
            <Typography variant="italic">First name</Typography>
            <StyledTextField
              value={editMode ? editedCandidate.firstName : candidate.firstName}
              disabled={!editMode}
              error={firstNameError}
              helperText={
                firstNameError ? "Enter valid name, min. 2 characters" : " "
              }
              onChange={({ target }) =>
                setEditedCandidate({
                  ...editedCandidate,
                  firstName: target.value,
                })
              }
            />
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StyledPaper>
            <Typography variant="italic">Last name</Typography>
            <StyledTextField
              value={editMode ? editedCandidate.lastName : candidate.lastName}
              disabled={!editMode}
              error={lastNameError}
              helperText={
                lastNameError ? "Enter valid name, min. 2 characters" : " "
              }
              onChange={({ target }) =>
                setEditedCandidate({
                  ...editedCandidate,
                  lastName: target.value,
                })
              }
            />
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StyledPaper>
            <Typography variant="italic">Email address</Typography>
            <StyledTextField
              value={editMode ? editedCandidate.email : candidate.email}
              disabled={!editMode}
              error={emailError}
              helperText={emailError ? "Enter email in valid format" : " "}
              onChange={({ target }) =>
                setEditedCandidate({ ...editedCandidate, email: target.value })
              }
            />
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StyledPaper>
            <Typography variant="italic">Phone number</Typography>
            <StyledTextField
              value={editMode ? editedCandidate.phone : candidate.phone}
              disabled={!editMode}
              error={phoneError}
              helperText={phoneError ? "Enter number in valid format" : " "}
              onChange={({ target }) =>
                setEditedCandidate({ ...editedCandidate, phone: target.value })
              }
            />
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StyledPaper>
            <Typography variant="italic">Location</Typography>
            <StyledTextField
              value={editMode ? editedCandidate.location : candidate.location}
              error={locationError}
              helperText={locationError ? "Enter location" : " "}
              disabled={!editMode}
              onChange={({ target }) =>
                setEditedCandidate({
                  ...editedCandidate,
                  location: target.value,
                })
              }
            />
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StyledPaper>
            <Typography variant="italic">Skill</Typography>

            <StyledFormControl>
              <Select
                value={editMode ? editedCandidate.skill : candidate.skill}
                disabled={!editMode}
                onChange={({ target }) =>
                  setEditedCandidate({
                    ...editedCandidate,
                    skill: target.value,
                  })
                }
              >
                <MenuItem value="Java">Java</MenuItem>
                <MenuItem value="Python">Python</MenuItem>
                <MenuItem value="JavaScript">JavaScript</MenuItem>
                <MenuItem value="C">C/C#/C++</MenuItem>
                <MenuItem value="Scala">Scala</MenuItem>
                <MenuItem value="BigData">Big Data</MenuItem>
                <MenuItem value="DevOps">DevOps</MenuItem>
                <MenuItem value="Mobile">Mobile</MenuItem>
                <MenuItem value="Golang">Golang</MenuItem>
              </Select>
              <FormHelperText> </FormHelperText>
            </StyledFormControl>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StyledPaper>
            <Typography variant="italic">Seniority</Typography>

            <StyledFormControl>
              <Select
                value={
                  editMode ? editedCandidate.seniority : candidate.seniority
                }
                disabled={!editMode}
                onChange={({ target }) =>
                  setEditedCandidate({
                    ...editedCandidate,
                    seniority: target.value,
                  })
                }
              >
                <MenuItem value="Intern">Intern</MenuItem>
                <MenuItem value="Junior">Junior</MenuItem>
                <MenuItem value="Regular">Regular</MenuItem>
                <MenuItem value="Senior">Senior</MenuItem>
                <MenuItem value="Lead">Lead</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
              </Select>
              <FormHelperText> </FormHelperText>
            </StyledFormControl>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StyledPaper>
            <Typography variant="italic">First contact</Typography>

            <StyledDatePicker
              slotProps={{
                textField: {
                  helperText: " ",
                },
              }}
              defaultValue={
                editMode
                  ? dayjs(editedCandidate.firstContact)
                  : dayjs(candidate.firstContact)
              }
              disabled={!editMode}
              onChange={(target) =>
                setEditedCandidate({
                  ...editedCandidate,
                  firstContact: dayjs(target),
                })
              }
            />
          </StyledPaper>
        </Grid>
      </Grid>
    </>
  );
};

export default CandidateBasicDetails;
