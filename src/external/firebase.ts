import firebase from 'firebase/app';
import 'firebase/firestore';
import { collectionData, docData } from 'rxfire/firestore';
import { Movie, Poll, UpcomingMovie, PollOption } from './firebase.d';

const app = firebase.initializeApp({
    apiKey: "AIzaSyCGCXKEcAJSyq_QvxgdO1RuE6VXHc-u2mM",
    authDomain: "bop-movie-nights.firebaseapp.com",
    databaseURL: "https://bop-movie-nights.firebaseio.com",
    projectId: "bop-movie-nights",
    storageBucket: "bop-movie-nights.appspot.com",
    messagingSenderId: "116248761122",
    appId: "1:116248761122:web:3dcc0a01f7a71fa7ac4b7b"
});
const db = app.firestore();

export const upcomingMovie$ = docData<UpcomingMovie>(db.doc('app/upcomingMovie'));
export const movies$ = collectionData<Movie>(db.collection('movies'), 'id');
export const polls$ = collectionData<Poll>(db.collection('polls'), 'id');

export async function addVote(userId: string, id: string, imdbId: string): Promise<void> {
    const pollRef = await firebase.firestore().collection('polls').doc(id);
    return firebase.firestore().runTransaction(async (transaction: firebase.firestore.Transaction) => {
        const pollDoc = await transaction.get(pollRef);
        if (!pollDoc.exists) {
            throw new Error(`Document with ref ID "${id}" does not exist!`);
        }
        const pollOptions: PollOption[] = pollDoc.get('options');
        const updatedPollOptions = pollOptions.map(option => {
            if (option.imdbId === imdbId) {
                if (option.hasVotedUids && option.hasVotedUids.includes(userId)) {
                    throw new Error('User has already voted.');
                }
                return {
                    ...option,
                    count: (option.count + 1) || 0,
                    hasVotedUids: (option.hasVotedUids || []).concat(userId)
                };
            }
            return option;
        });
        transaction.update(pollRef, { options: updatedPollOptions });
    });
}

// const log = (x: any) => console.log(x);
// upcomingMovie$.subscribe(log);
// movies$.subscribe(log);
// polls$.subscribe(log);

export default firebase;