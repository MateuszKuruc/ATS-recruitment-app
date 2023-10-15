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
  Box,
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
import useMediaQuery from "@mui/material/useMediaQuery";

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

const StyledContainer = styled.div`
  margin-bottom: 1rem;
`;

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

// const StyledIconButton = styled(IconButton)`

// `

const NavigationBar = () => {
  const login = useSelector((state) => state.login);
  const notification = useSelector((state) => state.notification);

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

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const renderHamburgerMenu = login !== null || isSmallScreen;

  return (
    <StyledContainer>
      <StyledAppBar position="sticky">
        <StyledToolBar>
          <IconButton
            onClick={handleOpenMobileMenu}
            sx={{
              display: renderHamburgerMenu ? "block" : "none",
            }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Drawer
            anchor="left"
            open={isMobileMenuOpen}
            onClose={handleCloseMobileMenu}
          >
            <List>
              <ListItemButton
                component={Link}
                to="/"
                onClick={handleCloseMobileMenu}
              >
                <ListItemText primary="Home" />
              </ListItemButton>

              <Hidden smUp>
                <ListItemButton
                  component={Link}
                  to="/candidates"
                  onClick={handleCloseMobileMenu}
                >
                  <ListItemText primary="Candidates" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/add"
                  onClick={handleCloseMobileMenu}
                >
                  <ListItemText primary="Add profile" />
                </ListItemButton>
              </Hidden>

              <Hidden mdUp>

              
              <ListItemButton
                component={Link}
                to="/pools"
                onClick={handleCloseMobileMenu}
              >
                <ListItemText primary="Pools" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/hot"
                onClick={handleCloseMobileMenu}
              >
                <ListItemText primary="Hot profiles" />
              </ListItemButton>
              </Hidden>

              <ListItemButton
                component={Link}
                to="/faq"
                onClick={handleCloseMobileMenu}
              >
                <ListItemText primary="FAQ" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/tips"
                onClick={handleCloseMobileMenu}
              >
                <ListItemText primary="Tips" />
              </ListItemButton>
            </List>
          </Drawer>

          {login === null ? (
            <>
              <Hidden smDown>
                <StyledButton color="inherit" component={Link} to="/">
                  <Typography variant="h5">Home</Typography>
                </StyledButton>

                <StyledButton color="inherit" component={Link} to="/faq">
                  <Typography variant="h5">FAQ</Typography>
                </StyledButton>

                <StyledButton color="inherit" component={Link} to="/tips">
                  <Typography variant="h5">Tips</Typography>
                </StyledButton>
              </Hidden>

              <StyledButton
                color="secondary"
                variant="contained"
                component={Link}
                to="/login"
              >
                <Typography variant="h5">Login</Typography>
              </StyledButton>
            </>
          ) : (
            <>
              <Hidden smDown>
                <StyledButton color="inherit" component={Link} to="/candidates">
                  <Typography variant="h5">Candidates</Typography>
                </StyledButton>
                <StyledButton color="inherit" component={Link} to="/add">
                  <Typography variant="h5">Add profile</Typography>
                </StyledButton>
                <StyledButton
                  sx={{ display: { md: "block", sm: "none" } }}
                  color="inherit"
                  component={Link}
                  to="/pools"
                >
                  <Typography variant="h5">Pools</Typography>
                </StyledButton>
                <StyledButton
                  sx={{ display: { md: "block", sm: "none" } }}
                  color="inherit"
                  component={Link}
                  to="/hot"
                >
                  <Typography variant="h5">Hot profiles</Typography>
                </StyledButton>
              </Hidden>

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
                      style={{ paddingRight: "1rem" }}
                    >
                      <ExitToAppIcon />
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                  </List>
                </Popover>

                <Typography variant="italic">{login.username}</Typography>
              </div>
            </>
          )}
        </StyledToolBar>
      </StyledAppBar>
      {notification.message && (
        <Notification
          severity={notification.severity}
          message={notification.message}
        />
      )}
    </StyledContainer>
  );
};

export default NavigationBar;
