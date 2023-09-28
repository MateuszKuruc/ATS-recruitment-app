import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Typography
} from "@mui/material";

const AllCandidates = ({ candidates }) => {
  console.log(candidates);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="h5">Name</Typography>
            </TableCell>
            <TableCell>
              <h3>Location</h3>
            </TableCell>
            <TableCell>
              <h3>Skill</h3>
            </TableCell>
            <TableCell>
              <h3>Seniority</h3>
            </TableCell>
            <TableCell>
              <h3>Assessment</h3>
            </TableCell>
          </TableRow>
          {candidates.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell>
                <h4>
                  {candidate.firstName} {candidate.lastName}
                </h4>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllCandidates;
