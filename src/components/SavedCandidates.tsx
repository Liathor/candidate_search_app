import Candidate from '../interfaces/Candidate.interface.tsx';
import CandidateCard from './CandidateCard';

interface savedCandidates {
  savedCandidatesArray: Candidate[];
}
const SavedCandidates = ({
  savedCandidatesArray,
}: savedCandidates) => {
  return (
    <ul>
      {savedCandidatesArray.map((candidate) => (
        <CandidateCard
          candidateSearched={candidate}
        />
      ))}
    </ul>
  );
};

export default SavedCandidates;
