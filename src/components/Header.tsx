import React from 'react';
import YoutubeLightbox from './YoutubeLightbox';
import PlayButton from './PlayButton';
import '../styles/Header.scss';
import { useUpcomingMovieFacade } from '../hooks/upcoming-movie.hook';
import moment from 'moment';

export default () => {
    const [upcomingMovie] = useUpcomingMovieFacade();

    // Loading state
    if (upcomingMovie === null) {
        return (
            <h1>Loading...</h1>
        );
    }
    
    const [
        wallpaper,
        title,
        genre,
        plot,
        website,
        runtime,
        rating,
        screeningDate,
    ] = [
        upcomingMovie.wallpaperUrl,
        upcomingMovie.title,
        upcomingMovie.genre,
        upcomingMovie.plot,
        upcomingMovie.website,
        upcomingMovie.runtime,
        upcomingMovie.rated,
        upcomingMovie.watchDate,
    ];

    return (
        <div
            className="Header"
            style={{ backgroundImage: `url(${wallpaper})` }}
        >
            <div className="Container">
                <h1 className="Header-title">{title}</h1>
                <div className="Header-genres">
                    {genre && genre.map((g: string) => (
                        <div key={g} className="Header-genre">{g}</div>
                    ))}
                </div>
                <button className="Header-trailer" onClick={() => {}/*this.openTrailer*/}>
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
                        {rating && <div className="Header-rating">{rating}</div>}
                    </div>
                    <h2 className="Header-subtitle">
                        Upcoming:
                        &nbsp;
                        {moment(screeningDate.seconds * 1000).format('dddd, MMMM Do')}
                        &nbsp;
                        ({moment(screeningDate.seconds * 1000).fromNow()})
                    </h2>
                </div>
            </div>
            {/* <YoutubeLightbox
                src={trailer}
                isOpen={isTrailerOpen}
                onClose={this.closeTrailer}
            /> */}
        </div>
    )
};