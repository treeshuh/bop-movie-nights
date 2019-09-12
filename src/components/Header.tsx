import React from 'react';
import YoutubeLightbox from './YoutubeLightbox';
import PlayButton from './PlayButton';
import '../styles/Header.scss';

const upcomingMovie = {
    "title": "Guardians of the Galaxy Vol. 2",
    "genre": ["Action", "Adventure", "Comedy", "Sci-Fi"],
    "plot": "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego.",
    "poster": "https://m.media-amazon.com/images/M/MV5BN2MwNjJlODAtMTc1MS00NjkwLTg2NDMtYzFjZmU2MGM1YWUwXkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_SX300.jpg",
    "website": "https://marvel.com/guardians",
    "trailer": "https://www.youtube.com/watch?v=wUn05hdkhjM",
    "votes": 1,
    "runtime": "105 minutes",
    "rating": "PG-13"
}

interface Props {
    imdbId: string,
    wallpaper: string,
    title: string,
    screeningDate: string,
    trailer: string,
}

interface State {
    isTrailerOpen: boolean
}

export default class Header extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isTrailerOpen: false
        }

        this.openTrailer = this.openTrailer.bind(this);
        this.closeTrailer = this.closeTrailer.bind(this);
    }

    openTrailer() {
        this.setState({isTrailerOpen: true});
    }

    closeTrailer() {
        this.setState({isTrailerOpen: false});
    }

    render() {
        const {
            wallpaper,
            title,
            screeningDate,
            trailer,

        } = this.props;

        const isTrailerOpen = this.state.isTrailerOpen;

        const {
            genre,
            plot,
            runtime, 
            rating,
            website
        } = upcomingMovie || {};
             
        return (
            <div
                className="Header"
                style={{backgroundImage: `url(${wallpaper})`}}
            >
                <div className="Container">
                    <h1 className="Header-title">{title}</h1>
                    <div className="Header-genres">
                        {genre && genre.map((g: string) => (
                            <div key={g} className="Header-genre">{g}</div>
                        ))}
                    </div>
                    <button className="Header-trailer" onClick={this.openTrailer}>
                        Watch Trailer
                        <PlayButton/>
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
                        <h2 className="Header-subtitle">Upcoming: {screeningDate}</h2>
                    </div>
                </div>
                <YoutubeLightbox
                    src={trailer}
                    isOpen={isTrailerOpen}
                    onClose={this.closeTrailer}
                />
            </div>
        );
    }
}
