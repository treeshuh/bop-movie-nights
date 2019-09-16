import { Store, StoreConfig } from '@datorama/akita';
import { User } from './user.model';

export interface UserState {
    user: User | null;
}

export function createInitialState(): UserState {
    return {
        user: null
    };
}

@StoreConfig({ name: 'user' })
export class UserStore extends Store<UserState> {
    constructor() {
        super(createInitialState());
    }
}

export const userStore = new UserStore();