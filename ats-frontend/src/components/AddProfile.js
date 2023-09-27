import { Button, TextField } from "@mui/material";
import { useState } from "react";
// import { StyledTextField } from "./LoginForm";
import styled from "styled-components";
import { secondaryColor, primaryColor } from "../App";

const Container = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 2rem;
    background-color: white;
    border-radius: 0.5rem;
  }
`;

const AddProfile = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [location, setLocation] = useState(null);
  const [skill, setSkill] = useState(null); /// use radio buttons in the form

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
                label="Phone number"
                onChange={({ target }) => setPhone(target.value)}
              ></StyledTextField>
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
                label="Location"
                onChange={({ target }) => setLocation(target.value)}
              ></StyledTextField>
            </div>
            <div>
              <StyledTextField
                label="Skill"
                onChange={({ target }) => setSkill(target.value)}
              ></StyledTextField>
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
