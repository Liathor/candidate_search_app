import { type FormEvent, useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface.tsx';

const CandidateSearch = (props: string) => {
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
    const storedSavedCandidates = localStorage.getItems('savedCandidates');
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
    <h1>CandidateSearch</h1>
    <form onSubmit={(event: FormEvent) => 
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
    </form>;
    
</div>
)
};

export default CandidateSearch;


