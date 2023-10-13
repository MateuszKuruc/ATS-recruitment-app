import { Link } from "react-router-dom";
import {
  Typography,
  Tooltip,
  Popover,
  List,
  ListItemText,
  ListItemButton,
  Button,
  Toolbar,
  AppBar,
} from "@mui/material";
import { useSelector } from "react-redux";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import IconButton from "@mui/material/IconButton";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import HelpIcon from "@mui/icons-material/Help";
import { useState } from "react";
import styled from "styled-components";

const StyledButton = styled(Button)`
  font-size: 2.3rem;
  font-weight: 900;
`;

const StyledToolBar = styled(Toolbar)`
  display: flex;
  gap: 2rem;
  justify-content: space-around;
`;

const StyledAppBar = styled(AppBar)`
  padding: 1rem;
  margin: 0rem;
  border-radius: 0.5rem;
  margin-bottom: 0.1rem;
`;

const MainAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const login = useSelector((state) => state.login);

  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (event) => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="static">
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
          <div>
            <Tooltip title={`${login.username} logged in`}>
              <IconButton onClick={handleOpenMenu}>
                <AccountBoxIcon style={{ fontSize: "2rem" }} />
              </IconButton>
            </Tooltip>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <List>
                <ListItemButton
                  component={Link}
                  to="/feedback"
                  onClick={handleCloseMenu}
                >
                  <ChatBubbleIcon />
                  <ListItemText primary="Feedback" />
                </ListItemButton>
                <ListItemButton
                  component={Link}
                  to="/help"
                  onClick={handleCloseMenu}
                >
                  <HelpIcon />
                  <ListItemText primary="Help" />
                </ListItemButton>
                <ListItemButton
                  component={Link}
                  to="/logout"
                  onClick={handleCloseMenu}
                  style={{ paddingRight: "1rem" }} // Adjust padding
                >
                  <ExitToAppIcon />
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </List>
            </Popover>

            <Typography variant="italic">{login.username}</Typography>
          </div>
        )}
      </StyledToolBar>
    </StyledAppBar>
  );
};

export default MainAppBar;
