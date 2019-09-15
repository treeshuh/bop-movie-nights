import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { PollsState, pollsStore, PollsStore } from './polls.store';
import { Poll, PollOption } from './poll.model';

export class PollsQuery extends QueryEntity<PollsState, Poll> {
    constructor(protected store: PollsStore) {
        super(store);
    }

    polls$: Observable<Poll[]> = this.selectAll();
    active$: Observable<Poll> = this.selectActive();
    activeOption$: Observable<PollOption | null> = this.select(state => state.ui.activePollOption);
}

export const pollsQuery = new PollsQuery(pollsStore);