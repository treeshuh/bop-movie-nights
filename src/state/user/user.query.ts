import { Query } from '@datorama/akita';
import { UserState, UserStore, userStore } from './user.store';

export class UserQuery extends Query<UserState> {
    user$ = this.select('user');
    showLogin$ = this.select(state => state.ui.showLogin);

    constructor(protected store: UserStore) {
        super(store);
    }
}

export const userQuery = new UserQuery(userStore);