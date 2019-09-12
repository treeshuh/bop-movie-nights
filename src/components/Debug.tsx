import React from 'react';
import { usePollsFacade } from '../hooks/polls.hook';
import { useMoviesFacade } from '../hooks/movies.hook';
// import '../external/omdb';
// import '../external/firebase';
// import '../state/movies/movies.service';

export default () => {
    const [pollsState] = usePollsFacade();
    const [moviesState] = useMoviesFacade();

    return (
        <>
            <div className="MoviesDebug">
                {moviesState.movies.map(movie => (
                    <div key={movie.id}>
                        <h5>Movie ID: {movie.id}</h5>
                        <p>
                            {JSON.stringify(movie, null, 2)}
                        </p>
                    </div>
                ))}
            </div>
            <div className="PollsDebug">
                <button onClick={() => { }}>Create Poll</button>
                <button onClick={() => { }} disabled={true}>Add option</button>
                <button onClick={() => { }} disabled={true}>Add vote</button>
                {pollsState.polls.map(poll => (
                    <div key={poll.id}>
                        <h5>Poll ID: {poll.id}</h5>
                        <ul>
                            {poll.options.map((option, i) => (
                                <li key={`${poll.id}_${i}`}>{option.imdbId}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
};