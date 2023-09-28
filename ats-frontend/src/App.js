import LoginForm from "./components/LoginForm";
import InfoTab from "./components/InfoTab";
import TipsTab from "./components/TipsTab";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import AddProfile from "./components/AddProfile";
import AllCandidates from "./components/AllCandidates";

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

const candidates = [
  {
    firstName: "Mateusz",
    lastName: "Kuruc",
    location: "Katowice",
    firstContact: "2023-09-28",
    email: "mateuszkuruc@gmail.com",
    phone: "531380713",
    skill: "JavaScript",
    seniority: "Junior",
    id: 1,
  },
  {
    firstName: "Puszek",
    lastName: "Okruszek",
    location: "Katowice",
    firstContact: "2023-07-13",
    email: "kotekpsotek@gmail.com",
    phone: "999666333",
    skill: "Java",
    seniority: "Manager",
    id: 2,
  },
  {
    firstName: "Pamelitto",
    lastName: "Bubbito",
    location: "Katowice",
    firstContact: "2022-03-14",
    email: "pamelisko92@gmail.com",
    phone: "555777111",
    skill: "Python",
    seniority: "Regular",
    id: 3,
  },
  {
    firstName: "Arjen",
    lastName: "Robben",
    location: "Monachium",
    firstContact: "2013-06-06",
    email: "cuttingwinger@gmail.com",
    phone: "321321321",
    skill: "DevOps",
    seniority: "Lead",
    id: 4,
  },
];

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
                <AllCandidates candidates={candidates} />
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
