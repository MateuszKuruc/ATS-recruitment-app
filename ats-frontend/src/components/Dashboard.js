import { StyledAppBar } from "../App";
import { StyledToolBar } from "../App";
import { Button } from "@mui/material";
import InputBase from "@mui/material";

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
            <Button color="inherit">Search</Button>
        </StyledToolBar>
        
      </StyledAppBar>
    </div>
  );
};

export default Dashboard;
