import { EntityState, ActiveState, StoreConfig, EntityStore } from '@datorama/akita';
import { Poll, PollOption } from './poll.model';

export interface PollsState extends EntityState<Poll>, ActiveState {
    ui: {
        activePollOption: PollOption | null
    }
};

const initialState: PollsState = {
    active: null,
    ui: { activePollOption: null }
};

@StoreConfig({ name: 'polls' })
export class PollsStore extends EntityStore<PollsState> {
    constructor() {
        super(initialState);
    }

    setActiveOption(option: PollOption | null) {
        this.update({ ui: { activePollOption: option }});
    }
}

export const pollsStore = new PollsStore();