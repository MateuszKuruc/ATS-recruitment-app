import { TextField, Button } from "@mui/material";
import styled from "styled-components";

export const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 1rem;
  }
`;

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <StyledTextField
            label="username"
            onChange={handleUsernameChange}
            
          ></StyledTextField>
        </div>
        <div>
          <StyledTextField
            type="password"
            label="password"
            onChange={handlePasswordChange}
          ></StyledTextField>
        </div>
        <Button id="login-button" type="submit" variant="contained">
          Log in
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
