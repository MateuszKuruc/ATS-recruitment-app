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
  Hidden,
  Drawer,
  InputBase,
} from "@mui/material";
import Notification from "./Notification";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import IconButton from "@mui/material/IconButton";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import HelpIcon from "@mui/icons-material/Help";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const StyledButton = styled(Button)`
  font-size: 2.3rem;
  font-weight: 900;
`;

const StyledToolBar = styled(Toolbar)`
  display: flex;
  gap: 2rem;
  justify-content: space-around;
  // padding: 1rem
`;

const StyledAppBar = styled(AppBar)`
    padding: 1rem;
    // margin: 0rem;
    border-radius: 0.5rem;
    // margin-bottom: 0.1rem;
`;

const StyledFlexContainer = styled.div`
  @media (max-width: 900px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // gap: 1rem;
  }
`;

const Search = styled.div`
  display: flex;
  background-color: #800020;
  opacity: 1;
  padding: 4px;
  align-items: center;
  border-radius: 0.5rem;
  gap: 0.75rem;
  padding: 0.5rem;
`;

const StyledContainer = styled.div``;

// const StyledAppBar = styled(AppBar)`
//   && {
//     padding: 1rem;
//     margin: 0rem;
//     padding: 0.25rem;
//     border-radius: 0.5rem;
//     background-color: #990033;
//   }
// `;

// const StyledToolBar = styled(Toolbar)`
//   //   display: flex;
//   //   gap: 2rem;
//   //   justify-content: space-around;
// `;

const StyledInputBase = styled(InputBase)`
  && {
    color: #ffffff;
  }
`;

const NavigationBar = () => {
  const login = useSelector((state) => state.login);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (event) => {
    setAnchorEl(null);
  };

  const handleOpenMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <StyledContainer>
      <StyledAppBar position="sticky">
        <StyledToolBar>
          <StyledButton color="inherit" component={Link} to="/">
            <Typography variant="h5">Home</Typography>
          </StyledButton>
          <StyledButton color="inherit" component={Link} to="/candidates">
            <Typography variant="h5">All candidates</Typography>
          </StyledButton>
          <StyledButton color="inherit" component={Link} to="/add">
            <Typography variant="h5">Add profile</Typography>
          </StyledButton>
          <StyledButton color="inherit" component={Link} to="/pools">
            <Typography variant="h5">Pools</Typography>
          </StyledButton>
          <StyledButton color="inherit" component={Link} to="/hot">
            <Typography variant="h5">Hot profiles</Typography>
          </StyledButton>
          {/* <StyledButton color="inherit" component={Link} to="/dashboard">
            <Typography variant="h5">Dashboard</Typography>
          </StyledButton> */}
          <StyledButton color="inherit" component={Link} to="/faq">
            <Typography variant="h5">FAQ</Typography>
          </StyledButton>
          <StyledButton color="inherit" component={Link} to="/tips">
            <Typography variant="h5">Tips</Typography>
          </StyledButton>
          {login === null ? (
            <StyledButton
              color="secondary"
              variant="contained"
              component={Link}
              to="/login"
            >
              <Typography variant="h5">Login</Typography>
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
    </StyledContainer>
  );
};

export default NavigationBar;
