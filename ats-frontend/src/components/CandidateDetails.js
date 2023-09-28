import { useParams } from "react-router-dom";

const CandidateDetails = ({ candidates }) => {
  console.log("candidates details", candidates);
  const id = Number(useParams().id);
  console.log("id", id);
  const candidate = candidates.find((candidate) => candidate.id === id);

  if (!candidate) {
    return null;
  }

  return <div>{candidate.firstName}</div>;
};

export default CandidateDetails;
