import { StyledAppBar } from "../App";
import { StyledToolBar } from "../App";
import { Button, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

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

const Dashboard = ({ secondaryColor }) => {
  return (
    <div>
      <StyledAppBar
        position="static"
        style={{ backgroundColor: secondaryColor, padding: 4 }}
      >
        <StyledToolBar>
          <Button color="inherit">All candidates</Button>
          <Button color="inherit">Add profile</Button>
          <Button color="inherit">Pools</Button>
          <Button color="inherit">Hot profiles</Button>
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
