import { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface';
import { IoRemoveCircle } from 'react-icons/io5';

const PotentialCandidates = () => {
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>([]);
  const [sortedCandidates, setSortedCandidates] = useState<Candidate[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Candidate | null; direction: 'asc' | 'desc' | null }>({ key:null, direction: null });
  const [filterText, setFilterText] = useState<string>('');

  useEffect(() => {
    const storedCandidates = localStorage.getItem('savedCandidates');
    if (storedCandidates) {
      try {
        const parsedPotentialCandidates = JSON.parse(storedCandidates);
        setPotentialCandidates(parsedPotentialCandidates);
        setSortedCandidates(parsedPotentialCandidates);
      } catch (error) {
        console.error ('Error parsing stored candidates.')
      }
    }
  }, []);

  const rejectButton = (login: string) => {
    const updatedCandidates = potentialCandidates.filter((candidate: { login: string; }) => candidate.login !== login);
    setPotentialCandidates(updatedCandidates);
    setSortedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  }

  const sortCandidates = (key: keyof Candidate) => {
    let direction: 'asc' | 'desc' = 'asc';

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedList = [...sortedCandidates].sort((a, b) => {
      const valueA = a[key] || ''; // Ensure undefined values don’t break sorting
      const valueB = b[key] || '';
      
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
      return 0;
    });

    setSortedCandidates(sortedList);
    setSortConfig({ key, direction });
  };

  const filterCandidates = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.toLowerCase();
    setFilterText(searchText);

    if (!searchText) {
      setSortedCandidates(potentialCandidates);
      return;
    }
    const filteredList = potentialCandidates.filter(
      (candidate) =>
        candidate.name?.toLowerCase().includes(searchText) || 
      candidate.location?.toLowerCase().includes(searchText) || 
      candidate.company?.toLowerCase().includes(searchText)
    );
  
    setSortedCandidates(filteredList);
  }

  return (
    <div>
      <h1>Potential Candidates</h1>
      {sortedCandidates.length === 0 ? (
        <h3>No candidates left, look for some new candidates.</h3>
      ) : (
        <div>
        <input
        type="text"
        placeholder="Filter name/location/company"
        value={filterText}
        onChange={filterCandidates}
        className="filter"
      />
        <h4>Sort the table by clicking on the Name, Location or Company headers.</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Image</th>
            <th onClick={() => sortCandidates('name')} style={{ cursor: 'pointer'}}>Name</th>
            <th onClick={() => sortCandidates('location')} style={{ cursor: 'pointer'}}>Location</th>
            <th>Email</th>
            <th onClick={() => sortCandidates('company')} style={{ cursor: 'pointer'}}>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {sortedCandidates.map((candidate, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <img src={candidate.avatar_url ?? undefined} alt={candidate.name ?? "unknown"}/>
              </td>
              <td><a href={candidate.html_url}>{`${candidate.login} (${candidate.name})`}</a></td>
              <td>{candidate.location}</td>
              <td>{candidate.email}</td>
              <td>{candidate.company}</td>
              <td>{candidate.bio}</td>
              <td><IoRemoveCircle
                    style={{ fontSize: '50px', cursor: 'pointer', color: 'rgb(255, 0, 0)'}}
                    onClick={() => rejectButton(candidate.login)}
                /></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      )}
    </div>
  );
};

export default PotentialCandidates;