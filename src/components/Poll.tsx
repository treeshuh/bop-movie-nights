import React, { useMemo, useCallback } from 'react';
import Carousel from './Carousel';
import PollDetail from './PollDetail';
import '../styles/Poll.scss';
import { usePollsFacade } from '../hooks/polls.hook';
import { useMoviesFacade } from '../hooks/movies.hook';
import { Movie } from '../state/movies/movie.model';

const Poll: React.FC = () => {
    const [
        {
            activePoll,
            activePollOption
        },
        setActivePoll,
        setActivePollOption,
        addPollVote,
        voteForActiveOption
    ] = usePollsFacade();
    // TODO: remove movies facade and use updated polls facade;
    const [moviesState, getMovieById] = useMoviesFacade();

    const imgs = useMemo(() => activePoll && activePoll.options
        .filter(option => getMovieById(option.imdbId) !== undefined)
        .map(option => {
            const movie: Movie = getMovieById(option.imdbId);
            return ({
                src: `https://img.omdbapi.com/?i=${option.imdbId}&h=450&apikey=d9936574`,
                alt: movie.title
            });
        })
    , [activePoll, getMovieById]);

    const currentMovie = useMemo(() => activePollOption
        && getMovieById(activePollOption.imdbId)
    , [activePollOption, getMovieById]);

    const activeIndex = useMemo(() => {
        if (!activePoll || !activePollOption) {
            return;
        }
        return activePoll.options.findIndex(o => o.imdbId === activePollOption.imdbId);
    }, [activePoll, activePollOption]);

    const activeCallback = useCallback((index) => {
        if (!activePoll) {
            return;
        }
        return setActivePollOption(activePoll.options[index]);
    }, [activePoll, setActivePollOption]);

    if (!(activePoll)) {
        return null;
    }

    return (
        <div className="Poll">
            <Carousel imgs={imgs || []} activeCallback={activeCallback} active={activeIndex} />
            <PollDetail
                movie={currentMovie}
                saveCallback={voteForActiveOption}
                count={activePollOption ? activePollOption.count : 0} />
        </div>
    )
}

export default Poll;