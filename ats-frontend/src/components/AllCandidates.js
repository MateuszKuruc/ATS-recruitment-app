import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Typography,
  TablePagination,
} from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";

import { useState } from "react";

import { Link } from "react-router-dom";

const AllCandidates = ({ candidates }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - candidates.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

          {(rowsPerPage > 0
            ? candidates.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : candidates
          ).map((candidate) => (
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
                  {/* {candidate.assessment} */}
                  {candidate.assessment === "6 - Rockstar" ||
                  candidate.assessment === "5 - Great candidate" ? (
                    <>
                      {candidate.assessment}
                      <WhatshotIcon srtyle={{ color: "red", backgroundColor: "red" }} />
                    </>
                  ) : (
                    <>{candidate.assessment}</>
                  )}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 69.5 * emptyRows }}>
              <TableCell colSpan={5} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, { label: "All", value: -1 }]}
        component="div"
        count={candidates.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default AllCandidates;
