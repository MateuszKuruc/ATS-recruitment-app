import { TextField, Button, Typography } from "@mui/material";
import styled from "styled-components";
import AnimatedPage from "../Layout/AnimatedPage";

import { CircleLoader } from "react-spinners";

const override = {
  // display: "block",
  // margin: "0 auto",
  // borderColor: "blue",
  // paddingLeft: "2rem",
};

export const StyledTextField = styled(TextField)`
  && {
    border-radius: 0.5rem;

    @media (max-width: 768px) {
      background-color: #ffffff
    }

    label.MuiInputLabel-root.MuiInputLabel-shrink {
      background-color: #ebcbf4;
      border-radius: 0.25rem;
      margin: 0;
      padding-left: 0.2rem;
      padding-right: 0.2rem;
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

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 300px;
  gap: 1rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding: 2rem;

  @media (max-width: 768px) {
    background-color: #ebcbf4;
  }
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

  @media (max-width: 768px) {
    margin: 0;
    margin-bottom: 2rem;
  }
`;

const StyledButton = styled(Button)`
  && {
    padding: 1rem;
    margin-top: 1.5rem;
    
    flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      margin-top: 2rem;
    }
  }
`;

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  usernameError,
  passwordError,
  loading,
}) => {
  return (
    <AnimatedPage>
      <MainContainer>
        <FormContainer onSubmit={handleSubmit}>
          <StyledHeader>
            <Typography variant="h4">LOGIN</Typography>
          </StyledHeader>

          <StyledTextField
            error={usernameError}
            helperText={
              usernameError ? "Enter valid username (4 - 15 characters)" : ""
            }
            label="Username"
            onChange={handleUsernameChange}
          ></StyledTextField>

          <StyledTextField
            error={passwordError}
            helperText={
              passwordError ? "Enter valid password (6 - 15 characters)" : ""
            }
            type="password"
            label="Password"
            onChange={handlePasswordChange}
          ></StyledTextField>

          {loading ? <p>loading, please wait</p> : null}

          <StyledButton
            id="login-button"
            type="submit"
            variant="contained"
            color="secondary"
            disabled={loading}
          >
            {loading ? (
              <>
                <Typography variant="h6">Loading...</Typography>
                <CircleLoader
                  color="red"
                  loading={loading}
                  cssOverride={override}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </>
            ) : (
              <Typography variant="h6">Log in</Typography>
            )}
          </StyledButton>
        </FormContainer>
      </MainContainer>
    </AnimatedPage>
  );
};

export default LoginForm;
