import { Textfield, Button } from "@mui/material";
import { useState } from "react";
import { StyledTextField } from "./LoginForm";

const AddProfile = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [location, setLocation] = useState(null);
  const [skill, setSkill] = useState(null); /// use radio buttons in the form

  return (
    <div>
      <h1>Add new profile</h1>
      <form>
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
      </form>
    </div>
  );
};

export default AddProfile;
