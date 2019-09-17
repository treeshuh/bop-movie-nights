import { useEffect, useState, useCallback } from 'react';
import { Observable, Subscription } from 'rxjs';
import { userQuery } from '../state/user/user.query';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { userService } from '../state/user/user.service';
import { User } from '../state/user/user.model';

interface UserState {
    user: User | null;
}

function onEmit<T>(source$: Observable<T>, nextFn: (value: T) => void): Subscription {
    return source$.subscribe(nextFn, console.error);
}

function redirectHome() {
    window.history.pushState({}, '', '/');
}

/**
 * View Model for User view components
 */
export function useUserFacade(): [
    UserState,
    Function,
    Function,
    <T extends (...args: any[]) => any>(func: T) => (...funcArgs: Parameters<T>) => ReturnType<T> | Promise<void>
] {
    const [state, setState] = useState<UserState>({ user: null });
    const login = async () => {
        const actionCodeSettings = {
            url: 'https://movie-night.club',
            handleCodeInApp: true,
        };
        const email = window.prompt('Gimme yo email');
        if (email && email.length > 0) {
            await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
            window.localStorage.setItem('emailForSignIn', email);
            window.alert('Check yo email');
        }
    }
    const logout = () => {
        window.localStorage.removeItem('emailForSignIn');
        window.localStorage.removeItem('uid');
        userService.setUser(null);
        redirectHome();
    }

    // Wrap a login-privileged function.
    // This will redirect to login if not logged in, otherwise it will call the function.
    function wrapLogin<T extends (...args: any[]) => any>(func: T): (...funcArgs: Parameters<T>) => ReturnType<T> | Promise<void> {
        return (...args: Parameters<T>): ReturnType<T> | Promise<void> => {
            if (state.user) {
                return func(...args);
            }
            return login();
        }
    }

    /**
     * Manage subscriptions with auto-cleanup
     */
    useEffect(() => {
        const subscription = onEmit<User | null>(userQuery.user$, user => setState(state => ({ ...state, user })));
        return () => subscription.unsubscribe();
    }, []);

    return [state, login, logout, wrapLogin];
}

export function useUserSetup() {
    useEffect(() => {
        if (window.localStorage.getItem('uid')) {
            userService.setUser({
                uid: (window.localStorage.getItem('uid') as string)
            });
            redirectHome();
        }
        // Confirm the link is a sign-in with email link.
        else if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
            // Additional state parameters can also be passed via URL.
            // This can be used to continue the user's intended action before triggering
            // the sign-in operation.
            // Get the email if available. This should be available if the user completes
            // the flow on the same device where they started it.
            var email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                // User opened the link on a different device. To prevent session fixation
                // attacks, ask the user to provide the associated email again. For example:
                email = window.prompt('Please provide your email for confirmation');
            }
            // The client SDK will parse the code from the link for you.
            firebase.auth().signInWithEmailLink((email as string), window.location.href)
                .then(function (result) {
                    // Clear email from storage.
                    window.localStorage.removeItem('emailForSignIn');
                    // You can access the new user via result.user
                    // Additional user info profile not available via:
                    // result.additionalUserInfo.profile == null
                    // You can check if the user is new or existing:
                    // result.additionalUserInfo.isNewUser
                    if (result.user) {
                        window.localStorage.setItem('uid', result.user.uid);
                        userService.setUser({
                            uid: result.user.uid
                        });
                        redirectHome();
                    }
                })
                .catch(function (error) {
                    // Some error occurred, you can inspect the code: error.code
                    // Common errors could be invalid email and invalid or expired OTPs.
                    console.error(error);
                });
        }
    }, []);
}