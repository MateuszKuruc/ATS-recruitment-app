const PoolDetails = ({ candidatesByTech }) => {
  if (!candidatesByTech) {
    return null;
  }
  return (
    <div>
      <h2>SINGLE POOL RENDERING</h2>
      <ul>
        {candidatesByTech.map((candidate) => (
          <li key={candidate.id}>
            {candidate.firstName}, {candidate.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PoolDetails;
