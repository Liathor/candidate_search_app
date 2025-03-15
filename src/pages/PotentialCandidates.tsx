import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const PotentialCandidates = () => {
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>([]);

  const retrieveCandidates = () => {
    const storedCandidates = localStorage.getItem('filmsToWatch');
  }



  const grabCandidate = async() => { 

    const candidateProfiles = await searchGithub();

    if (candidateProfiles.length > 0) {
      const randomIndex = Math.floor(Math.random() * candidateProfiles.length);
      const pickedCandidateName = candidateProfiles[randomIndex].login;
      const pickedCandidate = await searchGithubUser(pickedCandidateName); 
      return pickedCandidate;
    }
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      const candidate1 = await grabCandidate();
      const candidate2 = await grabCandidate();
      const candidate3 = await grabCandidate();
      const candidate4 = await grabCandidate();

      setFirstCandidate(candidate1);
      setSecondCandidate(candidate2);
      setThirdCandidate(candidate3);
      setFourthCandidate(candidate4);
    };
    fetchCandidates();
  }, []);

  // Loader display for candidates
  if (!firstCandidate || !secondCandidate || !thirdCandidate || !fourthCandidate) {
    return <div>Loading Candidates...</div>
  }

  const data = [
    [<img src={`${firstCandidate.avatar_url}`} alt={`{firstCandidate.login}`} />, firstCandidate.login, firstCandidate.location, firstCandidate.email, firstCandidate.company, firstCandidate.bio, 'Reject'],
    [<img src={`${secondCandidate.avatar_url}`} alt={`{secondCandidate.login}`} />, secondCandidate.login, secondCandidate.location, secondCandidate.email, secondCandidate.company, secondCandidate.bio, 'Reject'],
    [<img src={`${thirdCandidate.avatar_url}`} alt={`{thirdCandidate.login}`} />, thirdCandidate.login, thirdCandidate.location, thirdCandidate.email, thirdCandidate.company, thirdCandidate.bio, 'Reject'],
    [<img src={`${fourthCandidate.avatar_url}`} alt={`{fourthCandidate.login}`} />, fourthCandidate.login, fourthCandidate.location, fourthCandidate.email, fourthCandidate.company, fourthCandidate.bio, 'Reject'],
  ];

  return (
    <div>
      <h1>Sample Table</h1>
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