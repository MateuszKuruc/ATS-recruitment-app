import { StyledAppBar, StyledToolBar, StyledButton } from "../App";
import { Link } from "react-router-dom";
import { Typography, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

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
          <StyledButton
            color="secondary"
            variant="contained"
            component={Link}
            to="/login"
          >
            <Typography variant="h4">Login</Typography>
          </StyledButton>
        ) : (
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ display: "flex", alignSelf: "center" }}>
              <Tooltip title={`${login.username} logged in`}>
                <AccountBoxIcon style={{ fontSize: "2rem" }} />
              </Tooltip>
            </div>

            <StyledButton
              color="secondary"
              variant="contained"
              component={Link}
              to="/logout"
            >
              <Typography variant="h4">Logout</Typography>
            </StyledButton>
          </div>
        )}
      </StyledToolBar>
    </StyledAppBar>
  );
};

export default MainAppBar;
