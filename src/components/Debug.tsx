import React from 'react';
import { usePollsFacade } from '../hooks/polls.hook';
import { useMoviesFacade } from '../hooks/movies.hook';
import { useUpcomingMovieFacade } from '../hooks/upcoming-movie.hook';

export default () => {
    const [pollsState, setActivePoll] = usePollsFacade();
    const [moviesState] = useMoviesFacade();
    const [upcomingMovie] = useUpcomingMovieFacade();

    return (
        <div style={{background: 'white'}}>
            <div className="UpcomingMovieDebug">
                <h1>Upcoming Movie</h1>
                {JSON.stringify(upcomingMovie, null, 2)}
            </div>
            <div className="MoviesDebug">
                <h1>All Movies</h1>
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
                <h1>Polls</h1>
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
        </div>
    );
};