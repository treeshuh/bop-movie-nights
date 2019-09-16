import { useEffect, useState } from 'react';
import { Observable, Subscription } from 'rxjs';
import { pollsService } from '../state/polls/polls.service';
import { pollsQuery } from '../state/polls/polls.query';
import { Poll, PollOption } from '../state/polls/poll.model';
import { ID } from '@datorama/akita';
import { first } from 'rxjs/operators';
import { useUserFacade } from './user.hook';

interface PollsState {
    polls: Poll[];
    livePolls: Poll[];
    activePoll: Poll | null;
    activePollOption: PollOption | null;
}

function onEmit<T>(source$: Observable<T>, nextFn: (value: T) => void): Subscription {
    return source$.subscribe(nextFn, console.error);
}

/**
 * View Model for Poll view components
 */
export function usePollsFacade(): [PollsState, Function, Function, Function, Function, Function] {
    const [userState, login] = useUserFacade();
    const [state, setState] = useState<PollsState>({
        polls: [],
        livePolls: [],
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
    const addPollVote = async (id: ID, optionId: string) => {
        if (userState.user) {
            pollsService.addVote(userState.user.uid, id, optionId)
        } else {
            login();
        }
    };
    const voteForActiveOption = () => {
        if (!(state.activePoll && state.activePollOption)) {
            throw Error(`Cannot select poll option.`);
        }
        return addPollVote(state.activePoll.id, state.activePollOption.imdbId);
    }
    const hasVotedForActiveOption = () => {
        if (state.activePollOption && state.activePollOption.hasVotedUids && userState.user) {
            return state.activePollOption.hasVotedUids.includes(userState.user.uid);
        }
        return false;
    }

    /**
     * Manage subscriptions with auto-cleanup
     */
    useEffect(() => {
        const subscriptions = [
            onEmit<Poll[]>(pollsQuery.polls$, polls => setState(state => {
                return {
                    ...state,
                    polls,
                    livePolls: polls.filter(poll => !poll.archived)
                };
            })),
            onEmit<Poll>(pollsQuery.active$, poll => setState(state => ({ ...state, activePoll: poll }))),
            onEmit<PollOption | null>(pollsQuery.activeOption$, pollOption => setState(state => ({ ...state, activePollOption: pollOption }))),
        ];

        // Set first available poll to be active
        subscriptions.push(
            pollsQuery.polls$.pipe(
                first(polls => polls.length > 0)
            ).subscribe((polls) => {
                const livePolls = polls.filter(poll => !poll.archived);
                if (livePolls.length > 0) {
                    setActive(livePolls[0].id);
                }
            })
        )

        pollsService.load();
        return () => { subscriptions.forEach(subscription => subscription.unsubscribe()); }
    }, []);

    return [state, setActive, setActiveOption, addPollVote, voteForActiveOption, hasVotedForActiveOption];
}