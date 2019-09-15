import { useEffect, useState } from 'react';
import { Observable, Subscription } from 'rxjs';
import { pollsService } from '../state/polls/polls.service';
import { pollsQuery } from '../state/polls/polls.query';
import { Poll } from '../state/polls/poll.model';
import { ID } from '@datorama/akita';

interface PollsState {
    polls: Poll[];
    activePoll: Poll | null;
}

function onEmit<T>(source$: Observable<T>, nextFn:(value: T) => void): Subscription {
    return source$.subscribe(nextFn, console.error);
}

/**
 * View Model for Poll view components
 */
export function usePollsFacade(): [PollsState, Function] {
    const [state, setState] = useState<PollsState>({ polls: [], activePoll: null });
    const setActive = (id: ID) => pollsService.setActive(id);

    /**
     * Manage subscriptions with auto-cleanup
     */
    useEffect(() => {
        const subscriptions = [
            onEmit<Poll[]>(pollsQuery.polls$, polls => setState(state => ({ ...state, polls }))),
            onEmit<Poll>(pollsQuery.active$, poll => setState(state => ({ ...state, activePoll: poll }))),
        ];

        pollsService.load();
        return () => { subscriptions.forEach(subscription => subscription.unsubscribe()); }
    }, []);

    return [state, setActive];
}