import { useState } from "react";
import styled from "styled-components";
import { format, parseISO } from "date-fns";
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

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

const AddProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  // const [firstContact, setFirstContact] = useState(
  //   format(new Date(), "yyyy-MM-dd").toString()
  // );
  const [firstContact, setFirstContact] = useState(null);
  const [skill, setSkill] = useState("");
  const [seniority, setSeniority] = useState("");

  const [firstNameError, setFirstNameError] = useState(true);
  const [lastNameError, setLastNameError] = useState(true);
  const [phoneError, setPhoneError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [locationError, setLocationError] = useState(true);
  // const [firstContactError, setFirstContactError] = useState(true);
  const [skillError, setSkillError] = useState(true);
  const [seniorityError, setSeniorityError] = useState(true);

  const isEmailValid = (testedEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(testedEmail);
  };

  const isPhoneNumberValid = (testedNumber) => {
    const phoneRegex = /^\d{9,11}$/;
    return phoneRegex.test(testedNumber);
  };

  const handleNewCandidate = async (event) => {
    event.preventDefault();

    setFirstNameError(false);
    setLastNameError(false);
    setPhoneError(false);
    setEmailError(false);
    setLocationError(false);
    // setFirstContactError(false);
    setSkillError(false);
    setSeniorityError(false);

    if (!isEmailValid(email)) {
      console.log("email invalid");
      return;
    }
    if (!isPhoneNumberValid(phone)) {
      console.log("phone invalid");
      return;
    }
    if (firstName.length < 3 || lastName.length < 3 || location.length < 3) {
      console.log("name or location invalid");
      return;
    }
    if (firstContact === null || skill === "" || seniority === "") {
      console.log("date, skill or seniority invalid");
      return;
    }

    // const formattedDate = format(
    //   parseISO(firstContact),
    //   "yyyy-MM-dd"
    // ).toString();

    const newCandidateData = {
      firstName,
      lastName,
      phone,
      email,
      location,
      firstContact,
      // formattedDate,
      skill,
      seniority,
    };

    console.log("new in addprofile", newCandidateData);
    const newCandidate = await dispatch(createCandidate(newCandidateData));

    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setLocation("");
    setFirstContact(dayjs(new Date()));
    setSkill("");
    setSeniority("");

    navigate(`/candidates/${newCandidate.id}`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "1rem",
        flex: "1",
        marginBottom: "1rem",
      }}
    >
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
                firstNameError ? "Enter first name (min. 4 characters)" : ""
              }
              value={firstName}
              label="First name"
              onChange={({ target }) => setFirstName(target.value)}
            ></StyledTextField>

            <StyledTextField
              error={lastNameError}
              helperText={
                lastNameError ? "Enter last name (min. 4 characters)" : ""
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
              defaultValue={dayjs(new Date())}
              label="First contact"
              onChange={(newValue) => {
                const formattedDate = format(
                  newValue.$d,
                  "yyyy-MM-dd"
                ).toString();
                setFirstContact(formattedDate);
              }}
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
      </form>
    </div>
  );
};

export default AddProfile;
