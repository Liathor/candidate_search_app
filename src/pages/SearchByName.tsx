import { type FormEvent, useState } from 'react';
import { searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';

const SearchByName = () => {
  const [candidateSearched, setCandidateSearched] = useState<Candidate>({
    name: '',
    location: '',
    email: '',
    company: '',
    bio: '',
    avatar_url: '',
  })

  const [searchInput, setSearchInput] = useState<string>('');

  const addToCandidates = () => {
    let parsedSavedCandidates: Candidate[] = [];
    const storedSavedCandidates = localStorage.getItem('savedCandidates');
    if (typeof storedSavedCandidates === 'string') {
      parsedSavedCandidates = JSON.parse(storedSavedCandidates);
    }
    parsedSavedCandidates.push(candidateSearched);
    localStorage.setItem('savedCandidates', JSON.stringify(parsedSavedCandidates));
  };

const searchForCandidate = async(event: FormEvent, candidate_name: string) => {
  event.preventDefault();
  const data: Candidate = await searchGithubUser(candidate_name);
  setCandidateSearched(data);
};

return (
  <div>
    <h1>Search Candidate By Name</h1>
    <form className="searchForm" onSubmit={(event: FormEvent) => 
      searchForCandidate(event, searchInput)
      }>
      <input
        onChange={(e) => setSearchInput(e.target.value)}
        name="search"
        type="text"
        className="form-control"
        placeholder="Search a candidate on GitHub"
        id="search"
      />
      <button
        className="btn btn-primary"
        type="submit">
        Search
      </button>
    </form>
    {candidateSearched.name === '' ? (
      <div></div>
    ) : (
      <CandidateCard 
        candidateSearched={candidateSearched}
        addToCandidates={addToCandidates}
      />
    )
    }
  </div>
)
};

export default SearchByName;


