import { Button, TextField } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { secondaryColor, primaryColor } from "../App";
import { DatePicker } from "@mui/x-date-pickers";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const Container = styled.div`
  display: flex;
  //   gap: 1rem;
`;

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 2rem;
    background-color: #ffffff;
    border-radius: 0.5rem;
  }
`;

const AddProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [firstContact, setFirstContact] = useState("");
  const [skill, setSkill] = useState("");
  const [seniority, setSeniority] = useState("");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <form
        style={{
          border: "0.25rem solid",
          display: "inline-flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          paddingRight: "1rem",
          paddingLeft: "1rem",
          margin: "2rem",
          borderRadius: "0.5rem",
          //   borderColor: secondaryColor,
          backgroundColor: secondaryColor,
          //   backgroundColor: primaryColor,
        }}
      >
        <h1>Add new profile</h1>
        <Container>
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
                onChange={(newValue) => setFirstContact(newValue)}
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
                </Select>
              </FormControl>
            </div>

            <div style={{ backgroundColor: "#FFFFFF", borderRadius: "0.5rem" }}>
              <FormControl fullWidth>
                <InputLabel id="seniority">Seniority</InputLabel>
                <Select
                  labelId="seniority"
                  label="Seniority"
                  value={skill}
                  onChange={({ target }) => setSkill(target.value)}
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
        </Container>

        <Button id="addButton" variant="contained">
          Add profile
        </Button>
      </form>
    </div>
  );
};

export default AddProfile;
