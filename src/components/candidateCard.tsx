import Candidate from '../interfaces/Candidate.interface.tsx';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';

type CandidateCardProps = {
    candidateSearched: Candidate;
    addToCandidates?: (() => void) | null;
    rejectCandidate?: (() => void) | null;
  };

const CandidateCard = ({
    candidateSearched,
    addToCandidates,
    rejectCandidate,
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
                <p>Email: <a href={`mailto:${candidateSearched.email}`}>{candidateSearched.email}</a></p>
                <p>Company: {candidateSearched.company}</p>
                <p>Bio: {candidateSearched.bio}</p>
            </article>
            <aside className="icons">
                <IoAddCircle
                    style={{ fontSize: '50px', cursor: 'pointer', color: 'rgb(255, 165, 0)'}}
                    onClick={() => addToCandidates?.()}
                />
                <IoRemoveCircle
                    style={{ fontSize: '50px', cursor: 'pointer', color: 'rgb(255, 0, 0)'}}
                    onClick={() => rejectCandidate?.()}
                />
            </aside>
        </section>
        </>
    )
}

export default CandidateCard;