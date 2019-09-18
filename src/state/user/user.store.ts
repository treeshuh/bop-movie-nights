import { Store, StoreConfig } from '@datorama/akita';
import { User } from './user.model';

export interface UserState {
    user: User | null;
    ui: {
        showLogin: boolean,
        showLoginConfirm: boolean,
    }
}

export function createInitialState(): UserState {
    return {
        user: null,
        ui: {
            showLogin: false,
            showLoginConfirm: false,
        }
    };
}

@StoreConfig({ name: 'user' })
export class UserStore extends Store<UserState> {
    constructor() {
        super(createInitialState());
    }
}

export const userStore = new UserStore();