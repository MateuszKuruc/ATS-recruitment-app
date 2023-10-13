import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

const PoolDetails = ({ candidatesByTech, technology }) => {
  const [techName, setTechName] = useState("");

  useEffect(() => {
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
  }, [technology]);

  if (!candidatesByTech || !technology) {
    return null;
  }
  return (
    <div>
      <Typography variant="h4">{techName} pool in numbers</Typography>
    </div>
  );
};

export default PoolDetails;
