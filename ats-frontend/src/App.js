import LoginForm from "./components/LoginForm";
import InfoTab from "./components/InfoTab";
import TipsTab from "./components/TipsTab";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import AddProfile from "./components/AddProfile";
import AllCandidates from "./components/AllCandidates";
import MainAppBar from "./components/MainAppBar";
import CandidateDetails from "./components/CandidateDetails";
import Footer from "./components/Footer";
import Pools from "./components/Pools";
import Feedback from "./components/Feedback";
import HotProfiles from "./components/HotProfiles";

import { initializeCandidates } from "./reducers/candidateReducer";
import { setLogin } from "./reducers/loginReducer";

import candidateService from "./services/candidates";
import loginService from "./services/login";

import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
    accent: {
      main: "#c0d9e7",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    italic: {
      fontSize: "1.3rem",
      fontStyle: "italic",
      lineHeight: 1.5,
      // paddingLeft: "3rem",
      // minWidth: "2rem"
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

export const StyledButton = styled(Button)`
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
  const dispatch = useDispatch();

  const [hotCandidates, setHotCandidates] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = useSelector((state) => state.login);
  const candidates = useSelector((state) => state.candidates);

  useEffect(() => {
    const hot = candidates.filter(
      (candidate) =>
        candidate.assessment === "6 - Rockstar" ||
        candidate.assessment === "5 - Great candidate"
    );

    const assessmentValue = {
      "6 - Rockstar": 6,
      "5 - Great candidate": 5,
    };

    hot.sort((a, b) => {
      const assessmentValueA = assessmentValue[a.assessment];
      const assessmentValueB = assessmentValue[b.assessment];

      return assessmentValueB - assessmentValueA;
    });

    setHotCandidates(hot);
  }, []);

  useEffect(() => {
    dispatch(initializeCandidates());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser");

    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      candidateService.setToken(loggedUser.token);

      dispatch(setLogin(loggedUser));
    }
  });

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loggedUser = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedAppUser", JSON.stringify(loggedUser));

      candidateService.setToken(loggedUser.token);
      dispatch(setLogin(loggedUser));
      console.log(loggedUser.token);

      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("error logging", exception);
    }
  };

  return (
    <ThemeProvider theme={websiteTheme}>
      <Container
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <MainAppBar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<InfoTab />} />
          <Route path="/tips" element={<TipsTab />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={
              login === null ? (
                <div>
                  <p>
                    <i>Please log in to access your dashboard</i>
                  </p>
                  <LoginForm
                    handleSubmit={handleLogin}
                    handleUsernameChange={({ target }) =>
                      setUsername(target.value)
                    }
                    handlePasswordChange={({ target }) =>
                      setPassword(target.value)
                    }
                  />
                </div>
              ) : (
                login !== null && <Dashboard />
              )
            }
          />
          <Route
            path="/candidates"
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
                <Pools />
              </>
            }
          />
          <Route
            path="/hot"
            element={
              <>
                <Dashboard />
                <HotProfiles candidates={hotCandidates} />
              </>
            }
          />
          <Route
            path="/candidates/:id"
            element={
              <>
                <Dashboard />
                <CandidateDetails candidates={candidates} />
              </>
            }
          />
          <Route
            path="/candidates/:id/feedback"
            element={
              <>
                <Dashboard />
                <Feedback candidates={candidates} />
              </>
            }
          />
        </Routes>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default App;
