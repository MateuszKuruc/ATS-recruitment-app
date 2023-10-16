import { Paper, Typography, Button } from "@mui/material";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

const StyledPaper = styled(Paper)`
  // height: 100%;
  // width: 100%;
  // aspect-ratio: 1 / 1;
  // max-width: 300px;
  display: flex;
  flex: 1;

  @media (max-width: 768px) {
    aspect-ratio: auto;
    // flex: 0;
    // margin: 0;
  }
`;

const StyledButton = styled(Button)`
  && {
    // width: 100%;
    background-color: #c0d9e7;
    // height: 100%;
    border-radius: 0.5rem;
    border: 0.3rem solid #084c61;
    transition: background-color 0.3s ease;

    flex: 1;

    &:hover {
      background-color: #084c61;
      color: #ffffff;
    }
  }
`;

// const StyledGridContainer = styled(Grid)`
//   && {
//     align-self: center;
//     border: 1px solid red;
//   }
// `;

// const StyledComponentContainer = styled.div`
//   margin-bottom: 1rem;
//   display: flex;
//   border: 1px solid blue;
//   justify-content: center;
//   align-items: center;
//   align-self: center;
//   padding-top: 1rem;
//   padding-bottom: 1rem;
//   padding-right: 3rem;
//   padding-left: 3rem;
//   // max-width: 1200px;

//   @media (max-width: 768px) {
//     padding: 0rem;

//     width: 100%;
//   }
// `;

const MainContainer = styled.div`
  && {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 0.15rem;
    margin-bottom: 1rem;

    @margin (max-width: 900px) {
      // gap: 0.5rem;
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
      // margin-bottom: 0.5rem;
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
    // <StyledComponentContainer>
    //   <StyledGridContainer container spacing={1}>
    //     <Grid item xs={12} sm={12} md={4}>
    //       <StyledPaper>
    //         <StyledButton
    //           variant="text"
    //           onClick={() => handleTechnologyChoice("Java")}
    //         >
    //           <Typography variant="h1">Java</Typography>
    //         </StyledButton>
    //       </StyledPaper>
    //     </Grid>
    //     <Grid item xs={12} sm={12} md={4}>
    //       <StyledPaper>
    //         <StyledButton
    //           variant="text"
    //           onClick={() => handleTechnologyChoice("Python")}
    //         >
    //           <Typography variant="h1">Python</Typography>
    //         </StyledButton>
    //       </StyledPaper>
    //     </Grid>
    //     <Grid item xs={12} sm={12} md={4}>
    //       <StyledPaper>
    //         <StyledButton
    //           variant="text"
    //           onClick={() => handleTechnologyChoice("JavaScript")}
    //         >
    //           <Typography variant="h1">JavaScript</Typography>
    //         </StyledButton>
    //       </StyledPaper>
    //     </Grid>
    //     <Grid item xs={12} sm={12} md={4}>
    //       <StyledPaper>
    //         <StyledButton
    //           variant="text"
    //           onClick={() => handleTechnologyChoice("C")}
    //         >
    //           <Typography variant="h1">C/C#/C++</Typography>
    //         </StyledButton>
    //       </StyledPaper>
    //     </Grid>
    //     <Grid item xs={12} sm={12} md={4}>
    //       <StyledPaper>
    //         <StyledButton
    //           variant="text"
    //           onClick={() => handleTechnologyChoice("Scala")}
    //         >
    //           <Typography variant="h1">Scala</Typography>
    //         </StyledButton>
    //       </StyledPaper>
    //     </Grid>
    //     <Grid item xs={12} sm={12} md={4}>
    //       <StyledPaper>
    //         <StyledButton
    //           variant="text"
    //           onClick={() => handleTechnologyChoice("BigData")}
    //         >
    //           <Typography variant="h1">Big Data</Typography>
    //         </StyledButton>
    //       </StyledPaper>
    //     </Grid>
    //     <Grid item xs={12} sm={12} md={4}>
    //       <StyledPaper>
    //         <StyledButton
    //           variant="text"
    //           onClick={() => handleTechnologyChoice("DevOps")}
    //         >
    //           <Typography variant="h1">DevOps</Typography>
    //         </StyledButton>
    //       </StyledPaper>
    //     </Grid>
    //     <Grid item xs={12} sm={12} md={4}>
    //       <StyledPaper>
    //         <StyledButton
    //           variant="text"
    //           onClick={() => handleTechnologyChoice("Mobile")}
    //         >
    //           <Typography variant="h1">Mobile</Typography>
    //         </StyledButton>
    //       </StyledPaper>
    //     </Grid>
    //     <Grid item xs={12} sm={12} md={4}>
    //       <StyledPaper>
    //         <StyledButton
    //           variant="text"
    //           onClick={() => handleTechnologyChoice("Golang")}
    //         >
    //           {" "}
    //           <Typography variant="h1">Golang</Typography>
    //         </StyledButton>
    //       </StyledPaper>
    //     </Grid>
    //   </StyledGridContainer>
    // </StyledComponentContainer>

    <MainContainer>
      <SecondaryContainer>
        <StyledPaper>
          <StyledButton
            variant="text"
            onClick={() => handleTechnologyChoice("Java")}
          >
            <Typography variant={isSmallScreen ? "h4" : "h1"}>Java</Typography>
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
            <Typography variant={isSmallScreen ? "h4" : "h1"}>Scala</Typography>
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
  );
};

export default Pools;
