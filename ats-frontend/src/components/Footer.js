import { Typography, Paper } from "@mui/material";
import styled from "styled-components";
import githubIcon from "../icons/github.svg";
import linkedinIcon from "../icons/linkedin.svg";

const StyledPaper = styled(Paper)`
  padding: 2rem;
  margin-top: auto;
  //   padding: 2rem;
  //   text-align: center;
`;

const StyledImg = styled.img`
  width: 1rem;
`;

const StyledContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const Footer = () => {
  return (
    <StyledPaper style={{ background: "#084c61" }}>
      <StyledContainer>
        <Typography variant="h5" style={{ color: "#FFFFFF" }}>
          Applicant Tracking System by Mateusz Kuruc
        </Typography>

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
      </StyledContainer>
    </StyledPaper>
  );
};

export default Footer;
