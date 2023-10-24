import styled from "styled-components";
import { Typography, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
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
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 2rem;
    padding-top: 3rem;
    gap: 0rem;
  }
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-self: center;

  @media (max-width: 768px) {
    margin-top: 1rem;
    gap: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  && {
    text-decoration: none;
    display: flex;
    gap: 0.5rem;
    margin-top: 0.25em;
  }
`;

const Intro = styled.div`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const UserFeedback = () => {
  return (
    <AnimatedPage>
      <MainContainer>
        <Typography variant="h3">Thank you for using the ATS app!</Typography>
        <Intro>
          <Typography variant="body1">
            I would love to hear your feedback, so let me know about parts which
            need improvement and the ones you enjoyed!
          </Typography>
        </Intro>

        <Contact>
          <Typography variant="italic3">You can contact me here:</Typography>
          <StyledButton
            variant="contained"
            color="secondary"
            component="a"
            href="mailto:mateuszkuruc@gmail.com"
          >
            <EmailIcon fontSize="large" />

            <Typography variant="h6">E-mail</Typography>
          </StyledButton>
          <StyledButton
            variant="contained"
            color="secondary"
            component="a"
            href="https://www.linkedin.com/in/mateuszkuruc/"
            target="_blank"
          >
            <LinkedInIcon fontSize="large" />
            <Typography variant="h6">LinkedIn</Typography>
          </StyledButton>
        </Contact>
      </MainContainer>
    </AnimatedPage>
  );
};

export default UserFeedback;
