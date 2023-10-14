import { Typography, Button, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import HotProfiles from "./HotProfiles";

const Container = styled.div`
  background-color: #c0d9e7;
  padding-right: 2rem;
  padding-left: 2rem;
  padding-bottom: 2rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const StyledHeaderMain = styled.div`
  && {
    display: flex;
    justify-content: space-around;
    align-content: center;
    margin-bottom: 1rem;
    background-color: #084c61;
    padding: 0.25rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
  }
`;

const StyledHeaderSecondary = styled.div`
  && {
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-bottom: 1rem;
    background-color: #990033;
    padding: 0.25rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
  }
`;

const StyledCandidateButton = styled(Button)`
  flex: 1;
`;

const StyledButton = styled(Button)``;

const StyledPaper = styled(Paper)`
  height: 100%;
  display: flex;
`;

const PoolDetails = ({ candidatesByTech }) => {
  const navigate = useNavigate();

  const [techName, setTechName] = useState("");
  const [mostCommonLocation, setMostCommonLocation] = useState("");
  const [mostCommonSeniority, setMostCommonSeniority] = useState("");
  const [availableSoon, setAvailableSoon] = useState([]);

  const { technology } = useParams();

  const [openHeader, setOpenHeader] = useState("");

  const [candidatesTopLocation, setCandidatesTopLocation] = useState([]);
  const [candidatesTopSeniority, setCandidatesTopSeniority] = useState([]);

  useEffect(() => {
    if (!technology || !candidatesByTech) {
      navigate("/pools");
    }

    if (technology) {
      const techName = getTechName(technology);
      setTechName(techName);
    }

    if (candidatesByTech) {
      const getMostCommonItems = () => {
        if (candidatesByTech) {
          const locationCounts = {};
          const seniorityCounts = {};

          candidatesByTech.forEach((candidate) => {
            const location = candidate.location;

            const seniority = candidate.seniority;

            if (!locationCounts[location]) {
              locationCounts[location] = 1;
            } else {
              locationCounts[location]++;
            }

            if (!seniorityCounts[seniority]) {
              seniorityCounts[seniority] = 1;
            } else {
              seniorityCounts[seniority]++;
            }
          });

          let mostCommonLocation = null;
          let maxCountLocation = 0;

          let mostCommonSeniority = null;
          let maxCountSeniority = 0;

          for (const location in locationCounts) {
            if (locationCounts[location] > maxCountLocation) {
              mostCommonLocation = location;
              maxCountLocation = locationCounts[location];
            }
          }

          for (const seniority in seniorityCounts) {
            if (seniorityCounts[seniority] > maxCountSeniority) {
              mostCommonSeniority = seniority;
              maxCountSeniority = seniorityCounts[seniority];
            }
          }

          setMostCommonLocation(mostCommonLocation);
          setMostCommonSeniority(mostCommonSeniority);
        }
      };
      getMostCommonItems();
    }
  }, [candidatesByTech, navigate, technology]);

  const getTechName = (technology) => {
    switch (technology) {
      case "Java":
        return "Java";

      case "Python":
        return "Python";

      case "JavaScript":
        return "JavaScript";

      case "C":
        return "C/C#/C++";

      case "Scala":
        return "Scala";

      case "BigData":
        return "Big Data";

      case "DevOps":
        return "DevOps";

      case "Mobile":
        return "Mobile";

      case "Golang":
        return "Golang";

      default:
        return "";
    }
  };

  if (!candidatesByTech || !technology) {
    return null;
  }

  const handleOpenHeader = (headerNumber) => {
    if (openHeader === headerNumber) {
      setOpenHeader("");
    } else if (openHeader !== headerNumber) {
      setOpenHeader(headerNumber);
    }
  };

  return (
    <Container>
      <StyledHeaderMain>
        <Typography variant="h4">{techName} pool in numbers</Typography>
      </StyledHeaderMain>
      <StyledHeaderSecondary>
        <Typography variant="h6">
          Total number of {techName} candidates: {candidatesByTech.length}
        </Typography>
        <StyledButton variant="contained" onClick={() => handleOpenHeader("1")}>
          {openHeader === "1" ? "Hide" : "Show more"}
        </StyledButton>
      </StyledHeaderSecondary>
      <div style={openHeader === "1" ? {} : { display: "none" }}>
        <Grid container spacing={2} style={{ display: "flex" }}>
          {candidatesByTech.map((candidate) =>
            candidate.location === mostCommonLocation ? (
              // <ul key={candidate.id}>
              //   <li>{candidate.firstName}</li>
              // </ul>
              <Grid
                item
                xs={6}
                md={3}

                // style={{ flex: "1" }}
              >
                <StyledPaper>
                  <StyledCandidateButton
                    variant="outlined"
                    key={candidate.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      // minWidth: "300px",
                    }}
                  >
                    <Typography variant="h6">
                      {candidate.firstName} {candidate.lastName}
                    </Typography>
                    <Typography variant="body1">{candidate.skill}</Typography>
                    <Typography variant="body1">
                      {candidate.seniority}
                    </Typography>
                  </StyledCandidateButton>
                </StyledPaper>
              </Grid>
            ) : null
          )}
        </Grid>
      </div>

      <div>
        <StyledHeaderSecondary>
          <Typography variant="h6">
            Most common location among {techName} candidates:{" "}
            {mostCommonLocation}
          </Typography>
          <StyledButton
            variant="contained"
            onClick={() => handleOpenHeader("2")}
          >
            {openHeader === "2" ? "Hide" : "Show more"}
          </StyledButton>
        </StyledHeaderSecondary>
        <div style={openHeader === "2" ? {} : { display: "none" }}>
          <HotProfiles
            candidates={candidatesByTech.filter(
              (candidate) => candidate.location === mostCommonLocation
            )}
          />

          {/* {candidatesByTech.map((candidate) =>
            candidate.location === mostCommonLocation ? (
              <ul key={candidate.id}>
                <li>{candidate.firstName}</li>
                <li>{candidate.lastName}</li>
                <li>{candidate.location}</li>
              </ul>
            ) : null
          )} */}
        </div>
      </div>

      <StyledHeaderSecondary>
        <Typography variant="h6">
          Most common seniority among {techName} candidates:{" "}
          {mostCommonSeniority}
        </Typography>
        <StyledButton variant="contained" onClick={() => handleOpenHeader("3")}>
          {openHeader === "3" ? "Hide" : "Show more"}
        </StyledButton>
      </StyledHeaderSecondary>
      <div style={openHeader === "3" ? {} : { display: "none" }}>
        <HotProfiles
          candidates={candidatesByTech.filter(
            (candidate) => candidate.seniority === mostCommonSeniority
          )}
        />
      </div>

      <StyledHeaderSecondary>
        <Typography variant="h6">
          Candidates specialized in {techName} available soon:
        </Typography>
        <StyledButton variant="contained" onClick={() => handleOpenHeader("4")}>
          {openHeader === "4" ? "Hide" : "Show more"}
        </StyledButton>
      </StyledHeaderSecondary>
      <div style={openHeader === "4" ? {} : { display: "none" }}>
        <HotProfiles
          candidates={candidatesByTech.filter(
            (candidate) => candidate.seniority === mostCommonSeniority
          )}
        />
      </div>

      <StyledHeaderSecondary>
        <Typography variant="h6">
          {techName} candidates without meeting feedback
        </Typography>
        <StyledButton variant="contained" onClick={() => handleOpenHeader("5")}>
          {openHeader === "5" ? "Hide" : "Show more"}
        </StyledButton>
      </StyledHeaderSecondary>
      <div style={openHeader === "5" ? {} : { display: "none" }}>
        <HotProfiles
          candidates={candidatesByTech.filter(
            (candidate) => candidate.seniority === mostCommonSeniority
          )}
        />
      </div>
    </Container>
  );
};

export default PoolDetails;
