import SearchIcon from "@mui/icons-material/Search";
import { InputBase, TextField, Stack } from "@mui/material";
import styled from "styled-components";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";

const StyledInputBase = styled(InputBase)`
  && {
    color: #ffffff;
  }
`;

const Search = styled.div`
  display: flex;
  background-color: #800020;
  opacity: 1;
  padding: 4px;
  align-items: center;
  border-radius: 0.5rem;
  gap: 0.75rem;
  padding: 0.5rem;
  // flex: 1;
`;

const SearchBar = ({ candidates }) => {
  const [allCandidates, setAllCandidates] = useState(null);
  const [value, setValue] = useState("");

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
      <div className="dataResult">
        {allCandidates.map((value, key) => {
          return <div>{value.firstName} {value.lastName}</div>;
        })}
      </div>
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
