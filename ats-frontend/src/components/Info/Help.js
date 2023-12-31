import styled from "styled-components";
import { Typography, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";
import AnimatedPage from "../Layout/AnimatedPage";

const MainContainer = styled.div`
  background-color: #ebcbf4;
  flex: 1;
  padding: 5rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 2rem;
    padding-top: 3rem;
    gap: 1rem;
  }
`;

const Contact = styled.div`
  && {
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
      margin-top: 1rem;
    }

    @media (min-width: 1280px) {
      max-width: 300px;
    }
  }
`;

const StyledButton = styled(Button)`
  && {
    text-decoration: none;
    display: flex;
    gap: 0.5rem;
  }
`;

const Content = styled.div``;

const Help = () => {
  return (
    <AnimatedPage>
      <MainContainer>
        <Typography variant="h3">Need help?</Typography>
        <Typography variant="body1">
          If you are facing difficulties with the ATS app, please get in touch
          and report them, so the app can be improved.
        </Typography>

        <Content>
          <Typography variant="h6">Please describe:</Typography>
          <ul>
            <Typography variant="body1">
              <li>Problem or bug you are facing</li>
              <li>When it occurs</li>
              <li>Web browsers where the issue occurs</li>
            </Typography>
          </ul>
        </Content>

        <Contact>
          <StyledButton
            variant="contained"
            color="secondary"
            component={Link}
            to="mailto:mateuszkuruc@gmail.com"
          >
            <EmailIcon fontSize="large" />
            <Typography variant="h5">Report</Typography>
          </StyledButton>
        </Contact>
      </MainContainer>
    </AnimatedPage>
  );
};

export default Help;
