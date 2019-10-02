import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { PollsState, pollsStore, PollsStore } from './polls.store';
import { Poll, PollOption, PollOptionOrder, PollOptionOrderMap } from './poll.model';
import * as R from 'ramda';
import { map } from 'rxjs/operators';

const sortPolls = R.pipe(
    R.sortBy(R.prop('order')),
);

export class PollsQuery extends QueryEntity<PollsState, Poll> {
    constructor(protected store: PollsStore) {
        super(store);
    }

    polls$: Observable<Poll[]> = this.selectAll().pipe(map(sortPolls));
    active$: Observable<Poll> = this.selectActive();
    activeOption$: Observable<PollOption | null> = this.select(state => state.ui.activePollOption);
    pollOptionOrderMap$: Observable<PollOptionOrderMap> = this.select(state => state.ui.pollOptionOrderMap);
}

export const pollsQuery = new PollsQuery(pollsStore);