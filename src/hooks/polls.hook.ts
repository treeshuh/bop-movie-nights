import { useEffect, useState } from 'react';
import { Observable, Subscription } from 'rxjs';
import { pollsService } from '../state/polls/polls.service';
import { pollsQuery } from '../state/polls/polls.query';
import { Poll, PollOption } from '../state/polls/poll.model';
import { ID } from '@datorama/akita';
import { first } from 'rxjs/operators';

interface PollsState {
    polls: Poll[];
    activePoll: Poll | null;
    activePollOption: PollOption | null;
}

function onEmit<T>(source$: Observable<T>, nextFn: (value: T) => void): Subscription {
    return source$.subscribe(nextFn, console.error);
}

/**
 * View Model for Poll view components
 */
export function usePollsFacade(): [PollsState, Function, Function, Function, Function] {
    const [state, setState] = useState<PollsState>({
        polls: [],
        activePoll: null,
        activePollOption: null
    });
    const setActive = (id: ID) => {
        pollsService.setActive(id);
        // Reset active poll option when active poll is changed
        if (state.activePoll && state.activePoll.id !== id) {
            pollsService.setActiveOption(null);
        }
    };
    const setActiveOption = (option: PollOption) => pollsService.setActiveOption(option);
    const addPollVote = (id: ID, optionId: string) => pollsService.addVote(id, optionId);
    const voteForActiveOption = () => {
        if (!(state.activePoll && state.activePollOption)) {
            throw Error(`Cannot select poll option.`);
        }
        pollsService.addVote(state.activePoll.id, state.activePollOption.imdbId);
    }

    /**
     * Manage subscriptions with auto-cleanup
     */
    useEffect(() => {
        const subscriptions = [
            onEmit<Poll[]>(pollsQuery.polls$, polls => setState(state => ({ ...state, polls }))),
            onEmit<Poll>(pollsQuery.active$, poll => setState(state => ({ ...state, activePoll: poll }))),
            onEmit<PollOption | null>(pollsQuery.activeOption$, pollOption => setState(state => ({ ...state, activePollOption: pollOption }))),
        ];

        // Set first available poll to be active
        subscriptions.push(
            pollsQuery.polls$.pipe(
                first(polls => polls.length > 0)
            ).subscribe((polls) => {
                setActive(polls[0].id);
            })
        )

        pollsService.load();
        return () => { subscriptions.forEach(subscription => subscription.unsubscribe()); }
    }, []);

    return [state, setActive, setActiveOption, addPollVote, voteForActiveOption];
}