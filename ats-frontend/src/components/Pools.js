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

const Pools = ({ candidates, userId }) => {
  const navigate = useNavigate();

  const [technology, setTechnology] = useState("");
  const [candidates, setCandidates] = useState(null);

  // const handleChoice = (technology) => {
  //   console.log(technology);
  // };

  // console.log(`${"java"}Candidates`);
  // console.log("candidates in pools", candidates, userId);
 
  const 

  useEffect(() => {
    const filteredCandidates = candidates.filter(
      (candidate) => candidate.user === loginId
    );
    setCandidates(filteredCandidates);
  }, [candidates]);

  useEffect(() => {
    console.log("technology chosen", technology);

    navigate(`/pools/${technology}`);
  }, [technology, navigate]);


  return (
    <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <Grid container spacing={2} style={{ display: "flex", height: "75vh" }}>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton variant="text" onClick={() => setTechnology("java")}>
              <Typography variant="h1">Java</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => setTechnology("python")}
            >
              <Typography variant="h1">Python</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => setTechnology("javascript")}
            >
              <Typography variant="h1">JavaScript</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton variant="text" onClick={() => setTechnology("c")}>
              <Typography variant="h1">C/C#/C++</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton variant="text" onClick={() => setTechnology("scala")}>
              <Typography variant="h1">Scala</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => setTechnology("bigdata")}
            >
              <Typography variant="h1">Big Data</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => setTechnology("devops")}
            >
              <Typography variant="h1">DevOps</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => setTechnology("mobile")}
            >
              <Typography variant="h1">Mobile</Typography>
            </StyledButton>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => setTechnology("golang")}
            >
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
