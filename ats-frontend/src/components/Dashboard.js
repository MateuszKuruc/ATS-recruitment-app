import { Button, InputBase, Typography, AppBar, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { secondaryColor } from "../App";
import Notification from "./Notification";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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

const StyledAppBar = styled(AppBar)`
  padding: 1rem;
  margin: 0rem;
`;

const StyledToolBar = styled(Toolbar)`
  display: flex;
  gap: 2rem;
  justify-content: space-around;
`;

const Dashboard = () => {
  const notification = useSelector((state) => state.notification);
  return (
    <div>
      <StyledAppBar
        position="static"
        style={{
          backgroundColor: secondaryColor,
          padding: 4,
          borderRadius: "0.5rem",
        }}
      >
        <StyledToolBar>
          <Button color="inherit" component={Link} to="/candidates">
            <Typography variant="h6">All candidates</Typography>
          </Button>
          <Button color="inherit" component={Link} to="/add">
            <Typography variant="h6">Add profile</Typography>
          </Button>
          <Button color="inherit" component={Link} to="/pools">
            <Typography variant="h6">Pools</Typography>
          </Button>
          <Button color="inherit" component={Link} to="/hot">
            <Typography variant="h6">Hot profiles</Typography>
          </Button>
          <Search>
            <SearchIcon />
            <InputBase placeholder="Search..." style={{ color: "white" }} />
          </Search>
        </StyledToolBar>
      </StyledAppBar>
      {notification.message && (
        <Notification
          severity={notification.severity}
          message={notification.message}
        />
      )}
    </div>
  );
};

export default Dashboard;
