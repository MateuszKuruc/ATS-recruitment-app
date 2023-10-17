import LoginForm from "./components/LoginForm";
import InfoTab from "./components/InfoTab";
import TipsTab from "./components/TipsTab";
import HomePage from "./components/HomePage";
import AddProfile from "./components/AddProfile";
import AllCandidates from "./components/AllCandidates";
import CandidateDetails from "./components/candidateDetails/CandidateDetails";
import Footer from "./components/Footer";
import Pools from "./components/Pools";
import Feedback from "./components/Feedback";
import CandidateProfiles from "./components/CandidateProfiles";
import LogoutPage from "./components/LogoutPage";
import { initializeCandidates } from "./reducers/candidateReducer";
import { setLogin } from "./reducers/loginReducer";
import candidateService from "./services/candidates";
import loginService from "./services/login";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import { setNotification } from "./reducers/notificationReducer";
import PoolDetails from "./components/PoolDetails";
import NavigationBar from "./components/NavigationBar";

const websiteTheme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#084c61",
  //   },
  //   secondary: {
  //     main: "#990033",
  //   },
  //   accent: {
  //     main: "#c0d9e7",
  //   },
  // },
  palette: {
    primary: {
      main: "#8F3985", // plum
    },
    secondary: {
      main: "#FFBA49", // gold
      // main: "#25283D",
    },
    accent: {
      main: "#25283D", // space cadet
      // main: "#FFBA49",
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

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [technology, setTechnology] = useState("");
  const [candidatesByTech, setCandidatesByTech] = useState(null);

  const login = useSelector((state) => state.login);
  const candidates = useSelector((state) => state.candidates);

  console.log("technology", technology);

  useEffect(() => {
    dispatch(initializeCandidates());
  }, [dispatch]);

  console.log("candidates app", candidates);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser");

    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      candidateService.setToken(loggedUser.token);
      console.log("logged user", loggedUser);
      dispatch(setLogin(loggedUser));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (username.length < 4 || username.length > 15) {
      dispatch(
        setNotification({
          severity: "error",
          message: "Username ",
        })
      );
    }

    try {
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

      setUsername("");
      setPassword("");
      navigate("/candidates");
    } catch (exception) {
      console.log("error logging", exception);
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

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<InfoTab />} />
          <Route path="/tips" element={<TipsTab />} />
          <Route
            path="/login"
            element={
              <LoginForm
                handleSubmit={handleLogin}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
              />
            }
          />
          <Route path="/logout" element={<LogoutPage />} />

          <Route
            path="/candidates"
            element={
              <AllCandidates candidates={candidates} userId={login?.id} />
            }
          />
          <Route path="/add" element={<AddProfile />} />
          <Route
            path="/pools"
            element={<Pools setTechnology={setTechnology} />}
          />
          <Route
            path="/pools/:technology"
            element={<PoolDetails candidatesByTech={candidatesByTech} />}
          />
          <Route
            path="/hot"
            element={
              <CandidateProfiles candidates={candidates} userId={login?.id} />
            }
          />
          <Route
            path="/candidates/:id"
            element={<CandidateDetails candidates={candidates} />}
          />
          <Route
            path="/candidates/:id/feedback"
            element={<Feedback candidates={candidates} />}
          />
        </Routes>

        <Footer />
      </StyledContainer>
    </ThemeProvider>
  );
}

export default App;
