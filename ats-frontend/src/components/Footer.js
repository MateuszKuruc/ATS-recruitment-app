import { Container, Typography, Paper } from "@mui/material";
import styled from "styled-components";
import github from "../icons/github.svg";
import linkedin from "../icons/linkedin.svg";

const StyledPaper = styled(Paper)`
  padding: 2rem;
  margin-top: auto;
  padding: 2rem;
  text-align: center;
`;

const Footer = () => {
  return (
    <StyledPaper style={{ background: "#084c61" }}>
      <Container>
        <Typography variant="h5">
          Applicant Tracking System by Mateusz Kuruc
        </Typography>
      </Container>
    </StyledPaper>
  );
};

export default Footer;
