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

    const techName = getTechName(technology);
    setTechName(techName);

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
        setTechName("Java");
        break;
      case "Python":
        setTechName("Python");
        break;
      case "JavaScript":
        setTechName("JavaScript");
        break;
      case "C":
        setTechName("C/C#/C++");
        break;
      case "Scala":
        setTechName("Scala");
        break;
      case "BigData":
        setTechName("Big Data");
        break;
      case "DevOps":
        setTechName("DevOps");
        break;
      case "Mobile":
        setTechName("Mobile");
        break;
      case "Golang":
        setTechName("Golang");
        break;
      default:
        setTechName("");
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
