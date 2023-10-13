import { Grid, Paper, Typography, Button } from "@mui/material";
import styled from "styled-components";
import PoolDetails from "./PoolDetails";
import { useEffect, useState } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";

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

const Pools = ({ candidates, userId }) => {
  const navigate = useNavigate();

  const [technology, setTechnology] = useState("");
  const [poolCandidates, setPoolCandidates] = useState(null);
  const [technologyCandidates, setTechnologyCandidates] = useState(null);

  useEffect(() => {
    const filteredCandidates = candidates.filter(
      (candidate) => candidate.user === userId
    );
    setPoolCandidates(filteredCandidates);

    if (technology !== "") {
      const technologyCandidates = filteredCandidates.filter(
        (candidate) => candidate.skill === technology
      );
      console.log("tech candidates", technologyCandidates);
      setTechnologyCandidates(technologyCandidates);
    }
  }, [candidates, userId, technology]);

  if (!poolCandidates) {
    return null;
  }

  return (
    <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <Grid container spacing={2} style={{ display: "flex", height: "75vh" }}>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton variant="text" onClick={() => setTechnology("Java")}>
              <Typography variant="h1">Java</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => setTechnology("Python")}
            >
              <Typography variant="h1">Python</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => setTechnology("JavaScript")}
            >
              <Typography variant="h1">JavaScript</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton variant="text" onClick={() => setTechnology("C")}>
              <Typography variant="h1">C/C#/C++</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton variant="text" onClick={() => setTechnology("Scala")}>
              <Typography variant="h1">Scala</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => setTechnology("BigData")}
            >
              <Typography variant="h1">Big Data</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => setTechnology("DevOps")}
            >
              <Typography variant="h1">DevOps</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => setTechnology("Mobile")}
            >
              <Typography variant="h1">Mobile</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => setTechnology("Golang")}
            >
              {" "}
              <Typography variant="h1">Golang</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
      </Grid>
      {technology !== "" && (
        <PoolDetails candidatesList={technologyCandidates} />
      )}
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
