import SearchIcon from "@mui/icons-material/Search";
import { InputBase, Button, Typography, IconButton } from "@mui/material";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";

const StyledInputBase = styled(InputBase)`
  && {
    color: #ffffff;
    flex: 1;
  }
`;

const Search = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  background-color: #25283d;
  opacity: 1;
  padding: 4px;
  border-radius: 0.5rem;
  gap: 0.75rem;
  padding: 0.5rem;
  flex: 1;
`;

const StyledButton = styled(Button)`
  && {
    width: 100%;
    display: flex;

    &:hover {
      background-color: #ffba49;
      color: #000000;
    }
  }
`;

const CandidateContainer = styled.div`
  && {
    margin-top: 5px;
    position: absolute;
    border-radius: 0.5rem;
    max-height: 200px;
    background-color: white;
    overflow: hidden;
    overflow-y: auto;
    width: 100%;
    border: 0.2rem solid #800020;
    right: 0;
    left: 0;
    top: 100%;
    text-align: center;

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      right: 0;
      border: 0.1rem solid #800020;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const SearchBar = ({ candidates }) => {
  const [allCandidates, setAllCandidates] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    setAllCandidates(candidates);
  }, [candidates]);

  const handleFilter = (event) => {
    const searchWord = event.target.value.toLowerCase();
    setSearchWord(searchWord);

    const newFilter = allCandidates.filter((candidate) => {
      return (
        candidate.firstName.toLowerCase().includes(searchWord) ||
        candidate.lastName.toLowerCase().includes(searchWord)
      );
    });
    if (searchWord === "") {
      setFilteredData([]);
      setSearchWord("");
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleClean = () => {
    setFilteredData([]);
    setSearchWord("");
  };

  if (!allCandidates) {
    return null;
  }

  return (
    <Search>
      <SearchIcon style={{ color: "#ffffff" }} />
      <StyledInputBase
        placeholder="Search..."
        onChange={handleFilter}
        value={searchWord}
      />
      {!isSmallScreen && searchWord !== "" ? (
        <IconButton style={{ color: "#ffffff" }} onClick={handleClean}>
          <CloseIcon />
        </IconButton>
      ) : null}
      {filteredData.length !== 0 && (
        <CandidateContainer>
          {filteredData.slice(0, 15).map((candidate) => {
            return (
              <StyledButton
                component={Link}
                to={`/candidates/${candidate.id}`}
                onClick={handleClean}
              >
                <Typography variant="body1">
                  {candidate.firstName} {candidate.lastName}
                </Typography>
              </StyledButton>
            );
          })}
        </CandidateContainer>
      )}
    </Search>
  );
};

export default SearchBar;
