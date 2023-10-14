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
    // justify-content: center;
    // align-items: center;
    margin-bottom: 1rem;
    background-color: #084c61;
    background-color: #990033;
    padding: 0.75rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
  }
`;

const StyledHeaderSecondary = styled.div`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    // background-color: #990033;
    background-color: #084c61;
    padding: 0.5rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
  }
`;

const StyledCandidateButton = styled(Button)`
  && {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

const StyledButton = styled(Button)`
  && {
    background-color: #990033;
    flex: 1;
  }
`;

const StyledPaper = styled(Paper)`
  height: 100%;
  display: flex;
`;

const StyledTypography = styled(Typography)`
  color: #ffffff;
  flex: 3;
`;

const TypographyValue = styled(Typography)`
  flex: 2;
  color: goldenrod;
`;

const PoolDetails = ({ candidatesByTech }) => {
  const navigate = useNavigate();

  const [techName, setTechName] = useState("");
  const [mostCommonLocation, setMostCommonLocation] = useState("");
  const [mostCommonSeniority, setMostCommonSeniority] = useState("");

  const { technology } = useParams();

  const [openHeader, setOpenHeader] = useState("0");

  const [candidatesTopLocation, setCandidatesTopLocation] = useState([]);
  const [candidatesTopSeniority, setCandidatesTopSeniority] = useState([]);
  const [candidatesNoFeedback, setCandidatesNoFeedback] = useState([]);
  const [candidatesAvailableSoon, setCandidatesAvailableSoon] = useState([]);

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

          const filteredLocation = candidatesByTech.filter(
            (candidate) => candidate.location === mostCommonLocation
          );
          setCandidatesTopLocation(filteredLocation);

          const filteredSeniority = candidatesByTech.filter(
            (candidate) => candidate.seniority === mostCommonSeniority
          );
          setCandidatesTopSeniority(filteredSeniority);

          const filteredFeedback = candidatesByTech.filter(
            (candidate) => candidate.assessment === ""
          );
          setCandidatesNoFeedback(filteredFeedback);

          const filteredAvailability = candidatesByTech.filter(
            (candidate) =>
              candidate.notice === "Available now" ||
              candidate.notice === "2 weeks"
          );
          setCandidatesAvailableSoon(filteredAvailability);
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
        <StyledTypography variant="h4">
          {techName} pool in numbers
        </StyledTypography>
      </StyledHeaderMain>

      <StyledHeaderSecondary>
        <StyledTypography variant="h6">
          Awaiting meeting feedback
        </StyledTypography>

        <TypographyValue variant="h4">
          {candidatesNoFeedback.length}
        </TypographyValue>
        <StyledButton variant="contained" onClick={() => handleOpenHeader("0")}>
          {openHeader === "0" ? "Hide" : "Show more"}
        </StyledButton>
      </StyledHeaderSecondary>
      <div style={openHeader === "0" ? {} : { display: "none" }}>
        <Grid container spacing={2}>
          {candidatesNoFeedback.length === 0 ? (
            <Grid item xs={12} md={12}>
              <StyledPaper style={{ padding: "0.5rem" }}>
                <StyledTypography
                  variant="body1"
                  style={{ color: "black", alignSelf: "center" }}
                >
                 All profiles are up to date!
                </StyledTypography>
              </StyledPaper>
            </Grid>
          ) : (
            // }
            // {
            candidatesNoFeedback.map((candidate) => (
              <Grid item xs={6} md={4}>
                <StyledPaper>
                  <StyledCandidateButton variant="outlined" key={candidate.id}>
                    <TypographyValue variant="h6">
                      {candidate.firstName} {candidate.lastName}
                    </TypographyValue>
                    <TypographyValue variant="body1">
                      {candidate.skill}
                    </TypographyValue>
                    <TypographyValue variant="body1">
                      {candidate.seniority}
                    </TypographyValue>
                  </StyledCandidateButton>
                </StyledPaper>
              </Grid>
            ))
          )}
        </Grid>
      </div>

      <StyledHeaderSecondary>
        <StyledTypography variant="h6">
          Total number of candidates:
        </StyledTypography>

        <TypographyValue variant="h4">
          {candidatesByTech.length}
        </TypographyValue>

        <StyledButton variant="contained" onClick={() => handleOpenHeader("1")}>
          {openHeader === "1" ? "Hide" : "Show more"}
        </StyledButton>
      </StyledHeaderSecondary>
      <div style={openHeader === "1" ? {} : { display: "none" }}>
        <HotProfiles candidates={candidatesByTech} />
      </div>

      <div>
        <StyledHeaderSecondary>
          <StyledTypography variant="h6">Most common location</StyledTypography>
          <TypographyValue variant="h4"> {mostCommonLocation}</TypographyValue>

          <StyledButton
            variant="contained"
            onClick={() => handleOpenHeader("2")}
          >
            {openHeader === "2" ? "Hide" : "Show more"}
          </StyledButton>
        </StyledHeaderSecondary>
        <div style={openHeader === "2" ? {} : { display: "none" }}>
          <HotProfiles candidates={candidatesTopLocation} />
        </div>
      </div>

      <StyledHeaderSecondary>
        <StyledTypography variant="h6">Most common seniority</StyledTypography>
        <TypographyValue variant="h4"> {mostCommonSeniority}</TypographyValue>

        <StyledButton variant="contained" onClick={() => handleOpenHeader("3")}>
          {openHeader === "3" ? "Hide" : "Show more"}
        </StyledButton>
      </StyledHeaderSecondary>
      <div style={openHeader === "3" ? {} : { display: "none" }}>
        <HotProfiles candidates={candidatesTopSeniority} />
      </div>
      <StyledHeaderSecondary>
        <StyledTypography variant="h6">
          Candidates available soon:
        </StyledTypography>

        <TypographyValue variant="h4">
          {candidatesAvailableSoon.length}
        </TypographyValue>

        <StyledButton variant="contained" onClick={() => handleOpenHeader("4")}>
          {openHeader === "4" ? "Hide" : "Show more"}
        </StyledButton>
      </StyledHeaderSecondary>
      <div style={openHeader === "4" ? {} : { display: "none" }}>
        <HotProfiles candidates={candidatesAvailableSoon} />
      </div>
    </Container>
  );
};

export default PoolDetails;
