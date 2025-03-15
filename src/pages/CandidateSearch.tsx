import { useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard.tsx';


const CandidateSearch = () => {
  const [candidateSearched, setCandidateSearched] = useState<Candidate>({
    name: '',
    location: '',
    email: '',
    company: '',
    bio: '',
    avatar_url: '',
    login: ''
  })

  const grabCandidate = async() => { 
    let pickedCandidate = null;
    let candidateWithName = false;
    let attempts = 0;

    while (!candidateWithName && attempts < 10) {
      attempts++;
      const candidateProfiles = await searchGithub();

      if (candidateProfiles.length > 0) {
        const randomIndex = Math.floor(Math.random() * candidateProfiles.length);
        const pickedCandidateName = candidateProfiles[randomIndex].login;
        const pickedCandidateData = await searchGithubUser(pickedCandidateName); 
        if (pickedCandidateData.name && pickedCandidateData.name.trim() !== '') {
          pickedCandidate = pickedCandidateData;
          candidateWithName = true;
        }  
      }
    }
    setCandidateSearched(pickedCandidate);
  };

  const addToCandidates = () => {
    let parsedSavedCandidates: Candidate[] = [];
    const storedSavedCandidates = localStorage.getItem('savedCandidates');
    if (typeof storedSavedCandidates === 'string') {
      parsedSavedCandidates = JSON.parse(storedSavedCandidates);
    }
    parsedSavedCandidates.push(candidateSearched);
    localStorage.setItem('savedCandidates', JSON.stringify(parsedSavedCandidates));
    grabCandidate();
  };

  const rejectCandidate = () => {
    grabCandidate();
  }

return (
  <div>
    <h1>Candidate Search</h1>
    <CandidateCard 
      candidateSearched={candidateSearched}
      addToCandidates={addToCandidates}
      rejectCandidate={rejectCandidate}
    />
  </div>
)
};

export default CandidateSearch;