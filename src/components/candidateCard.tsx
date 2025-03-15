import Candidate from '../interfaces/Candidate.interface.tsx';
import { IoEyeOutline } from 'react-icons/io5';

type CandidateCardProps = {
    candidateSearched: Candidate;
    addToCandidates: (() => void) | null;
  };

const CandidateCard = ({
    candidateSearched,
    addToCandidates,
}: CandidateCardProps) => {
    return (
        <>
        <section className='candidateCard'>
            <figure>
                <img src={`${candidateSearched.avatar_url}`} alt={`${candidateSearched.name}`}/>
            </figure>
            <article className='details'>
                <h2>{candidateSearched.name}</h2>
                <p>Location: {candidateSearched.location}</p>
                <p>Email: {candidateSearched.email}</p>
                <p>Company: {candidateSearched.company}</p>
                <p>Bio: {candidateSearched.bio}</p>
            </article>
        </section>
        <aside className="icons">
            <IoEyeOutline
                style={{ fontSize: '50px', cursor: 'pointer' }}
                onClick={() => addToCandidates?.()}
            />
        </aside>
        </>
    )
}

export default CandidateCard;