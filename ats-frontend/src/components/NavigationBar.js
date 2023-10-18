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
} from "@mui/material";
import Notification from "./Notification";
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
import SearchBar from "./SearchBar";

const StyledButton = styled(Button)`
  && {
    padding-right: 1rem;
    padding-left: 1rem;

    &:hover {
      background-color: #ffba49;
    }
  }
`;

const StyledToolBar = styled(Toolbar)`
  display: flex;
  gap: 2rem;
  justify-content: space-around;
`;

const StyledAppBar = styled(AppBar)`
  padding: 1rem;
  border-radius: 0.5rem;
`;

const StyledContainer = styled.div`
  margin-bottom: 1rem;
`;

const StyledListItemButton = styled(ListItemButton)`
  && {
    &:hover {
      background-color: #ffba49;
    }
  }
`;

const ProfileListItemButton = styled(ListItemButton)`
  && {
    display: flex;
    gap: 0.5rem;

    &:hover {
      background-color: #ffba49;
    }
  }
`;

const LoginButton = styled(Button)`
  && {
    padding-right: 1rem;
    padding-left: 1rem;

    background-color: #25283d;
    color: #ffba49;

    &:hover {
      background-color: #ffba49;
      color: #000000;
    }
  }
`;

const NavigationBar = ({ candidates }) => {
  const login = useSelector((state) => state.login);
  const notification = useSelector((state) => state.notification);

  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const open = Boolean(anchorEl);

  const getStylesForButton = (path, currentPath) => {
    let isActive;
    if (currentPath.startsWith("/pools") && path === "/pools") {
      isActive = true;
    } else if (
      currentPath.startsWith("/candidates") &&
      path === "/candidates"
    ) {
      isActive = true;
    } else {
      isActive = path === currentPath;
    }
    // const isActive = path === currentPath;
    return {
      backgroundColor: isActive ? "#FFBA49" : "initial",

      // color: isActive ? "#ffffff" : "initial",
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
            PaperProps={{
              sx: {
                width: { sm: "50%", xs: "50%" },
                maxWidth: { md: "200px" },
              },
            }}
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
                      location.pathname === "/" ? "#ffba49" : "initial",
                    color: location.pathname === "/" ? "#000000" : "#ffffff",
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
                      location.pathname === "/faq" ? "#ffba49" : "initial",
                    color: location.pathname === "/faq" ? "#000000" : "#ffffff",
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
                      location.pathname === "/tips" ? "#ffba49" : "initial",
                    color:
                      location.pathname === "/tips" ? "#000000" : "#ffffff",
                  }}
                >
                  <Typography variant="h5">Tips</Typography>
                </StyledButton>
              </Hidden>

              <LoginButton
                color="secondary"
                variant="contained"
                component={Link}
                to="/login"
              >
                <Typography variant="h5">Login</Typography>
              </LoginButton>
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
                        ? "#ffba49"
                        : "initial",
                    color:
                      location.pathname === "/candidates"
                        ? "#000000"
                        : "#ffffff",
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
                      location.pathname === "/add" ? "#ffba49" : "initial",
                    color: location.pathname === "/add" ? "#000000" : "#ffffff",
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
                      location.pathname === "/pools" ? "#ffba49" : "initial",
                    color:
                      location.pathname === "/pools" ? "#000000" : "#ffffff",
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
                      location.pathname === "/hot" ? "#ffba49" : "initial",
                    color: location.pathname === "/hot" ? "#000000" : "#ffffff",
                  }}
                >
                  <Typography variant="h5">Hot</Typography>
                </StyledButton>
              </Hidden>

              <SearchBar candidates={candidates} />

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
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <List>
                      <ProfileListItemButton
                        component={Link}
                        to="/feedback"
                        onClick={handleCloseMenu}
                      >
                        <ChatBubbleIcon />
                        <ListItemText primary="Feedback" />
                      </ProfileListItemButton>
                      <ProfileListItemButton
                        component={Link}
                        to="/help"
                        onClick={handleCloseMenu}
                      >
                        <HelpIcon />
                        <ListItemText primary="Help" />
                      </ProfileListItemButton>
                      <ProfileListItemButton
                        component={Link}
                        to="/logout"
                        onClick={handleCloseMenu}
                        style={{ paddingRight: "1rem" }}
                      >
                        <ExitToAppIcon />
                        <ListItemText primary="Logout" />
                      </ProfileListItemButton>
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
