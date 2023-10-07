import { StyledAppBar, StyledToolBar, StyledButton } from "../App";
import { Link } from "react-router-dom";
import {
  Typography,
  Tooltip,
  Popover,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useSelector } from "react-redux";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import IconButton from "@mui/material/IconButton";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import HelpIcon from "@mui/icons-material/Help";
import { useState } from "react";

const MainAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const login = useSelector((state) => state.login);
  console.log("login", login);

  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (event) => {
    setAnchorEl(null);
  };

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
          <div>
            <Tooltip title={`${login.username} logged in`}>
              <IconButton>
                <AccountBoxIcon
                  style={{ fontSize: "2rem" }}
                  onClick={handleOpenMenu}
                />
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
                // horizontal: "right",
              }}
            >
              <List>
                <ListItem
                  button
                  component={Link}
                  to="/feedback"
                  onClick={handleCloseMenu}
                >
                  <ChatBubbleIcon />
                  <ListItemText primary="Feedback" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/help"
                  onClick={handleCloseMenu}
                >
                  <HelpIcon />
                  <ListItemText primary="Help" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/logout"
                  onClick={handleCloseMenu}
                  style={{ paddingRight: "1rem" }} // Adjust padding
                >
                  <ExitToAppIcon />
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </Popover>
            {/* </div> */}

            {/* <StyledButton
              color="secondary"
              variant="contained"
              component={Link}
              to="/logout"
            >
              <Typography variant="h4">Logout</Typography>
            </StyledButton> */}
            {/* <StyledButton variant="contained"> */}
            <Typography variant="italic">{login.username}</Typography>
            {/* </StyledButton> */}
          </div>
        )}
      </StyledToolBar>
    </StyledAppBar>
  );
};

export default MainAppBar;
