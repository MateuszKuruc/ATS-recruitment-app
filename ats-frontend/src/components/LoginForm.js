import { TextField, Button, Typography } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const StyledTextField = styled(TextField)`
  && {
    // margin-bottom: 1rem;
    
  }
`;

const MainContainer = styled.div`
  display: flex;
  background-color: #ebcbf4;
  flex: 1;
  margin-bottom: 1rem;
  padding: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  // border: 1px solid black;
  height: 400px;
  width: 300px;
  // justify-content: flex-start;
  // align-items: center;
  gap: 1rem;
  // padding-top: 4rem;
  // background-color: #25283d;
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding: 2rem;
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #25283d;
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  margin-top: 1rem;
`;

const StyledButton = styled(Button)`
  && {
    padding: 1rem;
    margin-top: 1.5rem;
  }
`;

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  login,
  usernameError,
  passwordError,
}) => {

  console.log("errors in login form component:", usernameError, passwordError)

  const navigate = useNavigate();
  if (login) {
    navigate("/candidates");
  }
  return (
    <MainContainer>
      <FormContainer>
        <StyledHeader>
          <Typography variant="h4">LOGIN</Typography>
        </StyledHeader>

        <StyledTextField
          error={usernameError}
          helperText={usernameError ? "Enter valid username" : ""}
          label="Username"
          onChange={handleUsernameChange}
        ></StyledTextField>

        <StyledTextField
          error={passwordError}
          helperText={passwordError ? "Enter valid password" : ""}
          type="password"
          label="Password"
          onChange={handlePasswordChange}
        ></StyledTextField>

        <StyledButton
          id="login-button"
          type="submit"
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
        >
          <Typography variant="h6">Log in</Typography>
        </StyledButton>
      </FormContainer>
    </MainContainer>
  );
};

export default LoginForm;
