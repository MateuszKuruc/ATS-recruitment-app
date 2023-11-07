import { Typography } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AnimatedPage from "../Layout/AnimatedPage";

const MainContainer = styled.div`
  && {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 10rem;

    @media (max-width: 1440px) {
      padding-top: 3rem;
    }

    @media (max-width: 768px) {
      padding-top: 2rem;
      padding-right: 2rem;
      padding-left: 2rem;
      padding-bottom: 5rem;
    }
  }
`;

const StyledTypography = styled(Typography)`
  && {
    color: #8f3985;
  }
`;

const NotFound = () => {
  return (
    <AnimatedPage>
      <MainContainer>
        <StyledTypography variant="h1">404</StyledTypography>
        <StyledTypography variant="h2" style={{ paddingBottom: "2rem" }}>
          Page not found
        </StyledTypography>

        <Typography variant="italic3">
          Sorry, the page you are trying to reach does not exist. Please use
          correct address to display content. If you think something is broken
          and wish to report it, use{" "}
          <Link to="/feedback">
            <em>feedback page</em>
          </Link>
          .
        </Typography>
      </MainContainer>
    </AnimatedPage>
  );
};

export default NotFound;
