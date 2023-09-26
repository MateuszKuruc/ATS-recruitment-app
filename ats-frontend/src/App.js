import LoginForm from "./components/LoginForm";
import InfoTab from "./components/InfoTab";
import TipsTab from "./components/TipsTab";

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
  AppBar as MuiAppBar,
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

const StyledAppBar = styled(MuiAppBar)`
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
            <StyledButton color="inherit">
              <StyledTypography>FAQ</StyledTypography>
            </StyledButton>
            <StyledButton color="inherit">
              <StyledTypography>Tips</StyledTypography>
            </StyledButton>
            <StyledButton color="inherit">
              <StyledTypography>Login</StyledTypography>
            </StyledButton>
          </StyledToolBar>
        </StyledAppBar>

        <Routes>
          <Route path="/faq" element={<InfoTab />} />
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
