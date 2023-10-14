import { Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

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

const StyledButton = styled(Button)`
  && {
    align-self: flex-end;
  }
`;

const PoolDetails = ({ candidatesByTech }) => {
  const navigate = useNavigate();

  const [techName, setTechName] = useState("");
  const [mostCommonLocation, setMostCommonLocation] = useState("");
  const [mostCommonSeniority, setMostCommonSeniority] = useState("");
  const [availableSoon, setAvailableSoon] = useState([]);
  const { technology } = useParams();

  const [showDetails, setShowDetails] = useState(false);

  const detailsShown = { display: showDetails ? "" : "none" };

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
  return (
    <Container>
      <StyledHeaderMain>
        <Typography variant="h4">{techName} pool in numbers</Typography>
      </StyledHeaderMain>
      <StyledHeaderSecondary>
        <Typography variant="h6">
          Total number of {techName} candidates: {candidatesByTech.length}
        </Typography>
        <StyledButton variant="contained">Show more</StyledButton>
      </StyledHeaderSecondary>

      <div>
        <StyledHeaderSecondary>
          <Typography variant="h6">
            Most common location among {techName} candidates:{" "}
            {mostCommonLocation}
          </Typography>
          <StyledButton
            variant="contained"
            onClick={() => setShowDetails(!showDetails)}
          >
            Show more
          </StyledButton>
        </StyledHeaderSecondary>
        <div style={detailsShown}>
          {candidatesByTech.map((candidate) =>
            candidate.location === mostCommonLocation ? (
              <ul key={candidate.id}>
                <li>{candidate.firstName}</li>
                <li>{candidate.lastName}</li>
                <li>{candidate.location}</li>
              </ul>
            ) : null
          )}
        </div>
      </div>
      <Typography variant="h6">
        Most common seniority among {techName} candidates: {mostCommonSeniority}
      </Typography>
      <Typography variant="h6">
        Candidates specialized in {techName} available soon:
      </Typography>
    </Container>
  );
};

export default PoolDetails;
