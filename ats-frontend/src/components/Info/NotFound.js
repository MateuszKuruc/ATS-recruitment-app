import { Typography } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
      // justify-content: center;
      padding-right: 2rem;
      padding-left: 2rem;
      padding-bottom: 5rem;
    }
  }
`;

const NotFound = () => {
  return (
    <MainContainer>
      <Typography variant="h1" style={{ color: "#8F3985" }}>
        404
      </Typography>
      <Typography variant="h2" style={{ color: "#8F3985" }}>
        Page not found
      </Typography>
      <p>
        <Typography variant="italic3">
          <p>
            Sorry, the page you are trying to reach does not exist. Please use
            correct address to display content.
          </p>
          <p>
            If you think something is broken and wish to report it, use{" "}
            <Link to="/feedback">
              <em>feedback page</em>
            </Link>
            .
          </p>
        </Typography>
      </p>
    </MainContainer>
  );
};

export default NotFound;
