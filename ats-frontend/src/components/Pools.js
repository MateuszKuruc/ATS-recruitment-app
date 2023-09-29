import { Grid, Paper, Typography, Button } from "@mui/material";
import styled from "styled-components";

const StyledPaper = styled(Paper)`
  height: 100%;
`;

const StyledButton = styled(Button)`
  && {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    border: 0.3rem solid #084c61;
  }
`;

const Pools = () => {
  return (
    <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <Grid container spacing={2} style={{ display: "flex", height: "100vh" }}>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton variant="text">
              <Typography variant="h1">Java</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton variant="text">
              <Typography variant="h1">Python</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton variant="text">
              <Typography variant="h1">JavaScript</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton variant="text">
              <Typography variant="h1">C/C#/C++</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton variant="text">
              <Typography variant="h1">Scala</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton variant="text">
              <Typography variant="h1">Big Data</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton variant="text">
              <Typography variant="h1">DevOps</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton variant="text">
              <Typography variant="h1">Mobile</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton variant="text">
              {" "}
              <Typography variant="h1">Golang</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Pools;
