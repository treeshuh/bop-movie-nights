import React from 'react';
import YoutubeLightbox from './YoutubeLightbox';
import PlayButton from './PlayButton';
import '../styles/Header.scss';
import Movie from '../models/Movie';

interface Props {
    imdbId: string,
    wallpaper: string,
    title: string,
    screeningDate: string,
    trailer: string,
}

interface State {
    movie?: Movie,
    isTrailerOpen: boolean
}

export default class Header extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            movie: new Movie(),
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

    getMovieDetail() {
        Movie.get(this.props.imdbId)
            .then(movie => this.setState({ movie }))
    }

    componentDidMount() {
        this.getMovieDetail();
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.imdbId !== this.props.imdbId) {
            this.getMovieDetail();
        }
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
        } = this.state.movie || {};
             
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
