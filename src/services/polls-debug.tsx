import React from 'react';
import { create, addOption, addVote } from './polls';

interface State {
    pollRefId: string;
    imdbId: string;
}

export default class PollsDebug extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            pollRefId: '',
            imdbId: 'tt6033368'
        }

        this.create = this.create.bind(this);
        this.addOption = this.addOption.bind(this);
        this.addVote = this.addVote.bind(this);
    }

    async create() {
        const pollRefId = await create();
        this.setState({ pollRefId });
        window.alert(`Poll ${pollRefId} created`);
    }

    async addOption() {
        const pollOption = {
            imdbId: this.state.imdbId,
            voteCount: 0
        };
        await addOption(this.state.pollRefId, pollOption);
        window.alert(`Poll ${this.state.pollRefId}, added option: ${JSON.stringify(pollOption)}`);
    }

    async addVote() {
        await addVote(this.state.pollRefId, this.state.imdbId);
        window.alert(`Poll ${this.state.pollRefId}, added vote for imdb ID: ${this.state.imdbId}`);
    }

    render() {
        return (
            <div className="PollsDebug">
                <button onClick={this.create}>Create Poll</button>
                <button onClick={this.addOption} disabled={this.state.pollRefId === ''}>Add option</button>
                <button onClick={this.addVote} disabled={this.state.pollRefId === ''}>Add vote</button>
            </div>
        );
    }
}