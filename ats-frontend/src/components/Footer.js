import { Typography, Paper, IconButton } from "@mui/material";
import styled from "styled-components";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const StyledPaper = styled(Paper)`
  padding: 2rem;
  margin-top: auto;
`;

const StyledContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const Footer = () => {
  return (
    <StyledPaper style={{ background: "#990033" }}>
      <StyledContainer>
        <Typography variant="h5" style={{ color: "#FFFFFF" }}>
          Applicant Tracking System by Mateusz Kuruc
        </Typography>
        <IconButton>
          <a
            href="https://github.com/MateuszKuruc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon fontSize="large" color="action" />
          </a>
        </IconButton>
        <IconButton>
          <a
            href="https://www.linkedin.com/in/mateuszkuruc/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon fontSize="large" color="action" />
          </a>
        </IconButton>
      </StyledContainer>
    </StyledPaper>
  );
};

export default Footer;
