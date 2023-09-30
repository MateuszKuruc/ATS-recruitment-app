import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";

const AllCandidates = ({ candidates }) => {
  console.log(candidates);

  const getColorForAssessment = (assessment) => {
    switch (assessment) {
      case "6 - Rockstar":
        return "#0074e4";
      case "5 - Great candidate":
        return "#388e3c";
      case "4 - Good candidate":
        return "#8bc34a";
      case "3 - Maybe":
        return "#ffd966";
      case "2 - No hire":
        return "#cc0000";
      case "1 - Disqualified":
        return "#ff0000";
      default:
        return null;
    }
  };

  return (
    <TableContainer
      component={Paper}
      style={{ marginTop: "1rem", borderRadius: "0.5rem" }}
    >
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="h4">Name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h4">Location</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h4">Skill</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h4">Seniority</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h4">Assessment</Typography>
            </TableCell>
          </TableRow>
          {candidates.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell>
                <Link to={`/candidates/${candidate.id}`}>
                  <Button variant="text">
                    {candidate.firstName} {candidate.lastName}
                  </Button>
                </Link>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{candidate.location}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{candidate.skill}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{candidate.seniority}</Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  style={{ color: getColorForAssessment(candidate.assessment) }}
                >
                  {candidate.assessment}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllCandidates;
