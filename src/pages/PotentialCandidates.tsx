import { useState } from 'react';
import Candidate from '../interfaces/Candidate.interface';

const PotentialCandidates = () => {
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>([]);
  let parsedCandidates: Candidate[] = [];

  const retrieveCandidates = () => {
    const storedCandidates = localStorage.getItem('savedCandidates');
    if (typeof storedCandidates === 'string') {
      parsedCandidates = JSON.parse(storedCandidates);
    }
  }

  const data = [
    [<img src={`${firstCandidate.avatar_url}`} alt={`{firstCandidate.login}`} />, firstCandidate.login, firstCandidate.location, firstCandidate.email, firstCandidate.company, firstCandidate.bio, 'Reject'],
  ];

  return (
    <div>
      <h1>Potential Candidates</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>{cell}</td> // Map each row's cell content
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PotentialCandidates;