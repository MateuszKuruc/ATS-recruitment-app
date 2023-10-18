import styled from "styled-components";
import { Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const MainContainer = styled.div`
  background-color: #ebcbf4;
  flex: 1;
  padding: 5rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    padding: 2rem;
    padding-top: 3rem;
  }
`;
const ContactContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  // @media (max-width: 768px) {
  //   margin-top: 1rem;
  // }
`;
const StyledLink = styled.a`
  text-decoration: none;
`;

const Contact = styled.div`

display: flex;
flex-direction: column;
gap: 0.5rem;

@media (max-width: 768px) {
  margin-top: 1rem;
}
`;

const UserFeedback = () => {
  return (
    <MainContainer>
      <Typography variant="h3">Thank you for using the ATS app!</Typography>
      <Typography variant="body1">
        <p>
          I would love to hear your feedback, so let me know about parts which
          need improvement and the ones you enjoyed!
        </p>
      </Typography>

      <Contact>
      <Typography variant="italic3">You can contact me here:</Typography>
        <ContactContainer>
          <EmailIcon fontSize="large" />

          <StyledLink href="mailto:mateuszkuruc@gmail.com">
            <Typography variant="h6">E-mail</Typography>
          </StyledLink>
        </ContactContainer>
        <ContactContainer>
          <LinkedInIcon fontSize="large" />
          <StyledLink
            href="https://www.linkedin.com/in/mateuszkuruc/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Typography variant="h6">LinkedIn</Typography>
          </StyledLink>
        </ContactContainer>
      </Contact>
    </MainContainer>
  );
};

export default UserFeedback;
