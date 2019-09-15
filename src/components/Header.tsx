import React, { useState, useCallback } from 'react';
import YoutubeLightbox from './YoutubeLightbox';
import PlayButton from './PlayButton';
import '../styles/Header.scss';
import { useUpcomingMovieFacade } from '../hooks/upcoming-movie.hook';
import moment from 'moment';

export default () => {
    const [upcomingMovie] = useUpcomingMovieFacade();
    const [isTrailerOpen, setTrailerOpen] = useState(false);

    // Hooks must be defined before loading screen return
    const openTrailer = useCallback(() => {
        setTrailerOpen(true);
    }, [setTrailerOpen]);

    const closeTrailer = useCallback(() => {
        setTrailerOpen(false);
    }, [setTrailerOpen]);

    // Loading state
    if (upcomingMovie === null) {
        return (
            <h1>Loading...</h1>
        );
    }
    
    const {
        wallpaperUrl,
        title,
        genre,
        trailerUrl,
        plot,
        website,
        runtime,
        rated,
        watchDate
     } = upcomingMovie || {};

    return (
        <div className="Header">
            <div className="Header-background" style={{ backgroundImage: `url(${wallpaperUrl})` }}></div>
            <div className="Container">
                <h1 className="Header-title">{title}</h1>
                <div className="Header-genres">
                    {genre && genre.map((g: string) => (
                        <div key={g} className="Header-genre">{g}</div>
                    ))}
                </div>
                <button className="Header-trailer" onClick={openTrailer}>
                    Watch Trailer
                    <PlayButton />
                </button>

                <div className="Header-text-container">
                    {plot && <p className="Header-plot">
                        {plot}
                        {website && <a className="Header-website" rel="noopener noreferrer" target="_blank" href={website}>Visit Website ></a>}
                    </p>}
                    <div>
                        {runtime && <div className="Header-runtime">{runtime}</div>}
                        {rated && <div className="Header-rating">{rated}</div>}
                    </div>
                    <h2 className="Header-subtitle" title={moment(watchDate.seconds * 1000).fromNow()}>
                        Upcoming: {moment(watchDate.seconds * 1000).format('dddd, MMMM Do')}
                    </h2>
                </div>
            </div>
            <YoutubeLightbox
                src={trailerUrl}
                isOpen={isTrailerOpen}
                onClose={closeTrailer}
            />
        </div>
    )
};