import { EntityState, ActiveState, StoreConfig, EntityStore } from '@datorama/akita';
import { Poll } from './poll.model';

export interface PollsState extends EntityState<Poll>, ActiveState {};

const initialState: PollsState = {
    active: null,
};

@StoreConfig({ name: 'polls' })
export class PollsStore extends EntityStore<PollsState> {
    constructor() {
        super(initialState);
    }
}

export const pollsStore = new PollsStore();