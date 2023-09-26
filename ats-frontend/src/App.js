import LoginForm from "./components/LoginForm";
import InfoTab from "./components/InfoTab";
import TipsTab from "./components/TipsTab";

import {
  Container,
  AppBar,
  Button,
  Toolbar,
  createTheme,
  ThemeProvider,
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

function App() {
  return (
    <div>
      <h1>Applicant Tracking System - get your pipeline under control!</h1>
      <p>
        <i>Log in to see your pipeline</i>
      </p>
      <LoginForm />
      <InfoTab />
      <TipsTab />
    </div>
  );
}

export default App;
