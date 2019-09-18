import { UserStore, userStore } from './user.store';
import { User } from './user.model';

export class UserService {
    constructor(private userStore: UserStore) { }

    setUser(user: User | null) {
        this.userStore.update({ user });
    }

    showLogin(showLogin: boolean) {
        this.userStore.update({
            ui: {
                showLogin,
            }
        });
    }
}

export const userService = new UserService(userStore);