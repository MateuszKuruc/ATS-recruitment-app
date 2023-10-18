import { Typography, Paper, IconButton } from "@mui/material";
import styled from "styled-components";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const StyledPaper = styled(Paper)`
  && {
    padding: 2rem;
    margin-top: auto;
    background: #25283d;

    @media (max-width: 768px) {
      padding: 0rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
    }
  }
`;

const StyledContainer = styled.div`
  && {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
      gap: 0rem;
    }
  }
`;

const Footer = () => {
  const caption =
    window.innerWidth <= 768
      ? "ATS by Mateusz Kuruc"
      : "Applicant Tracking System by Mateusz Kuruc";

  return (
    <StyledPaper>
      <StyledContainer>
        <Typography variant="h5" style={{ color: "#FFBA49" }}>
          {caption}
        </Typography>
        <IconButton>
          <a
            href="https://github.com/MateuszKuruc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon fontSize="large" style={{ color: "#FFBA49" }} />
          </a>
        </IconButton>
        <IconButton>
          <a
            href="https://www.linkedin.com/in/mateuszkuruc/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon fontSize="large" style={{ color: "#FFBA49" }} />
          </a>
        </IconButton>
      </StyledContainer>
    </StyledPaper>
  );
};

export default Footer;
