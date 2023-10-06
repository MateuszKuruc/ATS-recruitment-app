import { StyledAppBar, StyledToolBar, StyledButton } from "../App";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { Store } from "@mui/icons-material";
import { useSelector } from "react-redux";

const MainAppBar = () => {
  const login = useSelector((state) => state.login);
  console.log("login", login);

  return (
    <StyledAppBar
      position="static"
      style={{
        borderRadius: "0.5rem",
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
        {login === null ? (
          <StyledButton color="inherit" component={Link} to="/login">
            <Typography variant="h4">Login</Typography>
          </StyledButton>
        ) : (
          <div style={{ display: "flex", gap: "1rem"}}>
            <Typography variant="h4">
              {login.username}
        
            </Typography>
            

            <StyledButton color="secondary" variant="contained">
              <Typography variant="h4">Logout</Typography>
            </StyledButton>
          </div>
        )}
      </StyledToolBar>
    </StyledAppBar>
  );
};

export default MainAppBar;
