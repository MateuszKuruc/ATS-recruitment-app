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
import useMediaQuery from "@mui/material/useMediaQuery";

import { useLocation } from "react-router-dom";

const StyledButton = styled(Button)`
  && {
    padding-right: 1rem;
    padding-left: 1rem;
  }
`;

const StyledToolBar = styled(Toolbar)`
  display: flex;
  gap: 2rem;
  justify-content: space-around;
  // align-content: center;
  // padding: 1rem
`;

const StyledAppBar = styled(AppBar)`
  padding: 1rem;
  // margin: 0rem;
  border-radius: 0.5rem;
  // margin-bottom: 0.1rem;
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
  // flex: 1;
`;

const StyledContainer = styled.div`
  margin-bottom: 1rem;
`;

const StyledInputBase = styled(InputBase)`
  && {
    color: #ffffff;
  }
`;

const StyledListItemButton = styled(ListItemButton)`
  && {
    // background-color: #800020;
    // // color: #800020;

    &:hover {
      background-color: #800020;
    }
  }
`;

const NavigationBar = () => {
  const login = useSelector((state) => state.login);
  const notification = useSelector((state) => state.notification);

  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const open = Boolean(anchorEl);

  const getStylesForButton = (path, currentPath) => {
    const isActive = path === currentPath;
    return {
      backgroundColor: isActive ? "#800020" : "initial",
      color: isActive ? "#ffffff" : "initial",
    };
  };

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
              <StyledListItemButton
                component={Link}
                to="/"
                onClick={handleCloseMobileMenu}
                sx={getStylesForButton("/", location.pathname)}
              >
                <ListItemText primary="Home" />
              </StyledListItemButton>

              <Hidden mdUp>
                {login && (
                  <>
                    <StyledListItemButton
                      component={Link}
                      to="/candidates"
                      onClick={handleCloseMobileMenu}
                      sx={getStylesForButton("/candidates", location.pathname)}
                    >
                      <ListItemText
                        primary="Profiles"
                        secondary="All candidates"
                      />
                    </StyledListItemButton>

                    <StyledListItemButton
                      component={Link}
                      to="/add"
                      onClick={handleCloseMobileMenu}
                      sx={getStylesForButton("/add", location.pathname)}
                    >
                      <ListItemText
                        primary="Form"
                        secondary="Add new profile"
                      />
                    </StyledListItemButton>

                    <StyledListItemButton
                      component={Link}
                      to="/pools"
                      onClick={handleCloseMobileMenu}
                      sx={getStylesForButton("/pools", location.pathname)}
                    >
                      <ListItemText primary="Pools" secondary="Sort by tech" />
                    </StyledListItemButton>
                    <StyledListItemButton
                      component={Link}
                      to="/hot"
                      onClick={handleCloseMobileMenu}
                      sx={getStylesForButton("/hot", location.pathname)}
                    >
                      <ListItemText
                        primary="Hot"
                        secondary="Show best talent"
                      />
                    </StyledListItemButton>
                  </>
                )}
              </Hidden>

              <StyledListItemButton
                component={Link}
                to="/faq"
                onClick={handleCloseMobileMenu}
                sx={getStylesForButton("/faq", location.pathname)}
              >
                <ListItemText primary="FAQ" />
              </StyledListItemButton>
              <StyledListItemButton
                component={Link}
                to="/tips"
                onClick={handleCloseMobileMenu}
                sx={getStylesForButton("/tips", location.pathname)}
              >
                <ListItemText primary="Tips" />
              </StyledListItemButton>

              <Hidden mdUp>
                {login && (
                  <>
                    <StyledListItemButton
                      component={Link}
                      to="/feedback"
                      onClick={handleCloseMobileMenu}
                      sx={getStylesForButton("/feedback", location.pathname)}
                    >
                      <ListItemText primary="Feedback" />
                    </StyledListItemButton>
                    <StyledListItemButton
                      component={Link}
                      to="/help"
                      onClick={handleCloseMobileMenu}
                      sx={getStylesForButton("/help", location.pathname)}
                    >
                      <ListItemText primary="Help" />
                    </StyledListItemButton>
                    <StyledListItemButton
                      component={Link}
                      to="/logout"
                      onClick={handleCloseMobileMenu}
                      sx={getStylesForButton("/logout", location.pathname)}
                    >
                      <ListItemText primary="Logout" />
                    </StyledListItemButton>
                  </>
                )}
              </Hidden>
            </List>
          </Drawer>

          {login === null ? (
            <>
              <Hidden smDown>
                <StyledButton
                  color="inherit"
                  component={Link}
                  to="/"
                  sx={{
                    backgroundColor:
                      location.pathname === "/" ? "#800020" : "initial",
                  }}
                >
                  <Typography variant="h5">Home</Typography>
                </StyledButton>

                <StyledButton
                  color="inherit"
                  component={Link}
                  to="/faq"
                  sx={{
                    backgroundColor:
                      location.pathname === "/faq" ? "#800020" : "initial",
                  }}
                >
                  <Typography variant="h5">FAQ</Typography>
                </StyledButton>

                <StyledButton
                  color="inherit"
                  component={Link}
                  to="/tips"
                  sx={{
                    backgroundColor:
                      location.pathname === "/tips" ? "#800020" : "initial",
                  }}
                >
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
              <Hidden mdDown>
                <StyledButton
                  color="inherit"
                  component={Link}
                  to="/candidates"
                  sx={{
                    backgroundColor:
                      location.pathname === "/candidates"
                        ? "#800020"
                        : "initial",
                  }}
                >
                  <Typography variant="h5">profiles</Typography>
                </StyledButton>
                <StyledButton
                  color="inherit"
                  component={Link}
                  to="/add"
                  sx={{
                    backgroundColor:
                      location.pathname === "/add" ? "#800020" : "initial",
                  }}
                >
                  <Typography variant="h5">form</Typography>
                </StyledButton>

                <StyledButton
                  color="inherit"
                  component={Link}
                  to="/pools"
                  sx={{
                    backgroundColor:
                      location.pathname === "/pools" ? "#800020" : "initial",
                  }}
                >
                  <Typography variant="h5">Pools</Typography>
                </StyledButton>
                <StyledButton
                  color="inherit"
                  component={Link}
                  to="/hot"
                  sx={{
                    backgroundColor:
                      location.pathname === "/hot" ? "#800020" : "initial",
                  }}
                >
                  <Typography variant="h5">Hot</Typography>
                </StyledButton>
              </Hidden>

              <Search>
                <SearchIcon style={{ color: "#ffffff" }} />
                <StyledInputBase
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>

              <Hidden mdDown>
                <div>
                  <Tooltip title={`${login.username} logged in`}>
                    <IconButton
                      onClick={handleOpenMenu}
                      style={{ color: "#ffffff" }}
                    >
                      <AccountBoxIcon fontSize="large" />
                      <Typography variant="h6">{login.username}</Typography>
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
                      <StyledListItemButton
                        component={Link}
                        to="/feedback"
                        onClick={handleCloseMenu}
                      >
                        <ChatBubbleIcon />
                        <ListItemText primary="Feedback" />
                      </StyledListItemButton>
                      <StyledListItemButton
                        component={Link}
                        to="/help"
                        onClick={handleCloseMenu}
                      >
                        <HelpIcon />
                        <ListItemText primary="Help" />
                      </StyledListItemButton>
                      <StyledListItemButton
                        component={Link}
                        to="/logout"
                        onClick={handleCloseMenu}
                        style={{ paddingRight: "1rem" }}
                      >
                        <ExitToAppIcon />
                        <ListItemText primary="Logout" />
                      </StyledListItemButton>
                    </List>
                  </Popover>
                </div>
              </Hidden>
            </>
          )}
          {login && (
            <IconButton
              onClick={handleOpenMobileMenu}
              sx={{ display: { md: "none", sm: "block", xs: "block" } }}
              style={{ color: "#ffffff" }}
            >
              <AccountBoxIcon fontSize="large" />
              <Typography variant="h6">{login.username}</Typography>
            </IconButton>
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
