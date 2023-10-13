import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PoolDetails = ({ candidatesByTech }) => {
  const navigate = useNavigate();

  const [techName, setTechName] = useState("");
  const [mostCommonLocation, setMostCommonLocation] = useState("");
  const { technology } = useParams();

  useEffect(() => {
    if (!technology || !candidatesByTech) {
      navigate("/pools");
    }
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

    if (candidatesByTech) {
      const locationCounts = {};

      candidatesByTech.forEach((candidate) => {
        const location = candidate.location;

        if (!locationCounts[location]) {
          locationCounts[location] = 1;
        } else {
          locationCounts[location]++;
        }
      });

      let mostCommonLocation = null;
      let maxCount = 0;

      for (const location in locationCounts) {
        if (locationCounts[location] > maxCount) {
          mostCommonLocation = location;
          maxCount = locationCounts[location];
        }
      }

      setMostCommonLocation(mostCommonLocation);
    }
  }, [candidatesByTech, technology, navigate]);

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
    </div>
  );
};

export default PoolDetails;
