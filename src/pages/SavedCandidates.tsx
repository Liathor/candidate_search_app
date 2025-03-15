// import Candidate from '../interfaces/Candidate.interface.tsx';
// import { useEffect, useState } from 'react';


const SavedCandidates = () => {
  {/*
  const CandidatesLibrary = () => {
    const [candidatesSaved, SetcandidatesSaved] = useState<Candidate[]>([]);
  
    const removeFromStorage = (
      e: React.MouseEvent<SVGSVGElement, MouseEvent>,
      onCandidateList: boolean | null | undefined,
      title: string | null
    ) => {
      e.preventDefault();
      if (onCandidateList) {
        console.log(title);
        let parseCandidates: Candidate[] = [];
  
        const storedCandidates = localStorage.getItem('filmsToWatch');
        if (typeof storedFilmsToWatch === 'string') {
          parsedFilmsToWatch = JSON.parse(storedFilmsToWatch);
        }
        parsedFilmsToWatch = parsedFilmsToWatch.filter(
          (film) => film.Title !== title
        );
        localStorage.setItem('filmsToWatch', JSON.stringify(parsedFilmsToWatch));
      } else if (currentlyOnSeenItList) {
        let parsedAlreadySeenFilms: Film[] = [];
        const storedAlreadySeenFilms = localStorage.getItem('alreadySeenFilms');
        if (typeof storedAlreadySeenFilms === 'string') {
          parsedAlreadySeenFilms = JSON.parse(storedAlreadySeenFilms);
        }
  
        parsedAlreadySeenFilms = parsedAlreadySeenFilms.filter(
          (film) => film.Title !== title
        );
  
        setAlreadyWatchedFilms(parsedAlreadySeenFilms);
        localStorage.setItem(
          'alreadySeenFilms',
          JSON.stringify(parsedAlreadySeenFilms)
        );
      }
    };
    useEffect(() => {
      const parsedAlreadyWatchedFilms = JSON.parse(
        localStorage.getItem('alreadySeenFilms') as string
      );
      setAlreadyWatchedFilms(parsedAlreadyWatchedFilms);
    }, []);

  return (
    <>
      <h1>Potential Candidates</h1>
      {(!alreadyWatchedFilms?.length || alreadyWatchedFilms.length === 0) ? (
        <h1 style={{ margin: '16px 0' }}>
          Add films you've already seen here.
        </h1>
      ) : (
        <FilmsAlreadySeen
          alreadyWatchedFilms={alreadyWatchedFilms}
          removeFromStorage={removeFromStorage}
        />
      )}
    </>
  );
  */}
};


export default SavedCandidates;
