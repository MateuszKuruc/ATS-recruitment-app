import { useState } from "react";
import styled from "styled-components";
import { DatePicker } from "@mui/x-date-pickers";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

import { createCandidate } from "../reducers/candidateReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { validateEditForCandidate } from "../utils/validationService";
import { setNotification } from "../reducers/notificationReducer";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 0.5rem;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
  width: 90%;

  @media (min-width: 768px) {
    width: 40rem;
  }
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 3rem;
  border-radius: 0.5rem;
  gap: 1rem;
  align-items: flex-start;
  width: 90%;

  @media (min-width: 768px) {
    width: 30rem;
  }
`;

export const StyledTextField = styled(TextField)`
  && {
    background-color: #ffffff;
    border-radius: 0.5rem;
    width: 100%;
  }
`;

const ComponentContainer = styled.div`
display: flex,
flex-direction: column,
margin-top: 1rem,
flex: 1,
margin-bottom: 1rem,
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

// const StyledForm = styled.div`
// && {

//   display: flex,
//   flex-direction: column,
//   align-items: center,
//   padding: 2rem,
//   padding-right: 1rem,
//   padding-left: 1rem,
//   border-radius: 0.5rem,
//   background-color: #c0d9e7,
//   flex: 1,
// }
// `;

const AddProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [firstContact, setFirstContact] = useState(dayjs(new Date()));
  const [skill, setSkill] = useState("");
  const [seniority, setSeniority] = useState("");

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [skillError, setSkillError] = useState(false);
  const [seniorityError, setSeniorityError] = useState(false);

  const handleCandidateValidation = () => {
    const checkedCandidate = {
      firstName,
      lastName,
      location,
      email,
      phone,
      skill,
      seniority,
    };
    const errors = validateEditForCandidate(checkedCandidate);

    setFirstNameError(errors.firstName);
    setLastNameError(errors.lastName);
    setLocationError(errors.location);
    setEmailError(errors.email);
    setPhoneError(errors.phone);
    setSkillError(errors.skill);
    setSeniorityError(errors.seniority);

    return !Object.values(errors).some((error) => error);
  };

  const handleNewCandidate = async (event) => {
    event.preventDefault();

    if (!handleCandidateValidation()) {
      dispatch(
        setNotification({
          severity: "error",
          message:
            "Adding new profile failed. Please correct the details and try again",
        })
      );
      return;
    }

    setFirstNameError(false);
    setLastNameError(false);
    setPhoneError(false);
    setEmailError(false);
    setLocationError(false);
    setSkillError(false);
    setSeniorityError(false);

    const newCandidateData = {
      firstName,
      lastName,
      phone,
      email,
      location,
      firstContact,
      skill,
      seniority,
    };

    const newCandidate = await dispatch(createCandidate(newCandidateData));
    dispatch(
      setNotification({
        severity: "success",
        message: `New profile for ${newCandidateData.firstName} ${newCandidateData.lastName} added successfully!`,
      })
    );

    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setLocation("");
    setFirstContact("");
    setSkill("");
    setSeniority("");

    navigate(`/candidates/${newCandidate.id}`);
  };

  return (
    <ComponentContainer>
      {/* <StyledForm> */}
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          paddingRight: "1rem",
          paddingLeft: "1rem",
          borderRadius: "0.5rem",
          backgroundColor: "#c0d9e7",
          flex: "1",
        }}
      >
        <FormContainer>
          <Typography variant="h4">NEW CANDIDATE FORM</Typography>
          <FieldContainer>
            <StyledTextField
              error={firstNameError}
              helperText={
                firstNameError ? "Enter first name (min. 2 characters)" : ""
              }
              value={firstName}
              label="First name"
              onChange={({ target }) => setFirstName(target.value)}
            ></StyledTextField>

            <StyledTextField
              error={lastNameError}
              helperText={
                lastNameError ? "Enter last name (min. 2 characters)" : ""
              }
              value={lastName}
              label="Last name"
              onChange={({ target }) => setLastName(target.value)}
            ></StyledTextField>

            <StyledTextField
              error={locationError}
              helperText={locationError ? "Enter location" : ""}
              value={location}
              label="Location"
              onChange={({ target }) => setLocation(target.value)}
            ></StyledTextField>

            <StyledTextField
              error={emailError}
              helperText={emailError ? "Enter email in correct format" : ""}
              value={email}
              label="Email address"
              onChange={({ target }) => setEmail(target.value)}
            ></StyledTextField>

            <StyledTextField
              error={phoneError}
              helperText={
                phoneError ? "Enter phone number (min. 9 characters)" : ""
              }
              value={phone}
              label="Phone number"
              onChange={({ target }) => setPhone(target.value)}
            ></StyledTextField>

            <FormControl fullWidth error={skillError}>
              <InputLabel id="skill">Skill</InputLabel>
              <Select
                labelId="skill"
                label="Skill"
                value={skill}
                onChange={({ target }) => setSkill(target.value)}
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
            </FormControl>

            <FormControl fullWidth error={seniorityError}>
              <InputLabel id="seniority">Seniority</InputLabel>
              <Select
                labelId="seniority"
                label="Seniority"
                value={seniority}
                onChange={({ target }) => setSeniority(target.value)}
              >
                <MenuItem value="Intern">Intern</MenuItem>
                <MenuItem value="Junior">Junior</MenuItem>
                <MenuItem value="Regular">Regular</MenuItem>
                <MenuItem value="Senior">Senior</MenuItem>
                <MenuItem value="Lead">Lead</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
              </Select>
            </FormControl>

            <StyledDatePicker
              defaultValue={firstContact}
              label="First contact"
              onChange={(newValue) => setFirstContact(dayjs(newValue))}
            />
          </FieldContainer>

          <Button
            style={{ width: "100%", padding: "1rem" }}
            type="submit"
            id="addButton"
            variant="contained"
            onClick={handleNewCandidate}
          >
            <Typography variant="h5">Add profile</Typography>
          </Button>
        </FormContainer>
        {/* </StyledForm> */}
      </form>
    </ComponentContainer>
  );
};

export default AddProfile;
