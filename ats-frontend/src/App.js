import LoginForm from "./components/User/LoginForm";
import Faq from "./components/Info/Faq";
import TipsTab from "./components/Info/Tips";
import HomePage from "./components/Info/HomePage";
import AddProfile from "./components/CandidateDetails/AddProfile";
import AllCandidates from "./components/CandidateDetails/AllCandidates";
import CandidateDetails from "./components/CandidateDetails/MainDetails";
import Footer from "./components/Layout/Footer";
import Pools from "./components/CandidateDetails/Pools";
import Feedback from "./components/CandidateDetails/Feedback";
import CandidateProfiles from "./components/CandidateDetails/TablesRender";
import LogoutPage from "./components/User/LogoutPage";
import { initializeCandidates } from "./reducers/candidateReducer";
import { setLogin } from "./reducers/loginReducer";
import candidateService from "./services/candidates";
import loginService from "./services/login";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import { setNotification } from "./reducers/notificationReducer";
import PoolDetails from "./components/CandidateDetails/PoolDetails";
import NavigationBar from "./components/Layout/NavigationBar";
import NotFound from "./components/Info/NotFound";
import UserFeedback from "./components/Info/UserFeedback";
import Help from "./components/Info/Help";
import { AnimatePresence } from "framer-motion";

const websiteTheme = createTheme({
  palette: {
    primary: {
      main: "#8F3985", // plum
    },
    secondary: {
      main: "#FFBA49", // gold
    },
    accent: {
      main: "#25283D", // space cadet
    },
    accen2: {
      main: "#EBCBF4", // lavender
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
      fontSize: "1.1rem",
      fontStyle: "italic",
      lineHeight: 1.5,
    },
    italic2: {
      fontSize: "1rem",
      fontStyle: "italic",
      lineHeight: 1.5,
    },
    italic3: {
      fontSize: "1.4rem",
      fontStyle: "italic",
      lineHeight: 1.5,
    },
  },
});

const StyledContainer = styled(Container)`
  && {
    display: flex;
    flex-direction: column;
    height: 100vh;

    @media (max-width: 768px) {
      padding: 0;
      margin: 0;
    }
  }
`;

export const primaryColor = websiteTheme.palette.primary.main;
export const secondaryColor = websiteTheme.palette.secondary.main;

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [technology, setTechnology] = useState("");
  const [candidatesByTech, setCandidatesByTech] = useState(null);

  const [loading, setLoading] = useState(false);

  const login = useSelector((state) => state.login);
  const candidates = useSelector((state) => state.candidates);

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
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (
      (username.length < 4 || username.length > 15) &&
      (password.length < 6 || password.length > 15)
    ) {
      dispatch(
        setNotification({
          severity: "error",
          message: "Invalid format. Please try again.",
        })
      );

      setUsernameError(true);
      setPasswordError(true);
      return;
    } else if (username.length < 4 || username.length > 15) {
      dispatch(
        setNotification({
          severity: "error",
          message:
            "Invalid username. Please enter name between 4 and 15 characters.",
        })
      );

      setUsernameError(true);
      return;
    } else if (password.length < 6 || password.length > 15) {
      dispatch(
        setNotification({
          severity: "error",
          message:
            "Invalid password. Please enter password between 6 and 15 characters.",
        })
      );

      setPasswordError(true);
      return;
    }

    try {
      setLoading(true);
      dispatch(
        setNotification({
          severity: "info",
          message:
            "First login may take 1-2 minutes before server is running. Please wait and refresh page after this time, if needed - it will work.",
        })
      );

      const loggedUser = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedAppUser", JSON.stringify(loggedUser));

      candidateService.setToken(loggedUser.token);
      dispatch(setLogin(loggedUser));
      dispatch(
        setNotification({
          severity: "success",
          message: "You were logged in successfully!",
        })
      );

      setLoading(false);

      setUsername("");
      setPassword("");

      setUsernameError(false);
      setPasswordError(false);

      navigate("/candidates");
    } catch (exception) {
      dispatch(
        setNotification({
          severity: "error",
          message: "Incorrect credentials. Please try again.",
        })
      );
      setLoading(false);
      setUsername("");
      setPassword("");
    }
  };

  useEffect(() => {
    const filteredCandidates = candidates.filter(
      (candidate) => candidate.skill === technology
    );
    setCandidatesByTech(filteredCandidates);
  }, [technology, candidates]);

  return (
    <ThemeProvider theme={websiteTheme}>
      <StyledContainer>
        <NavigationBar candidates={candidates} />

        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/tips" element={<TipsTab />} />
            <Route
              path="/login"
              element={
                login ? (
                  <AllCandidates candidates={candidates} userId={login.id} />
                ) : (
                  <LoginForm
                    handleSubmit={handleLogin}
                    handleUsernameChange={({ target }) =>
                      setUsername(target.value)
                    }
                    handlePasswordChange={({ target }) =>
                      setPassword(target.value)
                    }
                    login={login}
                    usernameError={usernameError}
                    passwordError={passwordError}
                    loading={loading}
                  />
                )
              }
            />
            <Route path="/logout" element={<LogoutPage />} />

            <Route
              path="/candidates"
              element={
                login ? (
                  <AllCandidates candidates={candidates} userId={login?.id} />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route path="/add" element={<AddProfile />} />
            <Route
              path="/pools"
              element={
                login ? <Pools setTechnology={setTechnology} /> : <NotFound />
              }
            />
            <Route
              path="/pools/:technology"
              element={
                login ? (
                  <PoolDetails candidatesByTech={candidatesByTech} />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              path="/hot"
              element={
                login ? (
                  <CandidateProfiles
                    candidates={candidates}
                    userId={login?.id}
                  />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              path="/candidates/:id"
              element={
                login ? (
                  <CandidateDetails candidates={candidates} />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              path="/candidates/:id/feedback"
              element={
                login ? <Feedback candidates={candidates} /> : <NotFound />
              }
            />

            <Route path="/feedback" element={<UserFeedback />} />
            <Route path="/help" element={<Help />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>

        <Footer />
      </StyledContainer>
    </ThemeProvider>
  );
}

export default App;
