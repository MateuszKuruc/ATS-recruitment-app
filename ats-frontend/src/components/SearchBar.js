import SearchIcon from "@mui/icons-material/Search";
import { InputBase, Button, Typography } from "@mui/material";
import styled from "styled-components";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StyledInputBase = styled(InputBase)`
  && {
    color: #ffffff;
    // background-color: #800020;
  }
`;

const Search = styled.div`
  //   display: flex;
  background-color: #800020;
  opacity: 1;
  padding: 4px;
  //   align-items: center;
  border-radius: 0.5rem;
  gap: 0.75rem;
  padding: 0.5rem;
  // flex: 1;
`;

const StyledButton = styled(Button)`
  width: 100%;
//   height: 50px;
display: flex;
// align-items: center;
// color: black;
`;

const StyledTypography = styled(Typography)`
  
`;

const CandidateContainer = styled.div`
  && {
    margin-top: 5px;
    width: 300px;
    height: 200px;
    background-color: white;
    overflow: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const SearchBar = ({ candidates }) => {
  const [allCandidates, setAllCandidates] = useState(null);
  //   const [value, setValue] = useState("");

  useEffect(() => {
    setAllCandidates(candidates);
  }, [candidates]);

  if (!allCandidates) {
    return null;
  }

  return (
    <Search>
      <SearchIcon style={{ color: "#ffffff" }} />
      <StyledInputBase placeholder="Search..." />
      <CandidateContainer>
        {allCandidates.map((candidate) => {
          return (
            <StyledButton component={Link} to={`/candidates/${candidate.id}`}>
              <StyledTypography variant="body1">
                {candidate.firstName} {candidate.lastName}
              </StyledTypography>
            </StyledButton>
          );
        })}
      </CandidateContainer>
    </Search>
  );
};

export default SearchBar;

{
  /* <Search>
                <SearchIcon style={{ color: "#ffffff" }} />
                <StyledInputBase
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search" }}
                />
              </Search> */
}
