import { Paper, Button, Typography } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { DataGrid } from "@mui/x-data-grid";

import { Link } from "react-router-dom";
import { store } from "../store";
import { useSelector } from "react-redux";
import { useState } from "react";

export const getColorForAssessment = (assessment) => {
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

const AllCandidates = ({ candidates }) => {
  // const [filteredCandidates, setFilteredCandidates] = useState([]);

  // const login = useSelector((state) => state.login);

  // const filtered = candidates.filter(
  //   (candidate) => candidate.user.id === login.id
  // );
  // console.log('filtered', filtered)

  const rows = candidates.map((candidate) => ({
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
        <Typography
          variant="h4"
          style={{ textAlign: "center", padding: "10px" }}
        >
          Name
        </Typography>
      ),
      minWidth: 300,
      renderCell: (params) => (
        <Link to={`/candidates/${params.row.id}`}>
          <Button variant="text">
            <Typography variant="body1">{params.row.Name}</Typography>
          </Button>
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
    <div style={{ marginTop: "1rem", borderRadius: "0.5rem" }}>
      <Paper style={{}}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 15, 25, 50]}
        />
      </Paper>
    </div>
  );
};

export default AllCandidates;
