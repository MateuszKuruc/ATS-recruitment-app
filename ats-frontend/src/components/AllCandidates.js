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

  return (
    <TableContainer component={Paper}>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllCandidates;
