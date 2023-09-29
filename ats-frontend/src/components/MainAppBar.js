import { StyledAppBar, StyledToolBar, StyledButton } from "../App";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const MainAppBar = () => {
  return (
    <StyledAppBar
      position="static"
      style={{
        borderTopLeftRadius: "0.5rem",
        borderTopRightRadius: "0.5rem",
        marginBottom: "0.1rem",
      }}
    >
      <StyledToolBar>
        <StyledButton color="inherit" component={Link} to="/">
          <Typography variant="h4">Home</Typography>
        </StyledButton>
        <StyledButton color="inherit" component={Link} to="/dashboard">
          <Typography variant="h4">Dashboard</Typography>
        </StyledButton>
        <StyledButton color="inherit" component={Link} to="/faq">
          <Typography variant="h4">FAQ</Typography>
        </StyledButton>
        <StyledButton color="inherit" component={Link} to="/tips">
          <Typography variant="h4">Tips</Typography>
        </StyledButton>
        <StyledButton color="inherit" component={Link} to="/login">
          <Typography variant="h4">Login</Typography>
        </StyledButton>
      </StyledToolBar>
    </StyledAppBar>
  );
};

export default MainAppBar;
