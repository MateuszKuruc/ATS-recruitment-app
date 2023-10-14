import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PoolDetails = ({ candidatesByTech }) => {
  const navigate = useNavigate();

  const [techName, setTechName] = useState("");
  const [mostCommonLocation, setMostCommonLocation] = useState("");
  const [mostCommonSeniority, setMostCommonSeniority] = useState("");
  const [availableSoon, setAvailableSoon] = useState([]);
  const { technology } = useParams();

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
    <div>
      <Typography variant="h4">{techName} pool in numbers</Typography>
      <Typography variant="h6">
        Total number of {techName} candidates: {candidatesByTech.length}
      </Typography>
      <Typography variant="h6">
        Most common location among {techName} candidates: {mostCommonLocation}
      </Typography>
      <Typography variant="h6">
        Most common seniority among {techName} candidates: {mostCommonSeniority}
      </Typography>
      <Typography variant="h6">
        Candidates specialized in {techName} available soon:
      </Typography>
    </div>
  );
};

export default PoolDetails;
