import { Typography } from "@mui/material";
import styled from "styled-components";

const MainContainer = styled.div`

`

const NotFound = () => {
  return (
    <MainContainer>
        <Typography variant="h1">404</Typography>
      <Typography variant="h2">Page not found</Typography>
    </MainContainer>
  );
};

export default NotFound;
