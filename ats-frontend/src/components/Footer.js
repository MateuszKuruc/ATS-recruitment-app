import { Container, Typography, Paper } from "@mui/material";
import styled from "styled-components";
import githubIcon from "../icons/github.svg";
import linkedinIcon from "../icons/linkedin.svg";

const StyledPaper = styled(Paper)`
  padding: 2rem;
  margin-top: auto;
  padding: 2rem;
  text-align: center;
`;

const StyledImg = styled.img`
  width: 1rem;
`;

const Footer = () => {
  return (
    <StyledPaper style={{ background: "#084c61" }}>
      <Container>
        <Typography variant="h5">
          Applicant Tracking System by Mateusz Kuruc
          <a
            href="https://github.com/MateuszKuruc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <StyledImg src={githubIcon} alt="GitHub Icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/mateuszkuruc/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <StyledImg src={linkedinIcon} alt="LinkedIn Icon" />
          </a>
        </Typography>
      </Container>
    </StyledPaper>
  );
};

export default Footer;
