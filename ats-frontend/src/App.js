import LoginForm from "./components/LoginForm";
import InfoTab from "./components/InfoTab";
import TipsTab from "./components/TipsTab";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import AddProfile from "./components/AddProfile";

import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";

import { setLogin } from "./reducers/loginReducer";

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
      main: "#990033",
    },
  },
});

export const StyledAppBar = styled(AppBar)`
  padding: 1rem;
  margin: 0rem;
`;

export const StyledToolBar = styled(Toolbar)`
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

export const primaryColor = websiteTheme.palette.primary.main;
export const secondaryColor = websiteTheme.palette.secondary.main;

function App() {
  // const secondaryColor = websiteTheme.palette.secondary.main;

  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);

  return (
    <ThemeProvider theme={websiteTheme}>
      <Container>
        <StyledAppBar position="static">
          <StyledToolBar>
            <StyledButton color="inherit" component={Link} to="/">
              <StyledTypography>Home</StyledTypography>
            </StyledButton>
            <StyledButton color="inherit" component={Link} to="/dashboard">
              <StyledTypography>My Dashboard</StyledTypography>
            </StyledButton>
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
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<InfoTab />} />
          <Route path="/tips" element={<TipsTab />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={
              login !== null ? (
                <div>
                  <p>
                    <i>Please log in to access your dashboard</i>
                  </p>
                  <LoginForm />
                </div>
              ) : (
                login === null && <Dashboard />
              )
            }
          />
          <Route
            path="/all"
            element={
              <>
                <Dashboard />
                <div>All candidates tab</div>
              </>
            }
          />
          <Route
            path="/add"
            element={
              <>
                <Dashboard />
                <AddProfile />
              </>
            }
          />
          <Route
            path="/pools"
            element={
              <>
                <Dashboard />
                <div>Pools tab</div>
              </>
            }
          />
          <Route
            path="/hot"
            element={
              <>
                <Dashboard />
                <div>Hot profiles tab</div>
              </>
            }
          />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
