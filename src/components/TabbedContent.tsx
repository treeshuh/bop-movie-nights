import React, {useCallback} from 'react';
import classNames from 'classnames';
import '../styles/Tabs.scss';
import { usePollsFacade } from '../hooks/polls.hook';

export default () => {
    const [
        pollsState,
        setActivePoll,
    ] = usePollsFacade();

    const clickTab = useCallback((event) => {
        event.preventDefault();
        const { id } = event.target.dataset;
        setActivePoll(id);
    }, [setActivePoll]);

    if (pollsState.activePoll === null) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="TabbedContent">
            <ul className="Tabs">
                {pollsState.polls.map((poll) => {
                    return (
                        <li
                            className={classNames('Tab', { 'Tab--active': poll === pollsState.activePoll })}
                            key={`tab-${poll.title}`}
                        >
                            <button className="TabButton" data-id={poll.id} onClick={clickTab}>
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