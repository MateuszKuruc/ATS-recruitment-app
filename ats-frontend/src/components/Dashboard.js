import { StyledAppBar } from "../App";
import { StyledToolBar } from "../App";
import { Button, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { secondaryColor } from "../App";

import { Link } from "react-router-dom";

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

const Dashboard = () => {
  return (
    <div>
      <StyledAppBar
        position="static"
        style={{
          backgroundColor: secondaryColor,
          padding: 4,
          borderBottomLeftRadius: "0.5rem",
          borderBottomRightRadius: "0.5rem",
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
    </div>
  );
};

export default Dashboard;
