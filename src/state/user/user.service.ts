import { UserStore, userStore } from './user.store';
import { User } from './user.model';

export class UserService {
    constructor(private userStore: UserStore) { }

    setUser(user: User | null) {
        this.userStore.update({ user });
    }
}

export const userService = new UserService(userStore);