import React from 'react';
import PlayButton from './PlayButton';
import YoutubeLightbox from './YoutubeLightbox';
import Carousel from './Carousel';
import '../styles/Poll.scss';
import { usePollsFacade } from '../hooks/polls.hook';
import { useMoviesFacade } from '../hooks/movies.hook';
import { Movie } from '../state/movies/movie.model';

const Poll: React.FC = () => {
    const [
        pollsState,
        setActivePoll,
        setActivePollOption,
        addPollVote,
        voteForActiveOption
    ] = usePollsFacade();
    const [moviesState, getMovieById] = useMoviesFacade();

    if (!(pollsState.activePoll)) {
        return <h1>Loading...</h1>;
    }

    return (
        <ul className="Poll">
            <Carousel imgs={
                pollsState.activePoll.options
                    .filter(option => getMovieById(option.imdbId) !== undefined)
                    .map(option => {
                        const movie: Movie = getMovieById(option.imdbId);
                        return ({
                            src: `https://img.omdbapi.com/?i=${option.imdbId}&h=450&apikey=d9936574`,
                            alt: movie.title
                        });
                    })
            } />
        </ul>
    )
}

export default Poll;