import React from 'react';
import Poll, { PollOption } from './Poll';
import Movie from './Movie';
import UpcomingMovie from '../models/UpcomingMovie';

interface State {
    poll: Poll;
    pollOptions: PollOption[];
    movie: Movie;
    imdbId: string;
}

export default class Debug extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            poll: new Poll(''),
            pollOptions: [],
            movie: new Movie(),
            imdbId: 'tt6033368',
        }

        this.create = this.create.bind(this);
        this.addOption = this.addOption.bind(this);
        this.addVote = this.addVote.bind(this);
    }

    async componentDidMount() {
        console.log(await Movie.get(this.state.imdbId));
        console.log(await UpcomingMovie.get());
    }

    async create() {
        const poll = await Poll.create();
        this.setState({ poll });
        window.alert(`Poll ${poll.id} created`);
    }

    async addOption() {
        const pollOption = {
            imdbId: this.state.imdbId,
            count: 0
        };
        await this.state.poll.addOption(pollOption);
        this.setState({
            pollOptions: await this.state.poll.getOptions()
        })
    }

    async addVote() {
        await this.state.poll.addVote(this.state.imdbId);
        this.setState({
            pollOptions: await this.state.poll.getOptions()
        })
    }

    render() {
        return (
            <div className="PollsDebug">
                <button onClick={this.create}>Create Poll</button>
                <button onClick={this.addOption} disabled={this.state.poll.id === ''}>Add option</button>
                <button onClick={this.addVote} disabled={this.state.poll.id === ''}>Add vote</button>
                <ul>
                    { this.state.pollOptions.map(option => (
                        <li>
                            <p>Option: {option.imdbId}</p>
                            <p>Votes: {option.count}</p>
                        </li>
                    )) }
                </ul>
            </div>
        );
    }
}