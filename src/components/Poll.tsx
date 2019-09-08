import React from 'react';
import PlayButton from './PlayButton';
import YoutubeLightbox from './YoutubeLightbox';
import '../styles/Poll.scss';

interface Option {
    title: string,
    genre: string[],
    poster: string,
    website: string,
    trailer: string,
    votes: number
}

interface Props {
    options: Option[],
    title: string,
    disabled?: boolean
}

interface State {
    activeTrailer?: number,
    isTrailerOpen: boolean
}

export default class Poll extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isTrailerOpen: false
        }
        this.openTrailer = this.openTrailer.bind(this);
        this.closeTrailer = this.closeTrailer.bind(this);
    }

    openTrailer = (index: number) => () => {
        this.setState({
            isTrailerOpen: true,
            activeTrailer: index
        });
    }

    closeTrailer() {
        this.setState({
            activeTrailer: undefined,
            isTrailerOpen: false
        });
    }

    render() {
        const {
            options
        } = this.props;

        const {
            activeTrailer,
            isTrailerOpen
        } = this.state;

        return (
            <ul className="Poll">
                {options.map((opt, index) => {
                    return (<li className="PollOption" key={`pollOption-${opt.title}-${index}`}>
                        <img alt={`${opt.title} Movie Poster`} className="PollOption-image" src={opt.poster}/>
                        <div className="PollOption-details">
                            <h3 className="PollOption-title">{opt.title}</h3>
                            <ul className="PollOption-genres">
                                {opt.genre.map((g: string) => (
                                    <li key={g} className="PollOption-genre">{g}</li>
                                ))}
                            </ul>
                            <div>
                                <button className="PollOption-trailer" onClick={this.openTrailer(index)}>
                                    Trailer
                                    <PlayButton/>
                                </button>
                                <button className="PollOption-vote">&#x2605; ({opt.votes})</button>
                            </div>
                        </div>
                    </li>)
                })}
                {activeTrailer && <YoutubeLightbox
                    src={options[activeTrailer].trailer}
                    isOpen={isTrailerOpen}
                    onClose={this.closeTrailer}
                />}
            </ul>
        );
    }
}