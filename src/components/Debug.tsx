import React from 'react';
import { usePollsFacade } from '../hooks/polls.hook';
import { useMoviesFacade } from '../hooks/movies.hook';
import { useUpcomingMovieFacade } from '../hooks/upcoming-movie.hook';

export default () => {
    const [pollsState, setActivePoll, addPollVote] = usePollsFacade();
    const [moviesState] = useMoviesFacade();
    const [upcomingMovie] = useUpcomingMovieFacade();

    return (
        <div style={{ background: '#bada55' }}>
            <div className="UpcomingMovieDebug">
                <h1>Upcoming Movie</h1>
                <pre>{JSON.stringify(upcomingMovie, null, 2)}</pre>
            </div>
            <div className="MoviesDebug">
                <h1>All Movies</h1>
                {moviesState.movies.map(movie => (
                    <div key={movie.id}>
                        <h5>Movie ID: {movie.id}</h5>
                        <pre>{JSON.stringify(movie, null, 2)}</pre>
                    </div>
                ))}
            </div>
            <div className="PollsDebug">
                <h1>Polls</h1>
                <button onClick={() => {}}>Create Poll</button>
                <button onClick={() => {}} disabled={true}>Add option</button>
                <button onClick={() => {}} disabled={true}>Add vote</button>
                {pollsState.activePoll && (
                    <>
                        <h2>Active Poll - {pollsState.activePoll.title}</h2>
                        <h3>Poll Options</h3>
                        <ul>
                            {pollsState.activePoll.options.map((option, i) => (
                                <li key={`${pollsState.activePoll!.id}_${i}`}>
                                    {option.imdbId} (Vote count: {option.count})
                                    &nbsp;
                                    <button onClick={() => 
                                        addPollVote(pollsState.activePoll!.id, option.imdbId)
                                    }>Vote</button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
                <h2>All Polls</h2>
                <ul>
                    {pollsState.polls.map(poll => (
                        <li key={poll.id}>
                            <h5>
                                Poll - {poll.title}
                                &nbsp;
                                <button onClick={() => setActivePoll(poll.id)}>Make Active</button>
                            </h5>
                            <pre>{JSON.stringify(poll, null, 2)}</pre>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};