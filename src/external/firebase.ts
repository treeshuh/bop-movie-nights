import firebase from 'firebase';
import { collectionData, docData } from 'rxfire/firestore';
import { Movie, Poll, UpcomingMovie } from './firebase.d';

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
export const movies$ = collectionData<Movie>(db.collection('movies'));
export const poll$ = collectionData<Poll>(db.collection('polls'));

// const log = (x: any) => console.log(x);
// upcomingMovie$.subscribe(log);
// movies$.subscribe(log);
// poll$.subscribe(log);

export default firebase;