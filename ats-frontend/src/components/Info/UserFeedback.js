import styled from "styled-components";
import { Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const MainContainer = styled.div`
background-color: #EBCBF4;
flex: 1;
padding: 5rem;
border-radius: 0.5rem;
display: flex;
flex-direction: column;
justify-content: flex-start;
`;
const ContactContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
const StyledLink = styled.a`
  text-decoration: none;
`;

const Contact = styled.div``;

const UserFeedback = () => {
  return (
    <MainContainer>
      <Typography variant="h3">Thank you for using the ATS app!</Typography>
      <Typography variant="body1">
        <p>
          I would love to hear your feedback after checking out the app. If
          there are any functionalities that were unintuitive, did not work
          properly or made the user experience cumbersome, let me know.
        </p>
        <p>
          On the other hand, if you enjoyed the implementation of the system,
          feel free to tell me what are the parts that you especially liked!
        </p>
      </Typography>

      <Typography variant="italic3">You can contact me here:</Typography>
      <Contact>
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
