import { Paper, Button, Typography } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { DataGrid } from "@mui/x-data-grid";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import styled from "styled-components";

export const getColorForAssessment = (assessment) => {
  switch (assessment) {
    case "6 - Rockstar":
      return "#0074e4";
    case "5 - Great candidate":
      return "#388e3c";
    case "4 - Good candidate":
      return "#8bc34a";
    case "3 - Maybe":
      return "#FFBA49";
    case "2 - No hire":
      return "#cc0000";
    case "1 - Disqualified":
      return "#ff0000";
    default:
      return null;
  }
};

const Container = styled.div`
  margin-too: 1rem;
  border-rariuds: 0.5rem;
  display: flex;
  overflow-x: scroll;
  margin-bottom: 1rem;
`;

const StyledTypography = styled(Typography)`
  text-align: center;
  padding: 1rem;
`;

const StyledButton = styled(Button)`
  && {
    min-width: 300px;
  }
`;

const AllCandidates = ({ candidates, userId }) => {
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  useEffect(() => {
    const filtered = candidates.filter(
      (candidate) => candidate.user === userId
    );
    setFilteredCandidates(filtered);
  }, [candidates, userId]);

  const rows = filteredCandidates.map((candidate) => ({
    id: candidate.id,
    Name: candidate.firstName + " " + candidate.lastName,
    Location: candidate.location,
    Skill: candidate.skill,
    Seniority: candidate.seniority,
    Assessment: candidate.assessment,
  }));

  const columns = [
    {
      field: "Name",
      renderHeader: () => (
        <StyledTypography variant="h4">Name</StyledTypography>
      ),
      minWidth: 350,
      renderCell: (params) => (
        <Link
          to={`/candidates/${params.row.id}`}
          style={{ textDecoration: "none" }}
        >
          <StyledButton variant="contained">
            <Typography variant="h6">{params.row.Name}</Typography>
          </StyledButton>
        </Link>
      ),
    },
    {
      field: "Location",
      renderHeader: () => <Typography variant="h4">Location</Typography>,
      renderCell: (params) => (
        <Typography variant="body1">{params.row.Location}</Typography>
      ),
      width: 200,
    },
    {
      field: "Skill",
      renderHeader: () => <Typography variant="h4">Skill</Typography>,
      renderCell: (params) => (
        <Typography variant="body1">{params.row.Skill}</Typography>
      ),
      width: 200,
    },
    {
      field: "Seniority",
      renderHeader: () => <Typography variant="h4">Seniority</Typography>,
      renderCell: (params) => (
        <Typography variant="body1">{params.row.Seniority}</Typography>
      ),
      width: 200,
    },
    {
      field: "Assessment",
      renderHeader: () => <Typography variant="h4">Assessment</Typography>,
      width: 200,
      renderCell: (params) => (
        <Typography
          variant="h6"
          style={{ color: getColorForAssessment(params.value) }}
        >
          {params.value === "6 - Rockstar" ||
          params.value === "5 - Great candidate" ? (
            <>
              {params.value} <WhatshotIcon style={{ color: "red" }} />
            </>
          ) : (
            params.value
          )}
        </Typography>
      ),
    },
  ];

  return (
    <Container>
      <Paper>
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 15, 25, 50]}
        />
      </Paper>
    </Container>
  );
};

export default AllCandidates;
