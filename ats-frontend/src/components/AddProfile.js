import { useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";

import { createCandidate } from "../reducers/candidateReducer";
import { useDispatch } from "react-redux";

const FieldContainer = styled.div`
  display: flex;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 0.5rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  margin-top: 3rem;
  border-radius: 0.5rem;
  align-items: center;
  padding: 2rem;
`;

export const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 2rem;
    background-color: #ffffff;
    border-radius: 0.5rem;
  }
`;

const AddProfile = () => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [firstContact, setFirstContact] = useState("");
  const [skill, setSkill] = useState("");
  const [seniority, setSeniority] = useState("");

  const handleNewCandidate = (event) => {
    event.preventDefault();

    const newCandidate = {
      firstName,
      lastName,
      phone,
      email,
      location,
      firstContact,
      skill,
      seniority,
    };
    dispatch(createCandidate(newCandidate));

    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setLocation("");
    setFirstContact("");
    setSkill("");
    setSeniority("");

    console.log("new candidate in addProfile:", newCandidate);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        marginTop: "1rem",
        // border: "1px solid blue",
        flex: "1",
        // height: "100%"
        marginBottom: "1rem",
      }}
    >
      <form
        style={{
          // border: "0.25rem solid",
          display: "flex",
          // justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          paddingRight: "1rem",
          paddingLeft: "1rem",
          // margin: "2rem",
          borderRadius: "0.5rem",
          // backgroundColor: secondaryColor,
          backgroundColor: "#c0d9e7",
          flex: "1",
        }}
      >
        <FormContainer>
          <h1>Create new profile</h1>
          <FieldContainer>
            <div className="firstColumn">
              <div>
                <StyledTextField
                  label="First name"
                  onChange={({ target }) => setFirstName(target.value)}
                ></StyledTextField>
              </div>
              <div>
                <StyledTextField
                  label="Last name"
                  onChange={({ target }) => setLastName(target.value)}
                ></StyledTextField>
              </div>
              <div>
                <StyledTextField
                  label="Location"
                  onChange={({ target }) => setLocation(target.value)}
                ></StyledTextField>
              </div>

              <div
                style={{
                  marginBottom: "2rem",
                  width: "85%",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "0.5rem",
                }}
              >
                <DatePicker
                  label="First contact"
                  onChange={(newValue) => {
                    const formattedDate = format(newValue.$d, "yyyy-MM-dd");
                    setFirstContact(formattedDate);
                  }}
                />
              </div>
            </div>

            <div className="secondColumn">
              <div>
                <StyledTextField
                  label="Email address"
                  onChange={({ target }) => setEmail(target.value)}
                ></StyledTextField>
              </div>
              <div>
                <StyledTextField
                  label="Phone number"
                  onChange={({ target }) => setPhone(target.value)}
                ></StyledTextField>
              </div>
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "0.5rem",
                  marginBottom: "2rem",
                }}
              >
                <FormControl fullWidth>
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
              </div>

              <div
                style={{ backgroundColor: "#FFFFFF", borderRadius: "0.5rem" }}
              >
                <FormControl fullWidth>
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
              </div>
            </div>
          </FieldContainer>

          <Button
            type="submit"
            id="addButton"
            variant="contained"
            onClick={handleNewCandidate}
          >
            Add profile
          </Button>
        </FormContainer>
      </form>
    </div>
  );
};

export default AddProfile;
