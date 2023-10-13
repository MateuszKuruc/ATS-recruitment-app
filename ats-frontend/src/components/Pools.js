import { Grid, Paper, Typography, Button } from "@mui/material";
import styled from "styled-components";
import PoolDetails from "./PoolDetails";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const StyledPaper = styled(Paper)`
  height: 100%;
  // height: 15rem;
  // border: 5px solid red;
`;

const StyledButton = styled(Button)`
  && {
    width: 100%;
    background-color: #c0d9e7;
    height: 100%;
    border-radius: 0.5rem;
    border: 0.3rem solid #084c61;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #084c61;
      color: #ffffff;
    }
  }
`;

const Pools = ({ setTechnology }) => {
  const navigate = useNavigate();

  const handleTechnologyChoice = (technologyChoice) => {
    setTechnology(technologyChoice);
    navigate(`/pools/${technologyChoice}`);
  };

  return (
    <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <Grid container spacing={2} style={{ display: "flex", height: "75vh" }}>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => handleTechnologyChoice("Java")}
            >
              <Typography variant="h1">Java</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => handleTechnologyChoice("Python")}
            >
              <Typography variant="h1">Python</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => handleTechnologyChoice("JavaScript")}
            >
              <Typography variant="h1">JavaScript</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => handleTechnologyChoice("C")}
            >
              <Typography variant="h1">C/C#/C++</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => handleTechnologyChoice("Scala")}
            >
              <Typography variant="h1">Scala</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => handleTechnologyChoice("BigData")}
            >
              <Typography variant="h1">Big Data</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => handleTechnologyChoice("DevOps")}
            >
              <Typography variant="h1">DevOps</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => handleTechnologyChoice("Mobile")}
            >
              <Typography variant="h1">Mobile</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => handleTechnologyChoice("Golang")}
            >
              {" "}
              <Typography variant="h1">Golang</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
      </Grid>
      {/* {technology !== "" && (
        <PoolDetails candidatesList={technologyCandidates} />
      )} */}
      {/* <Routes>
        <Route
          path={`/${technology}`}
          element={<PoolDetails candidateList={technologyCandidates} />}
        />
      </Routes> */}
    </div>
  );
};

export default Pools;
