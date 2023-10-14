import { getColorForAssessment } from "./AllCandidates";
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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import styled from "styled-components";

const StyledTableContainer = styled(TableContainer)`
  && {
    margin-top: 1rem;
    border-radius: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  && {
    minwidth: 200px;
    flex: 1;
  }
`;

const StyledLink = styled(Link)`
  && {
    display: flex;
    text-decoration: none;
  }
`;

const CandidateProfiles = ({ candidates, userId }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(userId ? 10 : 5);
  const [filteredCandidates, setfilteredCandidates] = useState([]);

  useEffect(() => {
    if (userId) {
      const filtered = candidates.filter(
        (candidate) => candidate.user === userId
      );
      const hot = filtered.filter(
        (candidate) =>
          candidate.assessment === "6 - Rockstar" ||
          candidate.assessment === "5 - Great candidate"
      );

      console.log("filtered + hot", filtered, hot);

      const assessmentValue = {
        "6 - Rockstar": 6,
        "5 - Great candidate": 5,
      };

      hot.sort((a, b) => {
        const assessmentValueA = assessmentValue[a.assessment];
        const assessmentValueB = assessmentValue[b.assessment];

        return assessmentValueB - assessmentValueA;
      });

      setfilteredCandidates(hot);
    }

    if (!userId) {
      setfilteredCandidates(candidates);
    }
  }, [candidates, userId]);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredCandidates.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <StyledTableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="h4" style={{ textAlign: "center" }}>
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h4">Location</Typography>
            </TableCell>
            {userId && (
              <TableCell>
                <Typography variant="h4">Skill</Typography>
              </TableCell>
            )}

            <TableCell>
              <Typography variant="h4">Seniority</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h4">Notice</Typography>
            </TableCell>

            {userId && (
              <TableCell>
                <Typography variant="h4">Contract</Typography>
              </TableCell>
            )}
            <TableCell>
              <Typography variant="h4">Assessment</Typography>
            </TableCell>
          </TableRow>

          {(rowsPerPage > 0
            ? filteredCandidates.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : filteredCandidates
          ).map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell>
                <StyledLink to={`/candidates/${candidate.id}`}>
                  <StyledButton variant="contained" color="secondary">
                    <Typography variant="h6">
                      {candidate.firstName} {candidate.lastName}
                    </Typography>
                  </StyledButton>
                </StyledLink>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{candidate.location}</Typography>
              </TableCell>
              {userId && (
                <TableCell>
                  <Typography variant="body1">{candidate.skill}</Typography>
                </TableCell>
              )}
              <TableCell>
                <Typography variant="body1">{candidate.seniority}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{candidate.notice}</Typography>
              </TableCell>

              {userId && (
                <TableCell>
                  <Typography variant="body1">{candidate.contract}</Typography>
                </TableCell>
              )}
              <TableCell>
                <Typography
                  variant="h6"
                  style={{ color: getColorForAssessment(candidate.assessment) }}
                >
                  {candidate.assessment === "6 - Rockstar" ||
                  candidate.assessment === "5 - Great candidate" ? (
                    <>
                      {candidate.assessment}
                      <WhatshotIcon style={{ color: "red" }} />
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
              <TableCell colSpan={7} />
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15, { label: "All", value: -1 }]}
        component="div"
        count={filteredCandidates.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </StyledTableContainer>
  );
};

export default CandidateProfiles;
