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

import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";

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
    assessment: "6 - Rockstar",
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
    assessment: "2 - No hire",
  },
  {
    firstName: "Arjen",
    lastName: "Robben",
    location: "Groningen",
    firstContact: "2013-06-06",
    email: "cuttingwinger@gmail.com",
    phone: "321321321",
    skill: "DevOps",
    seniority: "Lead",
    id: 4,
    assessment: "5 - Great candidate",
  },
  {
    firstName: "Franck",
    lastName: "Ribery",
    location: "Marseille",
    firstContact: "2008-03-26",
    email: "scarface@gmail.com",
    phone: "499499499",
    skill: "Mobile",
    seniority: "Lead",
    id: 5,
    assessment: "2 - No hire",
  },
  {
    firstName: "Manuel",
    lastName: "Neuer",
    location: "Gelsenkirchen",
    firstContact: "2011-12-24",
    email: "sweeperkeeper@gmail.com",
    phone: "666666666",
    skill: "Scala",
    seniority: "Junior",
    id: 6,
    assessment: "3 - Maybe",
  },
  {
    firstName: "Thomas",
    lastName: "Muller",
    location: "Monachium",
    firstContact: "2009-01-12",
    email: "bavarian@gmail.com",
    phone: "732722111",
    skill: "JavaScript",
    seniority: "Manager",
    id: 7,
    assessment: "5 - Great candidate",
  },
  {
    firstName: "Dayot",
    lastName: "Upamecano",
    location: "Gdansk",
    firstContact: "2020-11-12",
    email: "flop@gmail.com",
    phone: "111111111",
    skill: "C/C#/C++",
    seniority: "Intern",
    id: 8,
    assessment: "1 - Disqualified",
  },
  {
    firstName: "Kim",
    lastName: "Min Jae",
    location: "Lublin",
    firstContact: "2023-07-30",
    email: "monster@gmail.com",
    phone: "555444333",
    skill: "Golang",
    seniority: "Regular",
    id: 9,
    assessment: "6 - Rockstar",
  },
  {
    firstName: "Joshua",
    lastName: "Kimmich",
    location: "Warsaw",
    firstContact: "2016-02-11",
    email: "creator@gmail.com",
    phone: "933922911",
    skill: "Big Data",
    seniority: "Senior",
    id: 10,
    assessment: "3 - Maybe",
  },
  {
    firstName: "Leon",
    lastName: "Goretzka",
    location: "Monachium",
    firstContact: "2017-04-11",
    email: "wall@gmail.com",
    phone: "931112321",
    skill: "Scala",
    seniority: "Manager",
    id: 11,
    assessment: "4 - Good candidate",
  },
  {
    firstName: "Harry",
    lastName: "Kane",
    location: "London",
    firstContact: "2023-08-11",
    email: "elitestriker@gmail.com",
    phone: "111111111",
    skill: "JavaScript",
    seniority: "Lead",
    id: 12,
    assessment: "6 - Rockstar",
  },
  {
    firstName: "Julian",
    lastName: "Brandt",
    location: "Leverkusen",
    firstContact: "2012-02-11",
    email: "maestro@gmail.com",
    phone: "433234333",
    skill: "Java",
    seniority: "Junior",
    id: 13,
    assessment: "2 - No hire",
  },
  {
    firstName: "Marco",
    lastName: "Reus",
    location: "Dortmund",
    firstContact: "2012-06-30",
    email: "legend@gmail.com",
    phone: "999888777",
    skill: "Golang",
    seniority: "Regular",
    id: 14,
    assessment: "5 - Great candidate",
  },
  {
    firstName: "Konrad",
    lastName: "Laimer",
    location: "Salzburg",
    firstContact: "2014-05-22",
    email: "b2b@gmail.com",
    phone: "333333333",
    skill: "C/C#/C+++",
    seniority: "Intern",
    id: 15,
    assessment: "1 - Disqualified",
  },
  {
    firstName: "Alphonso",
    lastName: "Davies",
    location: "Vancouver",
    firstContact: "2019-01-25",
    email: "speedrunner@gmail.com",
    phone: "987234567",
    skill: "Python",
    seniority: "Junior",
    id: 16,
    assessment: "3 - Maybe",
  },
  {
    firstName: "Kingsley",
    lastName: "Coman",
    location: "Turin",
    firstContact: "2016-05-22",
    email: "braindamage@gmail.com",
    phone: "432564132",
    skill: "Mobile",
    seniority: "Intern",
    id: 17,
    assessment: "1 - Disqualified",
  },
  {
    firstName: "Leroy",
    lastName: "Sane",
    location: "Gelsenkirchen",
    firstContact: "2015-05-22",
    email: "flair@gmail.com",
    phone: "336663333",
    skill: "JavaScript",
    seniority: "Lead",
    id: 18,
    assessment: "2 - No hire",
  },
  {
    firstName: "Mathys",
    lastName: "Tel",
    location: "Rennes",
    firstContact: "2022-08-28",
    email: "future@gmail.com",
    phone: "344658534",
    skill: "Java",
    seniority: "Senior",
    id: 19,
    assessment: "5 - Great candidate",
  },
  {
    firstName: "Raphael",
    lastName: "Guerreiro",
    location: "Lisbon",
    firstContact: "208-05-22",
    email: "quality@gmail.com",
    phone: "6543443321",
    skill: "Python",
    seniority: "Manager",
    id: 20,
    assessment: "4 - Good candidate",
  },
  {
    firstName: "Serge",
    lastName: "Gnabry",
    location: "Bremen",
    firstContact: "2016-05-22",
    email: "grubry@gmail.com",
    phone: "222222222",
    skill: "Golang",
    seniority: "Lead",
    id: 21,
    assessment: "1 - Disqualified",
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
      paddingLeft: "3rem",
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
  const login = useSelector((state) => state.login);

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
                <div>Hot profiles tab</div>
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
