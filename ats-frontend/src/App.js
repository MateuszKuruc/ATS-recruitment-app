import LoginForm from "./components/LoginForm";
import InfoTab from "./components/InfoTab";
import TipsTab from "./components/TipsTab";

import { useState } from "react";

import { Routes, Route, Link, useNavigate } from "react-router-dom";

import styled from "styled-components";

import {
  Container,
  AppBar,
  Button,
  Toolbar,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";

const websiteTheme = createTheme({
  palette: {
    primary: {
      main: "#084c61",
    },
    secondary: {
      main: "#FCA311",
    },
  },
});

const StyledAppBar = styled(AppBar)`
  padding: 1rem;
  margin: 0rem;
`;

const StyledToolBar = styled(Toolbar)`
  display: flex;
  gap: 2rem;
  justify-content: space-around;
`;

const StyledButton = styled(Button)`
  font-size: 2.3rem;
  font-weight: 900;
`;

const StyledTypography = styled(Typography)`
  && {
    font-size: 1.3rem;
    font-weight: 900;
  }
`;

function App() {
  

  return (
    <ThemeProvider theme={websiteTheme}>
      <Container>
        <StyledAppBar position="static">
          <StyledToolBar>
            <StyledButton color="inherit" component={Link} to="/faq">
              <StyledTypography>FAQ</StyledTypography>
            </StyledButton>
            <StyledButton color="inherit" component={Link} to="/tips">
              <StyledTypography>Tips</StyledTypography>
            </StyledButton>
            <StyledButton color="inherit" component={Link} to="/login">
              <StyledTypography>Login</StyledTypography>
            </StyledButton>
          </StyledToolBar>
        </StyledAppBar>

        <Routes>
          <Route path="/faq" element={<InfoTab />} />
          <Route path="/tips" element={<TipsTab />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>

        <h1>Applicant Tracking System - get your pipeline under control!</h1>
        <p>
          <i>Log in to see your pipeline</i>
        </p>
      </Container>
    </ThemeProvider>
  );
}

export default App;
