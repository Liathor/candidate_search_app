import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';


const CandidateSearch = () => {
  const [candidateArray, setCandidateArray] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [candidateSearched, setCandidateSearched] = useState<Candidate>({
    name: '',
    location: '',
    email: '',
    company: '',
    bio: '',
    avatar_url: '',
    login: '',
    html_url: '',
  })
  
  const getCandidateArray = async() => {
    const candidates = await searchGithub();
    setCandidateArray(candidates);
    setCurrentIndex(0);
    grabCandidate(candidates, 0);
    console.log(candidates);
  };

  const grabCandidate = async(candidates = candidateArray, index = currentIndex) => {
    if (index < candidates.length) {
      let candidateName = candidates[index].login;
      console.log(candidateName + " index: " + index);
      try {
        let candidateData = await searchGithubUser(candidateName);
        setCandidateSearched(candidateData);
        setCurrentIndex(index + 1);
      } catch (error: any) {
        console.warn(`Candidate ${candidateName} not found, trying another.`);
        grabCandidate(candidates, index + 1);
      }
    }
  }

/*
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
  */

  useEffect(() => {
    getCandidateArray(); // Fetch candidate on component mount
  }, []);

  const addToCandidates = () => {
    if(currentIndex >= 30) return;
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
    if (currentIndex === 29) {
      setCurrentIndex(30);
      return;
    }
    grabCandidate();
  }

return (
  <div>
    <h1>Candidate Search</h1>
    { currentIndex === 30 ? (
    <div>
        <h2>You've picked from 30 candidates.</h2>
        <p>Please review picked candidates in Potential Candidates, or click the button below to pick from another 30.</p>
        <button onClick={getCandidateArray}>Fetch New Candidates</button>
      </div>
    ) : candidateSearched?.login ? (
      <CandidateCard 
      candidateSearched={candidateSearched}
      rejectCandidate={rejectCandidate}
      addToCandidates={addToCandidates}
    />    
    ) : (
      <div>
        <p>Loading candidates...</p>
      </div>
    )
    }
  </div>
)
};

export default CandidateSearch;