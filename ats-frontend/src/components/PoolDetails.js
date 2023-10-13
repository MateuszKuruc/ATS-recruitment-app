const PoolDetails = ({ candidatesList }) => {
  return (
    <div>
      <h2>SINGLE POOL RENDERING</h2>
      <ul>
        {candidatesList.map((candidate) => (
          <li key={candidate.id}>
            {candidate.firstName}, {candidate.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PoolDetails;
