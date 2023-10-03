import { Paper, Button, Typography } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";

import { DataGrid } from "@mui/x-data-grid";

import { Link } from "react-router-dom";

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
  const rows = candidates.map((candidate) => ({
    id: candidate.id,
    col1: candidate.firstName + " " + candidate.lastName,
    col2: candidate.location,
    col3: candidate.skill,
    col4: candidate.seniority,
    col5: candidate.assessment,
  }));

  const columns = [
    {
      field: "col1",
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
            <Typography variant="body1">{params.row.col1}</Typography>
          </Button>
        </Link>
      ),
    },
    {
      field: "col2",
      renderHeader: () => <Typography variant="h4">Location</Typography>,
      renderCell: (params) => (
        <Typography variant="body1">{params.row.col2}</Typography>
      ),
      width: 200,
    },
    {
      field: "col3",
      renderHeader: () => <Typography variant="h4">Skill</Typography>,
      renderCell: (params) => (
        <Typography variant="body1">{params.row.col3}</Typography>
      ),
      width: 200,
    },
    {
      field: "col4",
      renderHeader: () => <Typography variant="h4">Seniority</Typography>,
      renderCell: (params) => (
        <Typography variant="body1">{params.row.col4}</Typography>
      ),
      width: 200,
    },
    {
      field: "col5",
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
