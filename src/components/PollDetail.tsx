import React, { useCallback, useState } from 'react';
import YoutubeLightbox from './YoutubeLightbox';
import { Movie } from '../state/movies/movie.model';
import '../styles/PollDetail.scss';
import { useUserFacade } from '../hooks/user.hook';
import { usePollsFacade } from '../hooks/polls.hook';

interface PollDetailProps {
    movie: Movie | null,
    saveCallback: Function,
    count: number
}

const PollDetail: React.FC<PollDetailProps> = ({
    movie,
    saveCallback,
    count,

}) => {
    const [isTrailerOpen, setTrailerOpen] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState(null);
    const [userState, login, logout, , showLogin] = useUserFacade();
    const [pollsState, setActivePoll, setActivePollOption, addPollVote, voteForActiveOption, hasVotedForActiveOption] = usePollsFacade();

    const openTrailer = useCallback((event) => {
        const { url } = event.target.dataset;
        setTrailerUrl(url);
        setTrailerOpen(true);
    }, [setTrailerOpen]);

    const closeTrailer = useCallback(() => {
        setTrailerOpen(false);
        setTrailerUrl(null);
    }, [setTrailerOpen]);

    const handleSave = useCallback((event) => {
        event.preventDefault();
        saveCallback();
    }, [saveCallback]);

    if (!movie) {
        return null;
    }

    return (
        <div className="PollDetail">
            <h2 className="PollDetail-title">{movie.title}</h2>
            <div className="PollDetail-tags">
                {movie.genre.map(g => (
                    <span key={g} className="PollDetail-tag PollDetail-genre">{g}</span>
                ))}
            </div>
            <p className="PollDetail-plot">{movie.plot}</p>
            <div className="PollDetail-tags">
                <span className="PollDetail-tag">{movie.runtime}</span>
                <span className="PollDetail-tag">{movie.rated}</span>
                <span className="PollDetail-tag">{movie.year}</span>
            </div>
            <div className="PollDetail-actions">
                <button data-url={movie.trailerUrl} onClick={openTrailer}>Trailer</button>
                {userState.user
                    ? (
                        <button
                            onClick={handleSave}
                            disabled={hasVotedForActiveOption()}
                            className={`${hasVotedForActiveOption() ? 'active' : ''}`}
                        >
                            <span className="Star" /> ({count || 0})
                        </button>
                    ) : (
                        <button onClick={() => showLogin(true)}>
                            Login to Vote
                        </button>
                    )
                }
            </div>
            <YoutubeLightbox
                src={trailerUrl}
                isOpen={isTrailerOpen}
                onClose={closeTrailer}
            />
        </div>
    );
}

export default PollDetail;