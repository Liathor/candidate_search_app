import { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface';
import { IoRemoveCircle } from 'react-icons/io5';

const PotentialCandidates = () => {
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem('savedCandidates');
    if (storedCandidates) {
      try {
        const parsedPotentialCandidates = JSON.parse(storedCandidates);
        setPotentialCandidates(parsedPotentialCandidates)
      } catch (error) {
        console.error ('Error parsing stored candidates.')
      }
    }
  }, []);

  const rejectCandidate = (login: string | null | undefined) => {
    login = '';
  }

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
          {potentialCandidates.map((candidate, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <img src={candidate.avatar_url} alt={candidate.name}/>
              </td>
              <td>{candidate.name}</td>
              <td>{candidate.location}</td>
              <td>{candidate.email}</td>
              <td>{candidate.company}</td>
              <td>{candidate.bio}</td>
              <td><IoRemoveCircle
                    style={{ fontSize: '50px', cursor: 'pointer', color: 'rgb(255, 0, 0)'}}
                    onClick={() => rejectCandidate(candidate.login)}
                /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PotentialCandidates;