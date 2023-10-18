import { Paper, Typography, Button } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import AnimatedPage from "../Layout/AnimatedPage";

const StyledPaper = styled(Paper)`
  display: flex;
  flex: 1;

  @media (max-width: 768px) {
    aspect-ratio: auto;
  }
`;

const StyledButton = styled(Button)`
  && {
    background-color: #25283d;
    color: #ffba49;
    border-radius: 0.5rem;
    border: 0.3rem solid #ffba49;
    transition: background-color 0.3s ease;
    flex: 1;

    &:hover {
      background-color: #ffba49;
      color: #ffffff;
      border: 0.3rem solid #25283d;
    }

    @media (max-width: 768px) {
      border: 0.15rem solid #ffba49;
    }
  }
`;

const MainContainer = styled.div`
  && {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.15rem;
    margin-bottom: 1rem;
    flex: 1;

    @margin (max-width: 900px) {
      gap: 0;
      margin: 0;
      padding: 0;
    }
  }
`;

const SecondaryContainer = styled.div`
  && {
    display: flex;
    flex: 1;
    gap: 0.15rem;

    @media (max-width: 900px) {
      flex-direction: column;
      gap: 0.25rem;
    }
  }
`;

const Pools = ({ setTechnology }) => {
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handleTechnologyChoice = (technologyChoice) => {
    setTechnology(technologyChoice);
    navigate(`/pools/${technologyChoice}`);
  };

  return (
    <AnimatedPage>
      <MainContainer>
        <SecondaryContainer>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => handleTechnologyChoice("Java")}
            >
              <Typography variant={isSmallScreen ? "h4" : "h1"}>
                Java
              </Typography>
            </StyledButton>
          </StyledPaper>

          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => handleTechnologyChoice("Python")}
            >
              <Typography variant={isSmallScreen ? "h4" : "h1"}>
                Python
              </Typography>
            </StyledButton>
          </StyledPaper>

          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => handleTechnologyChoice("JavaScript")}
            >
              <Typography variant={isSmallScreen ? "h4" : "h1"}>
                JavaScript
              </Typography>
            </StyledButton>
          </StyledPaper>
        </SecondaryContainer>
        <SecondaryContainer>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => handleTechnologyChoice("C")}
            >
              <Typography variant={isSmallScreen ? "h4" : "h1"}>
                C/C#/C++
              </Typography>
            </StyledButton>
          </StyledPaper>

          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => handleTechnologyChoice("Scala")}
            >
              <Typography variant={isSmallScreen ? "h4" : "h1"}>
                Scala
              </Typography>
            </StyledButton>
          </StyledPaper>

          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => handleTechnologyChoice("BigData")}
            >
              <Typography variant={isSmallScreen ? "h4" : "h1"}>
                Big Data
              </Typography>
            </StyledButton>
          </StyledPaper>
        </SecondaryContainer>
        <SecondaryContainer>
          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => handleTechnologyChoice("DevOps")}
            >
              <Typography variant={isSmallScreen ? "h4" : "h1"}>
                DevOps
              </Typography>
            </StyledButton>
          </StyledPaper>

          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => handleTechnologyChoice("Mobile")}
            >
              <Typography variant={isSmallScreen ? "h4" : "h1"}>
                Mobile
              </Typography>
            </StyledButton>
          </StyledPaper>

          <StyledPaper>
            <StyledButton
              variant="text"
              onClick={() => handleTechnologyChoice("Golang")}
            >
              {" "}
              <Typography variant={isSmallScreen ? "h4" : "h1"}>
                Golang
              </Typography>
            </StyledButton>
          </StyledPaper>
        </SecondaryContainer>
      </MainContainer>
    </AnimatedPage>
  );
};

export default Pools;
