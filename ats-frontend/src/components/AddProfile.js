import { TextField, Button } from "@mui/material";
import { useState } from "react";

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
        <div className="firstColumn"></div>
        <div>
          <TextField
            label="First name"
            onChange={({ target }) => setFirstName(target.value)}
          ></TextField>
        </div>
        <div>
          <TextField
            label="Last name"
            onChange={({ target }) => setLastName(target.value)}
          ></TextField>
        </div>
        <div>
          <TextField
            label="Phone number"
            onChange={({ target }) => setPhone(target.value)}
          ></TextField>
        </div>
        <div>
          <TextField
            label="Email address"
            onChange={({ target }) => setEmail(target.value)}
          ></TextField>
        </div>
        <div>
          <TextField
            label="Location"
            onChange={({ target }) => setLocation(target.value)}
          ></TextField>
        </div>
        <div>
          <TextField
            label="Skill"
            onChange={({ target }) => setSkill(target.value)}
          ></TextField>
        </div>
      </form>
    </div>
  );
};

export default AddProfile;
