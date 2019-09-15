import React from 'react';
import classNames from 'classnames';
import '../styles/Tabs.scss';
import { usePollsFacade } from '../hooks/polls.hook';

export default () => {
    const [
        pollsState,
        setActivePoll,
    ] = usePollsFacade();

    if (pollsState.activePoll === null) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="TabbedContent">
            <ul className="Tabs">
                {pollsState.polls.map((poll, index) => {
                    return (
                        <li
                            className={classNames('Tab', { 'Tab--active': poll === pollsState.activePoll })}
                            key={`tab-${poll.title}`}
                        >
                            <button className="TabButton" onClick={() => setActivePoll(poll.id)}>
                                {poll.title}
                                {poll === pollsState.polls[0] && <small>Current</small>}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};